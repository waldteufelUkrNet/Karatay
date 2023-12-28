var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var map = require('../../libs/map');
var sort_lib = require('../../libs/sort');
var history = require('../../libs/history');
const moment = require('moment');
var push = require('../../libs/push');
var check_lib = require('../../libs/check');
var qiwiLib = require('../../libs/qiwi');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function createOrderOffer(data) {
  // only for EXECUTORS
    let {auth_user, order_id, summ_type, summ, departure, minimal_hours = 1} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let order = await api.Order.findById(order_id);

      if (!order || order.status>=20 || order.for_now )
          return response({
              status: "ERROR",
              error: 'ORDER_STATUS_ERROR',
              data:null
          });
        
      if(order.offered_executor_ids.indexOf(auth_user.id)>=0)
        return response({
          status: "ERROR",
          error: 'ALREADY_MADE_OFFER',
          data:null
        });

      let offer = await api.ExecutorOffer.findOne({
        executor_id: mongoose.Types.ObjectId(auth_user.id),
        order_id: mongoose.Types.ObjectId(order_id)
      });

      if(offer)
        return response({
            status: "ERROR",
            error: 'ALREADY_MADE_OFFER',
            data:null
        });

      let offer_body = {
        executor_id: mongoose.Types.ObjectId(auth_user.id),
        order_id: mongoose.Types.ObjectId(order_id),
        summ_type,
        summ,
        minimal_hours,
        departure
      };


      if(departure === "ADDRESS"  )
        offer_body.address=order.address;
      else if(departure === "OFFICE" ){
        if(!user.office)
          return response({
            status: "ERROR",
            error: 'NO_ANY_OFFICE',
            data:null
          });
        offer_body.address = user.office;
      }
        

      offer = await api.ExecutorOffer.create(offer_body);

      order.offered_executor_ids.push(auth_user.id);
      order.save();
      push.sendPush("CUSTOMER", order.customer_id, "NEW_OFFER", {
        executor_name: user.name,
        speciality: order.specialty.name,
        order_id: order._id,
        price: summ,
        summ_type: summ_type,
        minimal_hours
      });

      return response({
        status: "OK",
        error:null,
        data: await api.Serialize('BASE_OFFER',offer)
      });


    }
  )
}



async function cancelOrderOffer(data) {
  // only for EXECUTOR
    let {auth_user, order_id} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let order = await api.Order.findOne({_id:mongoose.Types.ObjectId(order_id) });

        if (!order || order.status>=20 || order.for_now )
            return response({
                status: "ERROR",
                error: 'ORDER_STATUS_ERROR',
                data:null
            });

      let offer = await api.ExecutorOffer.findOne({
        order_id: mongoose.Types.ObjectId(order_id),
        executor_id: mongoose.Types.ObjectId(auth_user.id)
      });

      if(!offer)
      return response({
          status: "ERROR",
          error: 'NO_SUCH_OFFER',
          data:null
      });


      

        let index = order.offered_executor_ids.indexOf(auth_user.id);
        if (index !== -1) order.offered_executor_ids.splice(index, 1);

        await order.save();

          await api.ExecutorOffer.deleteOne({ _id: offer._id });
       

      return response({
          status: "OK",
          error:null,
          data: {}
      });

    }
  )
}



async function getExecutorOffers(data) {
  // only for CUSTOMER
    let {auth_user, order_id} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Customer.findOne({_id: auth_user.id});
      if(!user || order_id === ':order_id')
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let order = await api.Order.findById(order_id);

      if (!order || order.status>=20 || order.for_now )
          return response({
              status: "ERROR",
              error: 'ORDER_STATUS_ERROR',
              data:null
          });

      let offers = await api.ExecutorOffer.find({order_id: mongoose.Types.ObjectId(order_id) });
        offers =  await api.Serialize('BASE_OFFER',offers);

     let final_list =  offers.map(async function(one_item) {

        if(one_item.address){
          one_item.distance = await map.getDistance( user, one_item.address);
        }else{
          one_item.distance = 0;
        }
        
        return one_item;
      });

      Promise.all(final_list).then((completed_final_list) => {
            return response({
            status: "OK",
            error:null,
            data: completed_final_list
        }); 
      });
     /* return response({
          status: "OK",
          error:null,
          data: await api.Serialize('BASE_OFFER',offers) 
      });*/

    }
  )
}


