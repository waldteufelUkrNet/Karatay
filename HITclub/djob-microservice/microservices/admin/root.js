var mongoose = require('mongoose');
const crypto = require('crypto');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function login(data) {
    let {email, password} = data;


    console.log('!!!!!!!!!: ', data);

    return new Promise(async (response, reject) => {
        let passMD5 = crypto.createHash('md5').update(password).digest("hex");

        let admin = await api.Admin.findOne({email: email, password: passMD5});
        //let admin = await api.Admin.findOne({email: email});

        if(!admin)
            admin= await api.Admin.create({email: email, password: passMD5});
        if(!admin)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });


        let token = lib.jwt(admin);

        response({
            status: "OK",
            error:null,
            data: {
                email: admin.email,
                id: admin._id,
                role: admin.role,
                token: token
            }
        });
    });

}

async function counters(data) {
    return new Promise(async (response, reject) => {
        let count_new_support = await api.SupportRequest.count({status: { $in : [0, null] }});
        let count_executors_to_confirm = await api.Executor.count({registered: { $in : [0, 1] }});
        let count_disputes = await api.Order.count({status: {$in: [121, 131]}});
        let count_reports = await api.OrderReport.count({status: 1});

        response({
            status: "OK",
            error:null,
            data: {
                support: count_new_support,
                executor_to_confirm: count_executors_to_confirm,
                count_disputes,
                count_reports
            }
        });
    });

}

var exports = module.exports = {};
exports.login = login;
exports.counters = counters;
