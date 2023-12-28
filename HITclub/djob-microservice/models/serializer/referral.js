var moment = require('moment');

var exports = module.exports = {};

async function adminCustomerReferralHistory(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await adminCustomerReferralHistory(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        order_id: input.order_id,
        summ: input.summ,
        date: moment(input.date).format('YYYY-MM-DD HH:mm:ss')
    };
    return resp;
}

async function adminExecutorReferralHistory(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await adminExecutorReferralHistory(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        order_id: input.order_id,
        summ: input.summ,
        date: moment(input.date).format('YYYY-MM-DD HH:mm:ss')
    };
    return resp;
}

exports.adminCustomerReferralHistory = adminCustomerReferralHistory;
exports.adminExecutorReferralHistory = adminExecutorReferralHistory;
