var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var history = require('../../libs/history');
var push = require('../../libs/push');
var qiwiLib = require('../../libs/qiwi');
let Timeout = require('await-timeout');
const moment = require('moment');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function cancelOrder(data) {
  /*
  TOOK_BY_MISTAKE
  NO_CLIENT_RESPONSE
  CANT_FIND_ADDRESS
  INCORRECT_ORDER
  CUSTOM_COMMENT
  */
    let {auth_user, text, type} = data;
    return new Promise(async (response, reject) => {
      let user, second_user, close_status, summ = null;

      if(auth_user.role==="CUSTOMER")
        user = await api.Customer.findById(auth_user.id);
      else if(auth_user.role==="EXECUTOR")
        user = await api.Executor.findById(auth_user.id);

        if(!user.active_order_id )
          return response({
              status: "ERROR",
              error:"NO_ACTIVE_ORDER",
              data: {}
          });

      let order = await api.Order.findById(user.active_order_id);

      if(!order || !order.executor_id || order.status<20 || order.status>=90)
        return response({
            status: "ERROR",
            error:"ORDER_STATUS_ERROR",
            data: {}
        });

        if(auth_user.role==="CUSTOMER"){
           second_user = await api.Executor.findById(order.executor_id);
           if(order.status>=20 && order.status<50 )
             close_status = 120;
           else
             close_status = 121;


          history.add(order.id, close_status, "Клиент отменил заказ");
          if(order.status<50)
            push.sendPush("EXECUTOR", order.executor_id, "ORDER_CANCEL_BEFORE_START_WORK", {order_id: order._id});
          else
            push.sendPush("EXECUTOR", order.executor_id, "ORDER_CANCEL_AFTER_START_WORK", {order_id: order._id});
        }
        else if(auth_user.role==="EXECUTOR"){
          second_user = await api.Customer.findById(order.customer_id);
          if(order.status>=20 && order.status<50 )
            close_status = 130;
          else
            close_status = 131;

          history.add(order.id, close_status, "Исполнитель отменил заказ");
          if(order.status<50)
            push.sendPush("CUSTOMER", order.customer_id, "ORDER_CANCEL_BEFORE_START_WORK", {
              executor_name: user.name,
              order_id: order._id
            });
          else
            push.sendPush("CUSTOMER", order.customer_id, "ORDER_CANCEL_AFTER_START_WORK", {
              executor_name: user.name,
              order_id: order._id
            });
        }

         order.status = close_status;
         order.summ = summ;
         order.end_work_time = new Date();
         order.cancel_reason = {type, text, initiator:auth_user.role };
         await order.save();

        await qiwiLib.cancel(order.id);

        user.active_order_id = null;
        await user.save();

        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});

        return response({
            status: "OK",
            error: null,
            data: {}
        });

    }
  );
}

async function cancelOrderConfirm(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
      let user, second_user, close_status, summ = null;

      if(auth_user.role==="CUSTOMER")
        user = await api.Customer.findById(auth_user.id);
      else if(auth_user.role==="EXECUTOR")
        user = await api.Executor.findById(auth_user.id);

        if(!user.active_order_id )
          return response({
              status: "ERROR",
              error:"NO_ACTIVE_ORDER",
              data: {}
          });

      let order = await api.Order.findById(user.active_order_id);


      if(!order ||  order.status < 110 )
        return response({
            status: "ERROR",
            error:"ORDER_STATUS_ERROR",
            data: {}
        });

        
        user.active_order_id = null;
        await user.save();

        return response({
            status: "OK",
            error: null,
            data: {}
        });

    }
  );
}

var exports = module.exports = {};
exports.cancelOrder = cancelOrder;
exports.cancelOrderConfirm = cancelOrderConfirm;
