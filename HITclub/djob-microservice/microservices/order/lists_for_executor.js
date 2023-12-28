var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var history = require('../../libs/history');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

//OLD_DESIGN
async function getAddressOnlyApprovedOffersOrders(data) {
  // TAB 2
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let orders = await api.Order.find({
        executor_id:  mongoose.Types.ObjectId(auth_user.id),
        status: {$lt: 100},
        for_now: false,
        departure: "ADDRESS"
      });

      return response({
          status: "OK",
          error:null,
          data: await api.Serialize('ORDER',orders)
      });

    }
  )
}
//OLD_DESIGN
async function getOfficeOnlyApprovedOffersOrders(data) {
  // TAB 2
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let orders = await api.Order.find({
        executor_id:  mongoose.Types.ObjectId(auth_user.id),
        status: {$lt: 100},
        for_now: false,
        departure: "OFFICE"
      });

      return response({
          status: "OK",
          error:null,
          data: await api.Serialize('ORDER',orders)
      });

    }
  )
}

//OLD_DESIGN
async function getAllApprovedOffersOrders(data) {
  // TAB 2
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let orders = await api.Order.find({
        executor_id:  mongoose.Types.ObjectId(auth_user.id),
        for_now: false,
        status: {$lt: 100}
      });

      return response({
          status: "OK",
          error:null,
          data: await api.Serialize('ORDER',orders)
      });

    }
  )
}

//OLD_DESIGN
async function getAddressUnofferedOrders(data) {
  // TAB 3-1
    let {auth_user, speciality_id, sort_by, max_distance} = data;
    if(!max_distance)
      max_distance = 20000000000;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });


      let order_criteria ={
        executor_id: null,
        for_now: false,
        status: {$lt: 20},
        departure: {$in: ["ADDRESS", "ANY"]},
        offered_executor_ids: { "$nin": [ auth_user.id ]}
      };

      if(speciality_id)
        order_criteria.speciality_id=speciality_id;

        let orders;

      if(sort_by === "DISTANCE" && user.lat && user.lon){
        orders = await api.Executor.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: max_distance,
                query: order_criteria,
                spherical: true
             }
           }
        ]);
      }
      else {
        orders = await api.Order.find(order_criteria).sort({scheduled_time: -1});
      }
      return response({
          status: "OK",
          error:null,
          data: await api.Serialize('ORDER',orders)
      });

    }
  )
}

//OLD_DESIGN
async function getOfficeUnofferedOrders(data) {
  // TAB 3-2
    let {auth_user, speciality_id, sort_by, max_distance} = data;
    if(!max_distance)
      max_distance = 20000000000;
    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });

      let order_criteria ={
        executor_id: null,
        for_now: false,
        status: {$lt: 20},
        departure: {$in: ["OFFICE", "ANY"]},
        offered_executor_ids: { "$nin": [ auth_user.id ]}
      };

      if(speciality_id)
        order_criteria.speciality_id=speciality_id;

        let orders;

      if(sort_by === "DISTANCE" && user.lat && user.lon){
        orders = await api.Executor.aggregate([
           {
             $geoNear: {
                near: user.location,
                distanceField: "distance",
                maxDistance: max_distance,
                query: order_criteria,
                spherical: true
             }
           }
        ]);
      }
      else {
        orders = await api.Order.find(order_criteria).sort({scheduled_time: -1});
      }


      return response({
          status: "OK",
          error:null,
          data: await api.Serialize('ORDER',orders)
      });

    }
  )
}
//OLD_DESIGN
async function getApprovedAndOfferedOrders(data) {
  // TAB 3-3
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
      let user = await api.Executor.findOne({_id: auth_user.id});
      if(!user)
      return response({
          status: "ERROR",
          error: "AUTH_ERROR",
          data: {}
      });


      let approved_orders = await api.Order.find({
        executor_id:  mongoose.Types.ObjectId(auth_user.id),
        for_now: false,
        status: {$lt: 100}
      });

      let unapproved_orders = await api.Order.find({
        executor_id:  null,
        status: {$lt: 20},
        for_now: false,
        offered_executor_ids: { "$in": [ auth_user.id ]}
      });

      return response({
          status: "OK",
          error:null,
          data: {
          approved_orders,
          unapproved_orders
          }
      });

    }
  )
}


var exports = module.exports = {};
exports.getAddressOnlyApprovedOffersOrders = getAddressOnlyApprovedOffersOrders;
exports.getOfficeOnlyApprovedOffersOrders = getOfficeOnlyApprovedOffersOrders;
exports.getAllApprovedOffersOrders = getAllApprovedOffersOrders;
exports.getAddressUnofferedOrders = getAddressUnofferedOrders;
exports.getOfficeUnofferedOrders = getOfficeUnofferedOrders;
exports.getApprovedAndOfferedOrders = getApprovedAndOfferedOrders;