async function approveExecutorOffers(data) {
  // only for CUSTOMER
    let {auth_user, order_id, executor_id} = data;

    return new Promise(async (response, reject) => {

      let user = await api.Customer.findOne({_id: auth_user.id});
      if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        console.log("INPUT DATA ", data)

        if(!executor_id || executor_id.length < 8)
          return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
          });
          
      let order = await api.Order.findOne({_id:mongoose.Types.ObjectId(order_id), customer_id:mongoose.Types.ObjectId(auth_user.id) });
        console.log("ORDER", order)
      if (!order || order.status>=20 || order.for_now )
          return response({
              status: "ERROR",
              error: 'ORDER_STATUS_ERROR',
              data:null
          });

          console.log("APPROVING EXECUTOR ", executor_id)
      let offer = await api.ExecutorOffer.findOne({
        order_id: mongoose.Types.ObjectId(order_id),
        executor_id: mongoose.Types.ObjectId(executor_id)
      });

      if(!offer)
      return response({
          status: "ERROR",
          error: 'NO_SUCH_OFFER',
          data:null
      });
 
      order.status = 20;
      order.executor_id =  mongoose.Types.ObjectId(executor_id);
      order.summ_type = offer.summ_type;
      order.price = offer.summ;
      order.minimal_hours = offer.minimal_hours || 1;
      order.departure = offer.departure;
      if(offer.departure === "OFFICE"){ 
        order.address = offer.address;
        if(offer.address)
        order.address=offer.address;
      }
      await push.sendPush("EXECUTOR", offer.executor_id, "OFFER_APPROVED", {
        speciality: order.specialty.name,
        order_id: order._id,
        scheduled_time: order.scheduled_time
      });
        
      order.offered_executor_ids = [executor_id];


    /* //???
      let map_data;
      if(order.departure==="OFFICE" ){
          let executor = await api.Executor.findById(order.executor_id);
          console.log("executor",executor)
        map_data = await map.getMap(order, executor, "LEGS");
      }
      else {
        let executor = await api.Executor.findById(order.executor_id);
        map_data = await map.getMap(order, executor, "LEGS");
      }
*/
    //  order.map = map_data;

      await order.save();

     // amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order});
     // amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order});
      amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
      amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});

      offer.status = 'APPROVED';
      offer.save();

      return response({
          status: "OK",
          error:null,
          data: {}
      });

    }
  )
}


