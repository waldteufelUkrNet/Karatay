var specialities = require('./speciality');
var address = require('./address');
var checkLib = require('../../libs/check');

var moment = require('moment');

var exports = module.exports = {};
 
async function getOrder(input) {
  let executor = require('./executor');
  let customer = require('./customer');

  var api = require('../api');
    let resp;

    

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getOrder(input[i]));

      return resp;
    }
    
    
    //input = input.toJSON();
    let input_json = input.toJSON();

    resp = {
      id: input._id,
      specialty: await specialities.getSpeciality(input.specialty),
      status: input.status,
      cancel_reason_code: input.cancel_reason_code || null,
      minimal_hours: input.minimal_hours || 1,
      comment: input.comment,
      address: await address.getAddress(input.address),
      executor_id: input.executor_id,
      customer_id: input.customer_id,
      payment_type:input.payment_type,
      for_now: input.for_now, 
      scheduled_time: input.scheduled_time,
      scheduled_time_minutes: input.scheduled_time_minutes ? input.scheduled_time_minutes : 0,
      departure: input.departure,
      summ_type: input.summ_type,
      summ: input_json.summ,
      price: input_json.price ? parseInt(input_json.price) : null,
      departure_address: null,
      map: null,
      start_walk_time: input.start_walk_time,
      start_work_time: input.start_work_time,
      end_work_time: input.end_work_time,
      finishedAt: input.finishedAt,
      duration: input.duration,
      check: null,
      cancel_reason: null,
      createdAt: input.createdAt,
      executor: null,
      customer: null,
      offers_count: input.offered_executor_ids.length,

      requested_executor: null,

      customer_mark : null,
      executor_mark: null,
      requested_summ_type: input.requested_summ_type ? input.requested_summ_type : null,
      requested_price: input.requested_price ? input_json.requested_price : null,
      requested_departure: input.requested_departure ? input.requested_departure : null
    }

    if(input.departure_address)
      resp.departure_address = await address.getAddress(input.departure_address);
    if(input.map)
      resp.map = input.map;

    if(input.check)
      resp.check = input.check;

    if(!resp.check && resp.status >=20 )
      resp.check = await checkLib.makeCheck(input);
      
      //
      if(resp.check){
        resp.check.order_check.full_price =  parseFloat(resp.check.order_check.full_price.toString());
        resp.check.customer_check.full_price =  parseFloat(resp.check.customer_check.full_price.toString())
        resp.check.executor_check.full_price =  parseFloat(resp.check.executor_check.full_price.toString())
      }


    if(input.cancel_reason)
      resp.cancel_reason = input.cancel_reason;

      let executor_entity;
      if(input.executor_id){
        executor_entity = await api.Executor.findById(input.executor_id);
        if(executor_entity)
          resp.executor = await executor.shortExecutor(executor_entity);
      }

      if(input.status === 11){
        let requested_executor_entity = await api.Executor.findOne({requested_order_id: input._id});
        if(requested_executor_entity){
          resp.requested_executor = await executor.shortExecutor(requested_executor_entity);
        }
      }

      if(input.status >= 100){
        let ex_mark = await api.ExecutorMark.findOne({order_id: input._id});
          if(ex_mark){
            resp.customer_mark = ex_mark.rate;
          }
        let cu_mark = await api.CustomerMark.findOne({order_id: input._id});
          if(cu_mark){
            resp.executor_mark = cu_mark.rate;
          }
      }

      let customer_entity;
      if(input.customer_id){
        customer_entity = await api.Customer.findById(input.customer_id);
        if(customer_entity)
          resp.customer = await customer.shortCustomer(customer_entity);
      }

    return resp;
  }

async function getAdminOrder(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getAdminOrder(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      specialty: await specialities.getSpeciality(input.specialty),
      status: input.status,
      comment: input.comment,
      address: await address.getAddress(input.address),
      payment_type:input.payment_type,
      for_now: input.for_now,
      scheduled_time: moment(input.scheduled_time).format('YYYY-MM-DD HH:mm:ss'),
      departure: input.departure,
      departure_address: input.departure_address,
      summ_type: input.summ_type,
      summ: input.summ ? parseFloat(input.summ) : null,
      createdAt: moment(input.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      end_work_time: moment(input.end_work_time).format('YYYY-MM-DD HH:mm:ss'),
      duration: moment(input.duration).format('YYYY-MM-DD HH:mm:ss'),
    };

    if(input.customer && input.customer[0]) {
        resp.customer = {
            id: input.customer[0]._id,
            phone: input.customer[0].phone
        };
    }

    if(input.executor && input.executor[0]) {
        resp.executor = {
            id: input.executor[0]._id,
            phone: input.executor[0].phone
        };
    }

    return resp;
}

async function getAdminOrderHistory(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getAdminOrderHistory(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      status: input.status,
      createdAt: moment(input.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    };

    if(input.customer && input.customer[0]) {
        resp.customer = {
            id: input.customer[0]._id,
            phone: input.customer[0].phone
        };
    }

    if(input.executor && input.executor[0]) {
        resp.executor = {
            id: input.executor[0]._id,
            phone: input.executor[0].phone
        };
    }

    if(input.departure_address)
      resp.departure_address = await address.getAddress(input.departure_address);
    if(input.map)
      resp.map = input.map;
    if(input.check)
      resp.check = input.check;
    if(input.cancel_reason)
      resp.check = input.cancel_reason;

    return resp;
}

exports.getOrder=getOrder;
exports.getAdminOrder=getAdminOrder;
exports.getAdminOrderHistory=getAdminOrderHistory;
