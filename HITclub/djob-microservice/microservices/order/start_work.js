var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
let Timeout = require('await-timeout');
var history = require('../../libs/history');
var map = require('../../libs/map');
var push = require('../../libs/push');
var check_lib = require('../../libs/check');
const moment = require('moment');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function startWork(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user, executor, customer;
        if (auth_user.role === "EXECUTOR"){
          user = await api.Executor.findById(auth_user.id);
          executor = user;
        }
        if (auth_user.role === "CUSTOMER"){
          user = await api.Customer.findById(auth_user.id);
          customer = user;
        }

        if (!user.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ACTIVE_ORDER',
                data:null
            });

        let order = await api.Order.findById(user.active_order_id);

        if (!order || !order.executor_id || order.status !== 20)
            return response({
                status: "ERROR",
                error: 'ORDER_STATUS_ERROR',
                data:null
            });

        let order_user;
        if (auth_user.role === "EXECUTOR"){
          order_user = await api.Customer.findById(order.customer_id);
          customer = order_user;
        }
        if (auth_user.role === "CUSTOMER"){
          order_user = await api.Executor.findById(order.executor_id);
          executor = order_user;
        }

        let distance;
        if(order.departure === "OFFICE"){
            distance = map.getDistance(order.address, customer);
        } else {
            distance = map.getDistance(order.address, executor);
        }

        console.log("ORDER START WORK : distance in meters ", distance);
        if (distance > 750)
            return response({
                status: "ERROR",
                error: 'TOO_FAR_FOR_START',
                data:null
            });

        order.status = 50;
        order.start_work_time= new Date();
        await order.save();

        if (auth_user.role === "EXECUTOR")
            await push.sendPush("CUSTOMER", order.customer_id, "ORDER_WORK_STARTED", {
                executor_name: user.name,
                order_id: order._id
            });
        else
            await push.sendPush("EXECUTOR", order.executor_id, "ORDER_WORK_STARTED", {
                order_id: order._id
            });

        amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

        if (auth_user.role === "EXECUTOR")
            await history.add(order._id, 50, "Исполнитель инициировал начало работы");
        else
            await history.add(order._id, 50, "Клиент инициировал начало работы");

         check_lib.updateCheck(order._id, true);

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function updateOrderCheck(data) {
    return new Promise(async (response, reject) => {

        let order = await api.Order.findOne({
            _id: data.order_id
        });
        if(!order)
            return response({
                status: "ERROR",
                error: 'ORDER_NOT_FOUND',
                data:null
            });

        console.log("ORDER TICK STARTED FOR ", order._id);

        let duration = parseInt(moment.duration(moment(data.start_time).diff(moment())).asMinutes());
        if(duration<0)
            duration = -1 *duration;

        let timeout_minutes = duration % 60;
        if(timeout_minutes<0)
          timeout_minutes=0;

        console.log('Timeout.set: ', timeout_minutes, 60000 * timeout_minutes);
        // await Timeout.set(1000*timeout_minutes);
        await Timeout.set(60000 * timeout_minutes);
        console.log('Timeout.set update check: ', timeout_minutes);
        await check_lib.updateCheck(data.order_id);
        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}





var exports = module.exports = {};
exports.startWork = startWork;
exports.updateOrderCheck = updateOrderCheck;