async function findOrdersForFuture(data) {
  // only for EXECUTORS
    let {
      auth_user, 
      sort, // null, TIME, DISTANCE
      specialities, // array of specialty_id
      departure, // ANY, OFFICE, ADDRESS
      date_from, // null, YYYY-MM-DD
      date_to, // null, YYYY-MM-DD
      time_from, // null, 511(minutes)
      time_to// null, 522 (minutes)
    } = data;
      console.log(data)
    let final_list=[];
   

    return new Promise(async (response, reject) => {

      var api = require('../../models/api');
        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });
        console.log("S1 ",specialities );
        if(!specialities || !specialities.length){
          specialities = user.specialities.map(function(user_speciality) {
            return user_speciality.specialty_id;
          });
        }
        else{
          specialities = specialities.map(function(user_speciality) {
            return mongoose.Types.ObjectId(user_speciality);
          });
          //"5de8ba7ed8533e18410ed35c"
        }
        
        console.log("S2 ",specialities );
        if(!specialities.length)
          specialities=["NONE"];

        if(!time_from)
          time_from = 0;

        if(!time_to)
          time_to = 24*60;

        if(date_from)
          date_from = new Date( moment(date_from).unix()*1000);
        else
          date_from = new Date(0);
        if(date_to)
          date_to = new Date( moment(date_to).unix()*1000);
        else
          date_to = new Date(2050, 1, 1);

        if(!departure)
          departure = "ANY";

        let find_query_items =[];
        for(let i=0; i<specialities.length; i++){
          let find_query_item = {specialty_id: specialities[i]};

         
          if(departure === "ANY"){
            find_query_item.departure={$in:["ANY", "ADDRESS"]};
            if(user.office)
              find_query_item.departure={$in:["ANY", "OFFICE", "ADDRESS"]};
          }
          else if(departure === "OFFICE"){
            find_query_item.departure={$in:["ANY"]};
            if(user.office)
              find_query_item.departure={$in:["ANY", "OFFICE"]};
          }
          else if(departure === "ADDRESS")
            find_query_item.departure={$in:["ANY", "ADDRESS"]};
          else
            find_query_item.departure={$in:["NONE...DEADEND"]};
          
          find_query_items.push(find_query_item);
        }

        let find_query = {
          status: 10,
          for_now: false,
          scheduled_time_minutes: {
            $gte: time_from,
            $lte: time_to
          },
          scheduled_time:{
            $gte: date_from,
            $lte: date_to
          },
          offered_executor_ids: { "$nin": [ auth_user.id ]}, // where i didn't post offer
          executor_id: null, // where NO ACTIVE executor
          $or:find_query_items
        };

        if(!user.active_card_id)
          find_query.payment_type = "CASH"
          
        if(user.balance <= 0)
          find_query.payment_type = "CARD"
          
        if(!user.active_card_id && user.balance <= 0)
          find_query.payment_type = null;
        
        let orders = await api.Order.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: 2000000000000,
                query: find_query,
              //  includeLocs: "dist.location",
                spherical: true
             }
           }
        ]);

        console.log("my office ", user.office)
        final_list =  orders.map(async function(one_item) {
          let tmp_item = {
            id: one_item._id,
            specialty: await api.Serialize('BASE_SPECIALITY', one_item.specialty),
            address: await api.Serialize('BASE_ADDRESS', one_item.address),
            scheduled_time: one_item.scheduled_time,
            scheduled_time_minutes: one_item.scheduled_time_minutes,
            address_distance: (['ADDRESS', 'ANY'].indexOf(one_item.departure)>=0) ? one_item.distance : null,
            office_distance:  (['OFFICE', 'ANY'].indexOf(one_item.departure)>=0 && user.office) ? await map.getDistance( user.office, one_item.address) : null,
            departure: one_item.departure,
            price: null,
            payment_type: one_item.payment_type,
            offer_status: "NONE",
            comment: one_item.comment
          };
          let order_customer = await api.Customer.findById(one_item.customer_id);
          if(order_customer){
            tmp_item.customer = {
              id: order_customer._id, phone: order_customer.phone,
               name:order_customer.name, 
               second_name: order_customer.second_name,
               surname: order_customer.surname
              };
          }
          return tmp_item;
        });

        // making mapping asynchrounusly
        Promise.all(final_list).then((completed_final_list) => {
          // SORTING final list if needed
              if(sort){
                if(sort === "TIME"){
                    completed_final_list.sort(sort_lib.dynamicSort("scheduled_time"));
                }
                else if(sort === "DISTANCE"){
                  if(departure === "ADDRESS")
                    completed_final_list.sort(sort_lib.dynamicSort("address_distance"));
                  if(departure === "OFFICE")
                    completed_final_list.sort(sort_lib.dynamicSort("office_distance"));
                  if(departure === "ANY")
                    completed_final_list.sort(sort_lib.dynamicSortMultiple("address_distance", "office_distance" ));
                }
              }

              return response({
              status: "OK",
              error:null,
              data: completed_final_list
          }); 
        });
       
        /*
            return response({
                status: "OK",
                error:null,
                data: final_list
            });*/
    });
}

