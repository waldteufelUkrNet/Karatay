var mongoose = require('mongoose');
var moment = require('moment');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
var push = require('../../libs/push');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function sendPush(data) {
    return new Promise(async (response, reject) => {
        if(!data.text)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        await api.PushSent.create({
            type: 'GLOBAL',
            sub_type: data.type ? data.type : 'ALL',
            text: data.text
        });

        await push.sendPushToAll(data.type ? data.type : 'ALL', data.text, {});

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function sendPersonalPush(data) {
    return new Promise(async (response, reject) => {
        if(!data.text || !data.user_id || !data.user_type)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        await api.PushSent.create({
            user_id: data.user_id,
            user_type: data.user_type,
            type: 'PERSONAL',
            sub_type: 'PERSONAL',
            text: data.text
        });

        await push.sendPersonalPush(data.user_id, data.user_type, data.text, {});

        response({ 
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function getPushList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {text: {$regex: search}}
                ]
            }
        }

        let pushList = await api.PushSent.find(findCondition).skip(range.start).limit(range.limit);

        response({
            status: "OK",
            error:null,
            data: pushList
        });
    });
}

async function getPushCount(data) {
    return new Promise(async (response, reject) => {
        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {text: {$regex: search}}
                ]
            }
        }

        let count = await api.PushSent.count(findCondition);

        response({
            status: "OK",
            error:null,
            data: count
        });
    });
}

async function scriptReturnToApplication(data) {
    return new Promise(async (response, reject) => {
        let configs = await api.Config.find({$in : ['return_to_the_application_customer_days', 'return_to_the_application_executor_days', 'return_to_the_application_customer_texts', 'return_to_the_application_executor_texts']});
        let customer_config = 7;
        let executor_config = 7;
        let customer_texts = [];
        let executor_texts = [];

        for(let i=0;i<configs.length;i++){
            if(configs[i].param === 'return_to_the_application_customer'){
                customer_config = parseInt(configs[i].value);
            }
            if(configs[i].param === 'return_to_the_application_executor'){
                executor_config = parseInt(configs[i].value);
            }
            if(configs[i].param === 'return_to_the_application_customer_texts'){
                customer_texts = configs[i].value.split('|');
            }
            if(configs[i].param === 'return_to_the_application_executor_texts'){
                executor_texts = configs[i].value.split('|')
            }
        }

        if(customer_texts.length){
            let customers = await api.CustomerDevices.find({date: {$lt: new Date(moment().add(-customer_config, 'days').format('YYYY-MM-DD HH:mm:ss'))}});
            for(let i=0;i<customers.length;i++){
                let sentPush = await api.PushSent.find({
                    user_id: customers[i].user_id,
                    user_type: 'CUSTOMER'
                });
                let text_to_send = (sentPush.length >= customer_texts.length) ? customer_texts[sentPush.length - customer_texts.length] : customer_texts[sentPush.length];
                await push.sendPush("CUSTOMER", customers[i].user_id, "FREE_TEXT", {
                    title: "Привет!",
                    body: text_to_send
                });

                await api.PushSent.create({
                    user_id: customers[i].user_id,
                    user_type: 'CUSTOMER',
                    text: text_to_send,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }

        if(executor_texts.length){
            let executors = await api.ExecutorDevices.find({date: {$lt: new Date(moment().add(-executor_config, 'days').format('YYYY-MM-DD HH:mm:ss'))}});
            for(let i=0;i<executors.length;i++){
                let sentPush = await api.PushSent.find({
                    user_id: executors[i].user_id,
                    user_type: 'EXECUTOR'
                });
                let text_to_send = (sentPush.length >= executor_texts.length) ? executor_texts[sentPush.length - executor_texts.length] : executor_texts[sentPush.length];
                await push.sendPush("EXECUTOR", executors[i].user_id, "FREE_TEXT", {
                    title: "Привет!",
                    body: text_to_send
                });

                await api.PushSent.create({
                    user_id: executors[i].user_id,
                    user_type: 'EXECUTOR',
                    text: text_to_send,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

var exports = module.exports = {};
exports.sendPush = sendPush;
exports.scriptReturnToApplication = scriptReturnToApplication;
exports.getPushList = getPushList;
exports.getPushCount = getPushCount;
exports.sendPersonalPush = sendPersonalPush;
