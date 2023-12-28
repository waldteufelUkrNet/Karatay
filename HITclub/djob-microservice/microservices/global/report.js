var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function makeReport(data) {
    let {auth_user, order_id, photo, text} = data;
    return new Promise(async (response, reject) => {
       
        let order = await api.Order.findById(order_id); 
        if(!order)
            return response({
                status: "ERROR",
                error:"NO_ORDER",
                data: {}
            });
         
        let report = {
             order_id: order._id,
            customer_id: order.customer_id,
            executor_id: order.executor_id,
            text, 
            initiator:auth_user.role 
        };
        if(photo)
            report.photo = photo;
            
        let report_entity = await api.OrderReport.create(report);

            return response({
                status: "OK",
                error:null,
                data: {}
            });
    });
}

var exports = module.exports = {};
exports.makeReport = makeReport;