async function getPlannedOrdersForFuture(data) {
  // only for EXECUTORS
    let {
      auth_user
    } = data;
      console.log(data)
    let final_list=[];
   

    return new Promise(async (response, reject) => {

      var api = require('../../models/api');

        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let st_of_day = moment().startOf('day');

        let or_status = [{status: {$lt: 100}}, {status:{$gt: 110}, scheduled_time: {$gte : st_of_day} }]
        let find_query = {
          //status: { "$nin": [ 100, 110 ]}, // not done or canceled by system
          $or: or_status,
          for_now: false,
          offered_executor_ids: { "$in": [ auth_user.id ]}, // where i posted offer
          executor_id: { "$in": [ null, mongoose.Types.ObjectId(auth_user.id) ]}, // where NO ACTIVE executor or ME
        };

        let orders = await api.Order.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: 2000000000000,
                query: find_query,
                spherical: true
             }
           }
        ]);

        final_list =  orders.map(async function(one_item) {
          let tmp_item = {
            id: one_item._id,
            specialty: await api.Serialize('BASE_SPECIALITY', one_item.specialty),
            address: await api.Serialize('BASE_ADDRESS', one_item.address),
            scheduled_time: one_item.scheduled_time,
            scheduled_time_minutes: one_item.scheduled_time_minutes,
            address_distance: null,
            office_distance: null,
            price: null,
            minimal_hours: 1,
            departure: one_item.departure,
            payment_type: one_item.payment_type,
            comment: one_item.comment,
            offer_status: "WAITING"
          };

          let order_customer = await api.Customer.findById(one_item.customer_id);
          if(order_customer){
            tmp_item.customer = {id: order_customer._id, phone: order_customer.phone,
              name:order_customer.name, 
              second_name: order_customer.second_name,
              surname: order_customer.surname
            };
          }

          let tmp_offer = await api.ExecutorOffer.findOne({
            executor_id: mongoose.Types.ObjectId(auth_user.id),
            order_id: one_item._id
          });
          

          if(tmp_offer){
            tmp_offer =  await api.Serialize('BASE_OFFER',tmp_offer);
            tmp_item.price = parseInt(tmp_offer.summ);
            tmp_item.minimal_hours = parseInt(tmp_offer.minimal_hours || 1);
            tmp_item.departure = tmp_offer.departure;
            tmp_item.address = tmp_offer.address;
            tmp_item.summ_type = tmp_offer.summ_type;
          }

          console.log("one_item ",one_item)
          console.log("auth_user.id ", mongoose.Types.ObjectId(auth_user.id))
          
          if(one_item.status === 20 && one_item.executor_id && one_item.executor_id.toString() === auth_user.id){
            tmp_item.offer_status = "APPROVED";
            console.log("APPROVED!!!!")
          }
          
          if(one_item.status > 20 && one_item.status < 100 && one_item.executor_id && one_item.executor_id.toString() === auth_user.id)
            tmp_item.offer_status = "IN_PROGRESS";
          else 
          if(one_item.status >= 110)
            tmp_item.offer_status = "CANCELED";

          return tmp_item;
        });

        // making mapping asynchrounusly
        Promise.all(final_list).then((completed_final_list) => {

              return response({
              status: "OK",
              error:null,
              data: completed_final_list
          }); 
        });


    });

}

async function getMyOfferByOrder(data) {
  // only for EXECUTORS
    let {
      auth_user,
      order_id
    } = data;   

    return new Promise(async (response, reject) => {

      var api = require('../../models/api');

        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });
        let tmp_offer = await api.ExecutorOffer.findOne({
          executor_id: mongoose.Types.ObjectId(auth_user.id),
          order_id:  mongoose.Types.ObjectId(order_id)
        });
        
        if(!tmp_offer)
        return response({
          status: "ERROR",
          error: "NO_SUCH_OFFER",
          data: {}
      });

      let order = await api.Order.findById(order_id);


      let tmp_item = {
        id: order._id,
        specialty: await api.Serialize('BASE_SPECIALITY', order.specialty),
        address: await api.Serialize('BASE_ADDRESS', order.address),
        scheduled_time: order.scheduled_time,
        scheduled_time_minutes: order.scheduled_time_minutes,
        address_distance: null,
        office_distance: null,
        price: null,
        departure: order.departure,
        payment_type: order.payment_type,
        comment: order.comment,
        offer_status: "WAITING"
      };


      let order_customer = await api.Customer.findById(order.customer_id);
      if(order_customer){
        tmp_item.customer = {id: order_customer._id, phone: order_customer.phone,
          name:order_customer.name, 
          second_name: order_customer.second_name,
          surname: order_customer.surname
        };
      }


        tmp_offer =  await api.Serialize('BASE_OFFER',tmp_offer);
            tmp_item.price = parseInt(tmp_offer.summ);
            tmp_item.departure = tmp_offer.departure;
            tmp_item.address = tmp_offer.address;
            tmp_item.summ_type = tmp_offer.summ_type;


             
          if(order.status === 20 && order.executor_id && order.executor_id.toString() === auth_user.id){
            tmp_item.offer_status = "APPROVED";
          }
          
          if(order.status > 20 && order.status < 100 && order.executor_id && order.executor_id.toString() === auth_user.id)
            tmp_item.offer_status = "IN_PROGRESS";
          else 
          if(order.status >= 110)
            tmp_item.offer_status = "CANCELED";

          return response({
              status: "OK",
              error:null,
              data: tmp_item
          }); 

    });

}

