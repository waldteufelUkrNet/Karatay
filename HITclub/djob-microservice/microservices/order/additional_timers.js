var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var history = require('../../libs/history');
var push = require('../../libs/push');
var check_lib = require('../../libs/check');
let Timeout = require('await-timeout');
const moment = require('moment');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function checkNewOrderTimers(data) {
    return new Promise(async (response, reject) => {
  console.log("__________________________________________________________CONSOLE CREATE ORDER TIMER CHECK _______________________________________________________");
      let gc = await check_lib.getGlobalConfigs();
      let {
        for_now_order_find_executor_timeout_seconds ,
        for_later_order_find_executor_timeout_seconds
       } = gc;
      let control_time = moment();
      control_time.subtract(for_now_order_find_executor_timeout_seconds, 'seconds');
      let orders = await api.Order.find({
        status: {$in: [10]},
        for_now: true,
        createdAt: {$lt: control_time}
      });

      for (var i = 0; i < orders.length; i++){
         orders[i].status = 110;
         await orders[i].save();
         amqpLib.sendSocketMessage("ORDER_CREATE_TIMEOUT", "CUSTOMER", orders[i].customer_id, {});
      }
      console.log("orders 'for now' for close: ", orders.length)

       // поиск и обработка отложенных заказов, на которые НЕ ВЫБРАН исполнитель
      control_time = moment();
      //control_time.subtract(for_later_order_find_executor_timeout_seconds, 'seconds');
      orders = await api.Order.find({
        status: {$in: [10,11]},
        for_now: false,
        scheduled_time: {$lt: control_time}
      });
      for (var i = 0; i < orders.length; i++){
         orders[i].status = 110;
         await orders[i].save();
         amqpLib.sendSocketMessage("ORDER_CREATE_TIMEOUT", "CUSTOMER", orders[i].customer_id, {});
      }
      console.log("orders for later for close (status 10+11) : ", orders.length)


       // поиск и обработка отложенных заказов, на которые  ВЫБРАН исполнитель но он не начал выполнение
       control_time = moment();
       control_time.subtract(24, 'hours');
       orders = await api.Order.find({
         status: {$in: [110, 120, 130]},
         for_now: false,
         scheduled_time: {$lt: control_time}
       });
       for (var i = 0; i < orders.length; i++){
          if(orders[i].executor_id){
            let executor = await api.Executor.findById(orders[i].executor_id.toString());
            if(executor && executor.active_order_id && executor.active_order_id.toString() === executor._id.toString() )
            {
              executor.active_order_id = null;
              await executor.save();
            }
          } else{
           
          }
       }
       console.log("orders for later for close (status 110-120-130) : ", orders.length)

       

        return response({
            status: "OK",
            error: null,
            data: {}
        });

    }
  );
}

async function checkSoonOrdersTimer(data) {
  return new Promise(async (response, reject) => {

  let now = moment().add(1, 'hours');
  let now_five_minutes = moment().add(1, 'hours').add(5,'minutes');

  let orders = await api.Order.find({
    status: {$lt: 50},
    for_now: false,
    scheduled_time: {$gte: now, $lt: now_five_minutes}
  });

    for (let i = 0; i < orders.length; i++){
      if(orders[i].executor_id)
      {
        let executor = await api.Executor.findById(orders[i].executor_id);
        if(executor && executor.active_order_id)
          await push.sendPush("EXECUTOR", orders[i].executor_id, "PLANNED_ORDER_STARTS_SOON", {
            speciality: orders[i].specialty.name,
            order_id: orders[i]._id
          });
      }
    }

      return response({
          status: "OK",
          error: null,
          data: {}
      });

  }
);
}
var exports = module.exports = {};
exports.checkNewOrderTimers = checkNewOrderTimers;
exports.checkSoonOrdersTimer = checkSoonOrdersTimer;