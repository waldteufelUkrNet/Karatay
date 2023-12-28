var moment = require('moment');
var order = require('./order');
var customer = require('./customer');
var executor = require('./executor');

var exports = module.exports = {};

async function adminReportsList(input) {
    let resp;
    if(Array.isArray(input)){
        resp = [];
        for(let i=0; i<input.length; i++)
            resp.push(await adminReportsList(input[i]));
        return resp;
    }

    resp = {
        id: input._id,
        text: input.text,
        photo: input.photo,
        initiator: input.initiator,
        executor: input.executor && input.executor[0] ? await executor.adminExecutorInfo(input.executor[0]) : null,
        customer: input.customer && input.customer[0] ? await customer.adminCustomerInfo(input.customer[0]) : null,
        order: input.order && input.order[0] ? await order.getAdminOrder(input.order[0]) : null,
        status: input.status,
        createdAt: moment(input.createdAt).format('YYYY-MM-DD HH:mm:ss')
    };

    return resp;
}

exports.adminReportsList=adminReportsList;