//OLD VERSION
async function findOrdersForFuture_old(data) {
  // only for EXECUTORS
    let {auth_user} = data;

    return new Promise(async (response, reject) => {


        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let order = await api.Order.findById(user.active_order_id);

        let find_query_items =[];
        for(let i=0; i<user.specialities.length; i++){
          let find_query_item = {specialty_id:user.specialities[i].specialty_id};

          if(user.specialities[i].workplace && user.specialities[i].on_departure)
            find_query_item.departure="ANY";
          else if(user.specialities[i].workplace)
            find_query_item.departure={$in:["ANY", "OFFICE"]};
          else if(user.specialities[i].on_departure)
            find_query_item.departure={$in:["ANY", "ADDRESS"]};
          else
            find_query_item.departure={$in:["NONE...DEADEND"]};

          find_query_items.push(find_query_item);
        }

        let find_query = {
          status: 10,
          for_now: false,
          $or:find_query_items
        };

        //let executors = await api.Order.find(find_query);
        let orders = await api.Order.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: 20000000,
               query: find_query,
              //  includeLocs: "dist.location",
                spherical: true
             }
           }
        ]);
            return response({
                status: "OK",
                error:null,
                data: orders
            });

    });

}

async function cancelOrderForLater(data) {
    let {auth_user, order_id} = data;
    return new Promise(async (response, reject) => {
      let user, second_user, close_status, summ = null;

      if(auth_user.role==="CUSTOMER")
        user = await api.Customer.findById(auth_user.id);
      else if(auth_user.role==="EXECUTOR")
        user = await api.Executor.findById(auth_user.id);
      
       

      let order = await api.Order.findById(order_id);

      if(!order || order.status>20 || user.active_order_id === order._id )
        return response({
            status: "ERROR",
            error:"ORDER_STATUS_ERROR",
            data: {}
        });

        if(auth_user.role==="EXECUTOR" && (!order.executor_id || order.executor_id.toString()!== user._id.toString() || order.status!==20) )
          return response({
            status: "ERROR",
            error:"ORDER_STATUS_ERROR",
            data: {}
          });

        if(auth_user.role==="CUSTOMER"){
           second_user = await api.Executor.findById(order.executor_id);
           // no chosen executor
           if(order.status<20)
             {

             }
             // already have chosen executor
           else{
             if( order.executor_id)
               push.sendPush("EXECUTOR", order.executor_id, "PLANNED_ORDER_CANCEL", {
                speciality: order.specialty.name,
                order_id: order._id,
                scheduled_time: order.scheduled_time
               });
           }

             close_status = 120;
          history.add(order.id, close_status, "Клиент отменил запланированный заказ");

        }
        else if(auth_user.role==="EXECUTOR"){
          second_user = await api.Customer.findById(order.customer_id);
         
            close_status = 130;

          history.add(order.id, close_status, "Исполнитель отменил запланированный заказ");

          push.sendPush("CUSTOMER", order.customer_id, "PLANNED_ORDER_CANCEL", {
            executor_name: user.name,
            speciality: order.specialty.name,
            order_id: order._id,
            price: parseFloat(order.price.toString()),
            summ_type: order.summ_type
          });

        }


         order.status = close_status;
         order.cancel_reason = {type:"NONE", text:"NONE", initiator:auth_user.role };
         await order.save();


        amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});

        return response({
            status: "OK",
            error: null,
            data: {}
        });

    }
  );
}

