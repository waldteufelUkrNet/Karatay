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

async function getOrderById(data) {
    let {auth_user, order_id} = data;

    return new Promise(async (response, reject) => {
        let user;

        if (auth_user.role === "CUSTOMER")
            user = await api.Customer.findById(auth_user.id);
        if (auth_user.role === "EXECUTOR")
            user = await api.Executor.findById(auth_user.id);


        let order = await api.Order.findById(order_id);
        if (!order)
            return response({
                status: "ERROR",
                error: "NO_SUCH_ORDER",
                data:null
            });

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('ORDER',order)
        });
    });

}

var exports = module.exports = {};
exports.getOrderById = getOrderById;

