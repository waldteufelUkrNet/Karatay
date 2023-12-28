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

async function getMyActiveOrder(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user;

        if (auth_user.role === "CUSTOMER")
            user = await api.Customer.findById(auth_user.id);
        if (auth_user.role === "EXECUTOR")
            user = await api.Executor.findById(auth_user.id);

        if (!user.active_order_id)
            return response({
                status: "OK",
                error: null,
                data:null
            });

        let order = await api.Order.findOne({_id: user.active_order_id});

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('ORDER',order)
        });
    });

}

// {"address":{"code":"","floor":"","lat":55.663265,"lon":37.746925,"name":"Ulitsa Verkhniye Polya 16"},"card_id ":"60755e1b7ecee21d0b3e460e","comment":"test comment","departure":"ANY","for_now":true,"payment_type":"CARD","scheduled_time":null,"scheduled_time_minutes":0,"specialty_id":"5de8bb8d05158d1b6d10eb6f"}

async function createNewOrder(data) {
    let {auth_user} = data;


    console.log('000: ', data);
    return new Promise(async (response, reject) => {
        if (!data.specialty_id  || !data.address || !data.payment_type || data.for_now===undefined || !data.departure ) {

            console.log('001: ', 1);
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });
        }
        else if (data.payment_type === "CARD" && !data.card_id){
              console.log('002: ', 2);
              return response({
                  status: "ERROR",
                  error: 'MISSING_INPUT_PARAMETERS',
                  data:null
              });
          } else
          if ( !data.for_now && ( !data.scheduled_time || (!data.scheduled_time_minutes && data.scheduled_time_minutes !== 0)) ){
              console.log('003: ', 3);
              return response({
                  status: "ERROR",
                  error: 'MISSING_INPUT_PARAMETERS',
                  data:null
              });
          }




        let user = await api.Customer.findOne({_id: auth_user.id});

        if (user.active_order_id && data.for_now)
            return response({
                status: "ERROR",
                error: 'ALREADY_HAVE_ACTIVE_ORDER',
                data:null
            });

        let {specialty_id, scheduled_time_minutes, address, comment, payment_type, card_id, for_now, departure, scheduled_time} = data;

        console.log('got data ', data);

        if (!address.name || !address.lat  || !address.lon ){
            console.log('004: ', 4);
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });
        }


         address.location = {
                   type: 'Point',
                   coordinates: [ address.lon,address.lat] 
                 }

        let specialty = await api.Speciality.findById(specialty_id);
        if (!specialty)
            return response({
                status: "ERROR",
                error: 'SPECIALTY_NOT_FOUND',
                data:null
            });


        delete data._id;
        delete address.id;

        let address_db = await api.Address.create(address);


      //  let address_db = await Addresses.create(address);


        let order_body = {
            customer_id:mongoose.Types.ObjectId(auth_user.id),
            specialty_id:mongoose.Types.ObjectId(specialty_id),
            specialty,
            address,
            comment,
            payment_type,
            for_now,
            status: 10,
            departure
          //  address_id: address_db._id
        };

        if (data.scheduled_time)
            order_body.scheduled_time = new Date(moment(scheduled_time).unix()*1000);

        if(scheduled_time_minutes)
            order_body.scheduled_time_minutes = scheduled_time_minutes;

        if (card_id)
                order_body.card_id = card_id;

        let order;
        try{
            order = await api.Order.create(order_body);
            await history.add(order._id, 10, "Заказ создан");
        } catch(err){
            console.log("CREATE ORDER ERROR: ", err)
            return response({
                status: "ERROR",
                error: "SERVER_ERRROR",
                data:null
            });
        }
        if(for_now)
          user.active_order_id = order._id;

        user.save();

      /*  if (payment_type === "BONUS") {
            if (parseFloat(user.bonus_balance) >= parseFloat(order.price)) {
                return response({
                    status: "OK",
                    error:null,
                    data: {order}
                });
            } else {
                user.active_order_id = null;
                user.save();

                order.status = 112;
                order.save();

                await history.add(order._id, 112, "Произошла ошибка при резервировании средств c бонусного счета во время создания заказа");

                return response({
                    status: "ERROR",
                    error: 'BONUS_RESERVING_ERROR',
                    data:null
                });
            }
        } else {*/
             response({
                status: "OK",
                error:null,
                data: {order:await api.Serialize('ORDER',order)}
            });
        //}


        let executors, find_query;
      
        if (order.departure === "ADDRESS" || order.departure === "ANY") {

            find_query = {
                specialities: {
                    $elemMatch:
                        {
                            specialty_id: order.specialty_id,
                            on_departure: true
                        }
                }
            };
        }
        else
        if (order.departure === "OFFICE") {
            let office_id_list = [];

            find_query = {
                type: "OFFICE"
            };

            let office_address_list = await api.Address.aggregate([
                {
                    $geoNear: {
                        near: order.address.location,
                        distanceField: "distance",
                        maxDistance: 20000000000,
                        query: find_query,
                        //  includeLocs: "dist.location",
                        spherical: true
                    }
                }
            ]);

            office_address_list.map((item) => {
                office_id_list.push(item._id)
            })


            find_query = {
                specialities: {
                    $elemMatch:
                        {
                            specialty_id: order.specialty_id,
                            workplace: true
                        }
                },
                office_id: {$in: office_id_list}
            };

        }

        if (order.payment_type === "CARD") {
            find_query.active_card_id = {$ne: null};
        }
        else{
            find_query.balance = {
                $gte: 1
              };
        }
        if(for_now){
            executors = await api.Executor.find(find_query);
            for(let e = 0; e < executors.length; e++){
                await push.sendPush("EXECUTOR", executors[e]._id, "NEW_AVAILABLE_ORDER", {
                    speciality: order.specialty.name,
                    order_id: order._id
                });
            }
        }
        
        return;


    });

}