async function onMyWay(data) {
  // only for EXECUTORS
    let {auth_user} = data;

    return new Promise(async (response, reject) => {


        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let order = await api.Order.findById(data.order_id);
        let customer = await api.Customer.findById(order.customer_id);

        if(!order || !order.executor_id || order.status !== 20 || (order.executor_id !== user._id && order.executor_id.toString() !== user._id.toString()) )
          return response({
            status: "ERROR",
            error: 'ORDER_STATUS_ERROR',
            data:null
          });

        if(user.active_order_id)
          return response({
              status: "ERROR",
              error:"ALREDY_HAVE_ACTIVE_ORDER",
              data: null
          });

        if(customer.active_order_id)
          return response({
              status: "ERROR",
              error:"CUSTOMER_IS_BUSY",
              data: null
          });


          let distance;
          if(order.departure === "OFFICE"){
              distance = map.getDistance(order.address, customer);
          } else {
              distance = map.getDistance(order.address, user);
          }
          console.log("LATER ORDER START WORK : distance in meters ("+order.departure+") ", distance);
          
          if (distance > 150)
            return response({
                status: "ERROR",
                error: 'TOO_FAR_FOR_START',
                data:null
            });

        console.log('current ', moment().unix())
        console.log('scheduled_time  ', moment(order.scheduled_time).unix())
        if(( moment(order.scheduled_time).unix() -  moment().unix()) > (3 * 60 * 60))
          return response({
            status: "ERROR",
            error: 'TOO_EARLY_FOR_START',
            data:null
          });

        user.active_order_id = order._id;
        customer.active_order_id = order._id;
        await user.save();
        await customer.save();

       
        order.status = 50;
        order.start_work_time= new Date();
        await order.save();

        await push.sendPush("CUSTOMER", order.customer_id, "ORDER_WORK_STARTED", {
          executor_name: user.name,
          order_id: order._id
        });

        //amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
        //amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});


        amqpLib.sendSocketMessage("ORDER_ACTIVATED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("ORDER_ACTIVATED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});


        await history.add(order._id, 50, "Исполнитель инициировал начало работы");

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

        if(order.summ_type !== "FIXED")
            await check_lib.updateCheck(order._id, true);

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('ORDER',order)
        });

    });

}

//OLD_DESIGN
async function createExecutorOffer(data) {
  // only for EXECUTORS
    let {auth_user} = data;

    return new Promise(async (response, reject) => {


        let user = await api.Executor.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let order = await api.Order.findById(data.order_id);
        if(!order || order.status>10 || order.for_now)
        return response({
            status: "ERROR",
            error: "WRONG_ORDER_STATUS",
            data: {}
        });

        let create_body = {
          executor_id: mongoose.Types.ObjectId(auth_user.id),
          order_id: order._id,
          summ_type: data.summ_type,
          summ: data.summ,
          departure: data.departure
        }
        if(data.departure==="OFFICE")
          {
            if(!user.address_id)
              return response({
                  status: "ERROR",
                  error: "WRONG_ORDER_STATUS",
                  data: {}
              });
            else{

            }
          }

        let find_query_items =[];
        for(let i=0; i<user.specialities.length; i++){
          let find_query_item = {specialty_id:user.specialities[i].specialty_id};

          if(user.specialities[i].workplace && user.specialities[i].on_departure)
            find_query_item.departure="ANY";
          else if(user.specialities[i].workplace)
            find_query_item.departure={$in:["ANY", "OFFICE"]};
          else if(user.specialities[i].on_departure)
            find_query_item.departure={$in:["ANY", "ADDRESS"]};
          else
            find_query_item.departure={$in:["NONE...DEADEND"]};

          find_query_items.push(find_query_item);
        }

        let find_query = {
          status: 10,
          for_now: false,
          $or:find_query_items
        };

        //let executors = await api.Order.find(find_query);
        let orders = await api.Order.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: 20000000,
               query: find_query,
              //  includeLocs: "dist.location",
                spherical: true
             }
           }
        ]);
            return response({
                status: "OK",
                error:null,
                data: orders
            });

    });

}

var exports = module.exports = {};
exports.findOrdersForFuture = findOrdersForFuture;
exports.createOrderOffer = createOrderOffer;
exports.getExecutorOffers = getExecutorOffers;
exports.approveExecutorOffers = approveExecutorOffers;
exports.cancelOrderOffer = cancelOrderOffer;
exports.cancelOrderForLater = cancelOrderForLater;
exports.getPlannedOrdersForFuture = getPlannedOrdersForFuture;
exports.onMyWay = onMyWay;
exports.getMyOfferByOrder = getMyOfferByOrder;