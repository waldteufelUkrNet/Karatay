var specialities = require('./speciality');
var address = require('./address');
var organization = require('./organization');
var order = require('./order');
var moment = require('moment');
var libs = require('../../libs/general');

var exports = module.exports = {};

async function myProfile(input) {
  var api = require('../api');
  input = input.toJSON();
  
    let resp = {
      id: input._id,
      name: input.name,
      second_name: input.second_name,
      surname: input.surname,
      phone: input.phone,
      photo: input.photo ? input.photo : null ,
      inn: input.inn,
      sex: input.sex,
      passport: input.passport,
      city: input.city,
      about: input.about,
      orders_count: input.orders_count ? input.orders_count : 0,
      registered: input.registered,
      status: input.status,
      balance: parseFloat('' + input.balance).toFixed(2),
      bonus_balance: parseFloat('' + input.bonus_balance).toFixed(2),
      specialities:[],
      office: null,
      organization: null,
      requested_order: null,
      requested_order_wait_time: null,
      rate: input.marks_count ? parseFloat(input.summ_mark/input.marks_count).toFixed(2) : "0" ,
      referral_users_count: input.referral_users_count ? input.referral_users_count : 0 ,
      referral_code: input.referral_code ? input.referral_code : null,
      referral_balance: input.referral_balance ? input.referral_balance :0
    };
    if(input.specialities){
      resp.specialities = await specialities.getExecutorSpeciality(input.specialities);
    }
    if(input.office){
      resp.office = await address.getAddress(input.office);
    }
    let organization_entity;
    if(input.organization_id){
      organization_entity = await api.Organization.findById(input.organization_id);
      resp.organization = organization.getShortOrganization(organization_entity);
    }

    if(input.requested_order_id){
      requested_order_entity = await api.Order.findById(input.requested_order_id);
      console.log("fount this one ",requested_order_entity)
      if(requested_order_entity)
        resp.requested_order = await order.getOrder(requested_order_entity);
    }

    if(organization_entity){
      if(organization_entity.summ_mark)
        resp.rate = parseFloat(organization_entity.summ_mark/organization_entity.marks_count).toFixed(2);
    }
    else {
      if(input.summ_mark)
        resp.rate = parseFloat(input.summ_mark/input.marks_count);
    }

    if(input.requested_order_time){
      let wait_time = 60000;
        let time_diff = moment().unix() - moment(input.requested_order_time).unix();
        if(time_diff*1000 < wait_time)
          resp.requested_order_wait_time = wait_time - time_diff*1000;
        else
          resp.requested_order_wait_time = 0;
    }

    return resp;
}



async function fullProfile(input) {
  var api = require('../api');
  input = input.toJSON();
  
    let resp = {
      id: input._id,
      name: input.name,
      second_name: input.second_name,
      surname: input.surname,
      phone: input.phone,
      photo: input.photo ? input.photo : null ,
      sex: input.sex,
      city: input.city,
      about: input.about,
      orders_count: input.orders_count ? input.orders_count : 0,
      registered: input.registered,
      status: input.status,
      specialities:[],
      rate: input.marks_count ? parseFloat(input.summ_mark/input.marks_count).toFixed(2) : "0",
      marks_count: input.marks_count
    };
    if(input.specialities){
      resp.specialities = await specialities.getExecutorSpeciality(input.specialities);
    }
    
    let organization_entity;
    if(input.organization_id){
      organization_entity = await api.Organization.findById(input.organization_id);
    }

    if(organization_entity){
      if(organization_entity.summ_mark)
        resp.rate = parseFloat(organization_entity.summ_mark/organization_entity.marks_count).toFixed(2);
    }

    return resp;
}

async function adminExecutorInfo(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await adminExecutorInfo(input[i]));

        return resp;
    }

    resp = {
      id: input._id,
      name: input.name,
      second_name: input.second_name,
      surname: input.surname,
      phone: input.phone,
      photo: input.photo ? input.photo : null ,
      inn: input.inn,
      lon: parseFloat(input.lon.toString()),
      lat: parseFloat(input.lat.toString()),
      passport: input.passport,
      city: input.city,
      about: input.about,
      sex: input.sex,
      registered: input.registered,
      status: input.status,
      balance: parseFloat(input.balance.toString()),
      bonus_balance: parseFloat(input.bonus_balance.toString()),
      reject_reason: input.reject_reason,
      specialities:[],
      office: null
    };
    if(input.specialities){
      resp.specialities = await specialities.getExecutorSpeciality(input.specialities);
    }
    if(input.office){
      resp.office = await address.getAddress(input.office);
    }
    if(input.office){
      resp.office = await address.getAddress(input.office);
    }
    if(input.order && input.order.length){
      resp.order = await order.getAdminOrder(input.order[0]);
    }

    return resp;
}

async function shortExecutor(input) {
  let resp;

  if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
          resp.push(await shortExecutor(input[i]));

      return resp;
  }

  resp = {
    id: input._id,
    name: input.name,
    second_name: input.second_name,
    surname: input.surname,
    phone: input.phone,
    photo: input.photo ? input.photo : null ,
    about: input.about,
    sex: input.sex,
    lat: input.lat ? parseFloat(input.lat.toString()) : null,
    lon: input.lon ? parseFloat(input.lon.toString()) : null,
    rate: input.marks_count ? parseFloat(input.summ_mark/input.marks_count).toFixed(2) : "0" ,
    status: input.status
  };
  
  return resp;
}

async function adminExecutorFinancialHistory(input) {
  let resp;

  if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
          resp.push(await adminExecutorFinancialHistory(input[i]));

      return resp;
  }

  resp = {
    id: input._id,
      executor_id: input.executor_id,
      type: input.type,
      balance_type: input.balance_type,
      summ: input.summ ? parseFloat(input.summ.toString()).toFixed(2) : 0,
      order_id: input.order_id,
      payment_id: input.payment_id,
      card_id: input.card_id,
      info: input.info,
      date: libs.formatDate(input.date),
      after_balance: input.after_balance ? parseFloat(input.after_balance.toString()).toFixed(2) : 0,
      performer: input.performer
  };

  return resp;
}

exports.myProfile=myProfile;
exports.shortExecutor=shortExecutor;
exports.fullProfile=fullProfile;
exports.adminExecutorInfo=adminExecutorInfo;
exports.adminExecutorFinancialHistory=adminExecutorFinancialHistory;