async function getOrdersHistory(data) {
    let {auth_user, offset, limit} = data;

    return new Promise(async (response, reject) => {
        let user, where = {};

        if (auth_user.role === "CUSTOMER")
            user = await api.Customer.findById(auth_user.id);
        if (auth_user.role === "EXECUTOR")
            user = await api.Executor.findById(auth_user.id);

        if (auth_user.role === "CUSTOMER")
            where.customer_id = mongoose.Types.ObjectId(auth_user.id);
        if (auth_user.role === "EXECUTOR")
            where.executor_id = mongoose.Types.ObjectId(auth_user.id);

       // where.status = {$gte: 20};
       // where["$and"]={status:{$not: 110}};
        if (user.active_order_id)
            where._id = {$ne: user.active_order_id};

        console.log(offset + "   "+limit)
        //let order_list = await api.Order.find({where}).skip(offset).limit(limit);
        let order_list = await api.Order.find(where).sort({createdAt: 'descending'}).skip(offset).limit(limit);
        console.log(order_list)

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('ORDER',order_list)
        });
    });

}

async function customerCloseOrder(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Customer.findById(auth_user.id);

        if (!user.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ANY_ACTIVE_ORDER',
                data:null
            });

        let order = await api.Order.findOne({_id: user.active_order_id});

        if (order.executor_id || order.status > 11)
            return response({
                status: "ERROR",
                error: 'WRONG_ORDER_STATUS',
                data:null
            });
        let prev_status=order.status;
        
        order.status = 110;
        order.save();
        user.active_order_id = null;
        user.save();

        if(prev_status===11){
            let executor =  await api.Executor.findOne({requested_order_id: order._id});
            if(executor){
                executor.requested_order_id = null;
                executor.requested_order_departure = null;
                executor.save();
                amqpLib.sendSocketMessage("REQUESTED_ORDER_CHANGED", "EXECUTOR", executor._id, {order:await api.Serialize('ORDER',order)});
            }
        }
        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        // await api.ExecutorFind.destroy({where: {order_id: order.id}});

        await history.add(order.id, 110, "Заказчик отменил поиск исполнителя для заказа");

        // qiwiService.cancel(order.id);

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}


async function customerCancelAskExecutorOrder(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Customer.findById(auth_user.id);

        if (!user.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ANY_ACTIVE_ORDER',
                data:null
            });

        let order = await api.Order.findOne({_id: user.active_order_id});

        if (order.executor_id || order.status !== 11)
            return response({
                status: "ERROR",
                error: 'WRONG_ORDER_STATUS',
                data:null
            });

        order.status = 10;
        order.save();
       

      
            let executor =  await api.Executor.findOne({requested_order_id: order._id});
            if(executor){
                executor.requested_order_id = null;
                executor.requested_order_departure = null;
                executor.save();
                amqpLib.sendSocketMessage("REQUESTED_ORDER_CHANGED", "EXECUTOR", executor._id, {order:await api.Serialize('ORDER',order)});
            }
        
        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        // await api.ExecutorFind.destroy({where: {order_id: order.id}});

        await history.add(order.id, 10, "Заказчик отменил предложение исполнителю заказа");

        // qiwiService.cancel(order.id);

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

var exports = module.exports = {};
exports.getMyActiveOrder = getMyActiveOrder;
exports.createNewOrder = createNewOrder;
exports.getOrdersHistory = getOrdersHistory;
exports.customerCloseOrder = customerCloseOrder;
exports.customerCancelAskExecutorOrder = customerCancelAskExecutorOrder;