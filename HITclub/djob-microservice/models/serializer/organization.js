var address = require('./address');
var moment = require('moment');
var order = require('./order');
var exports = module.exports = {};

async function getShortOrganization(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getShortOrganization(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      name: input.name,
      about : input.about,
      photo : input.photo,
      summ_mark: parseInt(input.summ_mark),
      marks_count: parseInt(input.marks_count)
    }

    return resp;
}

function getOrganization(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(getOrganization(input[i]));

      return resp;
    }

    input = input.toJSON();

    resp = {
        id: input._id,
        name: input.name,
        email: input.email,
        phone: input.phone,
        amountOfExecutors: input.amountOfExecutors,
        password: input.password,
        balance: input.balance,
        bonus_balance: input.bonus_balance,
        about: input.about,
        photo: input.photo,
        take_urgent: input.take_urgent,
        take_not_urgent: input.take_not_urgent,
        summ_mark: parseInt(input.summ_mark),
        register_date: input.register_date,
        register_agency: input.register_agency,
        code: input.code,
        marks_count: parseInt(input.marks_count)
    };

    return resp;
}

async function getOrganizationOrderHistory(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await getOrganizationOrderHistory(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        executor_id: input.executor_id,
        order_id: input.order_id,
        summ_type: input.summ_type,
        summ:  input.summ,
        departure: input.departure,
        address: {type: address.schema, default: null},
        status: input.status,
        createdAt: moment(input.createdAt).format('YYYY-MM-DD HH:mm:ss')
    };

    if(input.customer && input.customer[0]) {
        resp.customer = {
            id: input.customer[0]._id,
            phone: input.customer[0].phone
        };
    }

    if(input.address)
        resp.address = await address.getAddress(input.address);

    if(input.order && input.order.length)
        resp.order = await order.getAdminOrder(input.order[0]);

    if(input.executor && input.executor.length) {
        resp.executor = {
            id: input.executor[0]._id,
            phone: input.executor[0].phone,
            name: input.executor[0].name
        };
    }

    return resp;
}

async function getOrganizationOrderInfo(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await getOrder(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        specialty: await specialities.getSpeciality(input.specialty),
        status: input.status,
        comment: input.comment,
        address: await address.getAddress(input.address),
        executor_id: input.executor_id,
        customer_id: input.customer_id,
        payment_type:input.payment_type,
        for_now: input.for_now,
        scheduled_time: input.scheduled_time,
        departure: input.departure,
        summ_type: input.summ_type,
        summ: input.summ,
        departure_address: null,
        map: null,
        start_walk_time: input.start_walk_time,
        start_work_time: input.start_work_time,
        end_work_time: input.end_work_time,
        finishedAt: input.finishedAt,
        duration: input.duration,
        check: null,
        cancel_reason: null,
        createdAt: input.createdAt
    };

    if(input.departure_address)
        resp.departure_address = await address.getAddress(input.departure_address);
    if(input.address)
        resp.address = await address.getAddress(input.address);
    if(input.map)
        resp.map = input.map;
    if(input.check)
        resp.check = input.check;
    if(input.cancel_reason)
        resp.check = input.cancel_reason;

    return resp;
}

exports.getShortOrganization=getShortOrganization;
exports.getOrganization=getOrganization;
exports.getOrganizationOrderHistory=getOrganizationOrderHistory;
exports.getOrganizationOrderInfo=getOrganizationOrderInfo;
