var mongoose = require('mongoose');
var config = require('../../config');
var history = require('../../libs/history');
var map = require('../../libs/map');
var push = require('../../libs/push');
var api = require('../../models/api');
var check_lib = require('../../libs/check');
const moment = require('moment');
var qiwiLib = require('../../libs/qiwi');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function executorAcceptOffer(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {

        let user = await api.Executor.findById(auth_user.id);

        if (!user.requested_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ORDER_REQUESTS',
                data:null
            });

        if (user.active_order_id){
          return response({
              status: "ERROR",
              error: 'ALREADY_BUSY',
              data:null
          });
        }

        let order = await api.Order.findById(user.requested_order_id);

        if (!order || order.executor_id || order.status !==11) {
            user.requested_order_id = null;
            user.requested_order_departure = null;
            user.requested_order_time = null;
            await user.save();
            return response({
                status: "ERROR",
                error: 'ORDER_ERROR',
                data:null
            });
        }

        let speciality = user.specialities.find(spec => {
          if(spec.specialty_id.toString() === order.specialty_id.toString() && spec.on_departure === true && ['ANY', 'ADDRESS'].indexOf(user.requested_order_departure)>=0 )
            return true;
          else if(spec.specialty_id.toString() === order.specialty_id.toString() && spec.workplace === true && ['ANY', 'OFFICE'].indexOf(user.requested_order_departure)>=0 )
            return true;
          else
            return false;
        });
        if (!speciality) {
            user.requested_order_id = null;
            user.requested_order_departure = null;
            user.requested_order_time = null;
            await user.save();
            order.status=10;
            await user.save();
            return response({
                status: "ERROR",
                error: 'ORDER_ERROR',
                data:null
            });
        }



      //  order.rate_type = speciality.rate_type_for_now;

        order.executor_id = user._id;
        order.status = 20;
        order.start_walk_time = new Date();
        order.departure = user.requested_order_departure;

        order.requested_departure = null;
          order.requested_price = null;
          order.requested_summ_type = null;
          
        order.summ_type = speciality.rate_type_for_now;
        if(speciality.rate_type_for_now==="HOURLY")
          order.price = speciality.hourly_rate_price;
        else{
          order.price = speciality.fixed_rate_price;
          order.summ = speciality.fixed_rate_price;
        }

        if(order.departure==="OFFICE" && user.office_id){
          let new_address = await api.Address.findById(user.office_id);
          if(new_address){
            order.address = new_address;
            order.departure_address = new_address;
          }
        }

        await order.save();
      //  order.request_expiry_time = null;
        user.active_order_id = order._id;
        user.requested_order_id = null;
        user.requested_order_departure = null;
        user.requested_order_time = null;
        user.save();

        await history.add(order.id, 20, "Исполнитель принял заказ");

        let map_data;
        if(order.departure==="OFFICE" ){
          let customer = await api.Customer.findById(order.customer_id);
          map_data = await map.getMap(order, customer, "LEGS");
        }
        else {
          map_data = await map.getMap(order, user, "LEGS");
        }

        order.map = map_data;

        await order.save();

        await push.sendPush("CUSTOMER", order.customer_id, "ORDER_ACCEPTED", {
          executor_name: user.name,
          order_id: order._id
        });

        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});

        if (order.payment_type === "CARD") {
            let check = await check_lib.makeCheck(order);
            let hold_request = await qiwiLib.holding(order.id, check.order_check.customer_final_payment_amount, check.order_check.app_commission, order.card_id);


            if (!hold_request || !hold_request.success) {
                order.find_status = 0;
                order.status = 110;
                order.cancel_reason = {type: 'CARD_HOLD_ERROR', text:'', initiator: 'SERVER' };
                await order.save();
                console.log("SETTING 110");

                //amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order: await api.Serialize('ORDER',order)});
                amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order: await api.Serialize('ORDER',order)});

                //???? 
                amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
                await history.add(order.id, 110, "Не уалось зарезервировать средства на счете заказчика. Заказ отменен автоматически");

                // отменяем первичный платеж , если таковой имеется
                await qiwiLib.cancel(order.id);
                user.active_order_id = null;
                user.requested_order_id = null;

                await user.save();

                let customer = await api.Customer.findById(order.customer_id);
                customer.active_order_id = null;
                await customer.save();
            }
        }

        return response({
            status: "OK",
            error:null,
            data: {order:await api.Serialize('ORDER',order)}
        });
    });

}

async function executorDeclineOffer(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if (user.active_order_id)
            return response({
                status: "ERROR",
                error: 'ALREADY_BUSY',
                data:null
            });

        if (!user.requested_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ORDER_REQUESTS',
                data:null
            });

        let order = await api.Order.findById(user.requested_order_id);

        user.requested_order_id = null;
        user.requested_order_departure = null;
        user.requested_order_time = null;

        let gc = await check_lib.getGlobalConfigs();
        let {
          for_now_order_find_executor_timeout_seconds 
        } = gc;
      
        order.status = 10;
        order.requested_departure = null;
          order.requested_price = null;
          order.requested_summ_type = null;
        order.save();
        user.save();

        await push.sendPush("CUSTOMER", order.customer_id, "ORDER_DECLINED", {
          executor_name: user.name,
          order_id: order._id
        });


        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

        let control_time = moment();
        control_time.subtract(for_now_order_find_executor_timeout_seconds, 'seconds');
        if(moment(order.createdAt).unix()  <= control_time.unix() ){
          order.status=110;
          order.save();
           amqpLib.sendSocketMessage("ORDER_CREATE_TIMEOUT", "CUSTOMER", order.customer_id, {});
        }
        
        
        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}


var exports = module.exports = {};
exports.executorAcceptOffer = executorAcceptOffer;
exports.executorDeclineOffer = executorDeclineOffer;
