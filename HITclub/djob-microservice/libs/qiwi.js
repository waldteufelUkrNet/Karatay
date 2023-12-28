var mongoose = require('mongoose');
const querystring = require('querystring');
const https = require('https');
var fs = require('fs');
var path = require('path');
var api = require('../models/api');
const config = require('../config');
var crypto = require('crypto');
var moment = require('moment');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

function randomKey(len = 7, charSet = null) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

async function getToken(user_id, user_type = 'CUSTOMER') {
    let _user;

    if(user_type === 'CUSTOMER')
        _user = await api.Customer.findById(user_id);
    else
        _user = await api.Executor.findById(user_id);

    let postData = {
        "opcode": 1,
        "merchant_site": config.qiwi.merchant_site,
        "merchant_uid": user_id,
        "currency": 643,
        "amount": '1.00',
        "cf4": user_type,
        "cf2": user_id,
        "cf3": '1;0',
        "order_id": randomKey(15) + moment().unix(),
        "cf1": _user.phone,
        "phone": _user.phone,
        "callback_url": 'https://api.hitclub.online/qiwi/callback/wpf'
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');

    return postData;
}

async function refill(user_id, amount, user_type = 'CUSTOMER') {
    let _user;

    if(user_type === 'CUSTOMER')
        _user = await api.Customer.findById(user_id);
    else
        _user = await api.Executor.findById(user_id);

    let postData = {
        "opcode": 1,
        "merchant_site": config.qiwi.merchant_site,
        "merchant_uid": user_id,
        "currency": 643,
        "amount": parseFloat('' + amount).toFixed(2),
        "cf4": user_type,
        "cf2": user_id,
        "cf3": parseInt('' + amount) + ';0',
        "order_id": randomKey(15) + moment().unix(),
        "cf1": _user.phone,
        "phone": _user.phone,
        "callback_url": 'https://api.hitclub.online/qiwi/callback/refill'
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');

    return postData;
}

async function holding(order_id, amount, commission, card_id) {
    let order = await api.Order.findById(order_id);

    if(!order)
        return false;

    let card = await api.Card.findOne({
        _id: card_id,
        user_id: order.customer_id,
        user_type: 'CUSTOMER',
        active: true
    });

    console.log('0001: ', card);

    if(!card)
        return {
            success: false,
            data: 'NO_SUCH_CARD'
        };

    let executor_card = await api.Card.findOne({
        user_id: order.executor_id,
        user_type: 'EXECUTOR',
        active: true
    });

    let postData = {
        "opcode": 3,
        "merchant_site": config.qiwi.merchant_site,
        "merchant_uid": '' + order.customer_id,
        "amount": parseFloat('' + amount).toFixed(2),
        "card_token": '' + card.token,
        "currency": 643,
        "cf2": '' + order_id,
        "order_id": '' + order_id + moment().unix(),
        "cf3": '' + (amount-commission).toFixed(2) + ';' + commission.toFixed(2),
        "cf4": '' + executor_card._id,
        "callback_url": "https://api.hitclub.online/qiwi/callback/holding"
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');


    console.log('post holding: ', postData);

    let qiwi_data = await request(postData);
    // console.log('!!!!!!!!!!: ', qiwi_data);
    qiwi_data = JSON.parse(qiwi_data);
    console.log('post holding response: ', qiwi_data);

    return {
        success: parseInt(qiwi_data.error_code) === 0,
        data: qiwi_data
    };
}

async function cancel(order_id) {
    let payments = await api.Payments.find({order_id: order_id});

    if(!payments || !payments.length)
        return false;

    let errors = [];

    for(let i=0;i<payments.length;i++){
        let postData = {
            "opcode": 6,
            "merchant_site": config.qiwi.merchant_site,
            "txn_id": parseInt(payments[i].qiwi_txn_id),
            "amount": parseFloat(payments[i].amount).toFixed(2),
            "cf3": '' + (parseFloat(payments[i].amount)-parseFloat(payments[i].commission)).toFixed(2) + ';' + payments[i].commission,
        };

        let postKeysSort = Object.keys(postData).sort();
        let signStr = '';
        for (let i = 0; i < postKeysSort.length; i++) {
            if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
                signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
            }
        }

        console.log('cancel post: ', postData);

        postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
            .update(signStr)
            .digest('hex');

        let response = await request(postData);
        response = JSON.parse(response);
        if(parseInt(response.error_code) !== 0){
            errors.push(response)
        }

        console.log('cancel data: ', response);
    }

    return {
        success: !errors.length,
        errors: errors
    };
}

async function confirm(order_id) {
    let order = await api.Order.findById(order_id);

    if(!order)
        return false;
    // console.log('!!!!!!!!!!!!!: ', order);

    console.log("QIWITEST ORDR", order);
    let errors = [];

    let payments = await api.Payments.find({order_id: order_id});

    if(!payments || !payments.length)
        return false;

    for(let i=0;i<payments.length;i++){
        let postData = {
            "opcode": 5,
            "merchant_site": config.qiwi.merchant_site,
            "txn_id": parseInt(payments[i].qiwi_txn_id),
            "cf3": '' + (parseFloat(payments[i].amount)-parseFloat(payments[i].commission)).toFixed(2) + ';' + payments[i].commission
        };

        let postKeysSort = Object.keys(postData).sort();
        let signStr = '';
        for (let i = 0; i < postKeysSort.length; i++) {
            if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
                signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
            }
        }

        postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
            .update(signStr)
            .digest('hex');

        let response = await request(postData);
        response = JSON.parse(response);
        if(parseInt(response.error_code) !== 0){
            errors.push(response)
        } else {
            let card = await api.Card.findOne({
                user_id: order.executor_id,
                user_type: 'EXECUTOR',
                active: true
            });

            let postPayoutData = {
                "opcode": 20,
                "merchant_site": config.qiwi.merchant_site,
                "merchant_uid": config.qiwi.merchant_id,
                "txn_id": payments[i].qiwi_txn_id,
                "order_id": payments[i].qiwi_order_id + 'p' + moment().unix(),
                "card_token": card.token,
                "currency": 643,
                "amount": (parseFloat(payments[i].amount) - parseFloat(payments[i].commission)).toFixed(2),
                "cf1": card._id,
                "cf2": order_id,
                "callback_url": "https://api.topjob.online/qiwi/callback/payout"
            };

            let postKeysPayoutSort = Object.keys(postPayoutData).sort();
            let signStr = '';
            for (let i = 0; i < postKeysPayoutSort.length; i++) {
                if (postPayoutData[postKeysPayoutSort[i]] && postPayoutData[postKeysPayoutSort[i]] !== '') {
                    signStr += (i === 0) ? postPayoutData[postKeysPayoutSort[i]] : '|' + postPayoutData[postKeysPayoutSort[i]];
                }
            }

            postPayoutData.sign = crypto.createHmac('sha256', config.qiwi.secret)
                .update(signStr)
                .digest('hex');

            console.log('requestPayoutData: ', postPayoutData);

            let responsePayout = await request(postPayoutData);
            responsePayout = JSON.parse(responsePayout);
            console.log('requestPayoutResponse: ', responsePayout);

            if(parseInt(responsePayout.error_code) !== 0){
                errors.push(responsePayout)
            } else {
                await api.ExecutorPayout.create({
                    executor_id: order.executor_id,
                    order_id: order._id,
                    amount: parseFloat(payments[i].amount)-parseFloat(payments[i].commission),
                    status: 1
                });

                console.log('Payout data: ', responsePayout);
            }


        }
        console.log('confirm data: ', response);
    }


    return {
        success: !errors.length,
        errors: errors
    };
}

async function refundWPF(txn_id) {
    let postData = {
        "opcode": 6,
        "merchant_site": config.qiwi.merchant_site,
        "txn_id": parseInt(txn_id),
        "amount": '1.00',
        "cf3": '1;0',
        "cf1": '+380988864940'
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');

    console.log('refund wpf: ', postData);

    let response = await request(postData);
    console.log('003: ', response);
    response = JSON.parse(response);


    if(parseInt(response.error_code) !== 0){
        return {
            success: false,
            error: response
        };
    } else {
        return {
            success: true
        };
    }
}

async function request(data) {
    return new Promise((resp, reje) => {
        try{
            let options = {
                hostname: 'acquiring.qiwi.com',
                port: 443,
                path: '/merchant/direct',
                method: 'POST',
                key: fs.readFileSync(config.qiwi.key),
                cert: fs.readFileSync(config.qiwi.cert),
            };
            let req = https.request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    resp(body);
                });
            });

            req.on('error', (e) => {
                console.log('QIWI ERROR: ', e);
                reje(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        } catch (tryError) {
            console.log('ERROR: ', tryError);
            reje(tryError);
        }

    })
}

/*
async function holdingExp(ind) {
    let postData = {
        opcode: 3,
        merchant_site: 2001720,
        merchant_uid: 3299,
        amount: '5.00',
        card_token: 'db11102b-1dac-4433-8413-a35d92b4e2ef',
        currency: 643,
        cf1: '380988864940',
        cf2: '604a32c36f9a6867c90fcd0f',
        order_id: '604a32c36f9a6867c90fcd0f1615475439' + ind,
        cf3: '4.90;0.10',
        cf4: '6033a4ff1364a17100572d42',
        callback_url: 'https://api.hitclub.online/qiwi/callback/acs'
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');


    console.log('post test holding: ', postData);

    let qiwi_data = await request(postData);
    qiwi_data = JSON.parse(qiwi_data);
    console.log('post test response: ', qiwi_data);

    return true;
}

async function cancelExp(txn_id) {
    let postData = {
        "opcode": 6,
        "merchant_site": config.qiwi.merchant_site,
        "txn_id": txn_id,
        "amount": '5.00',
        "cf3": '4.90;0.10',
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    console.log('cancel post: ', postData);

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');

    let response = await request(postData);
    response = JSON.parse(response);
    if(parseInt(response.error_code) !== 0){
        errors.push(response)
    }

    console.log('cancel data: ', response);

    return true;
}

async function confirmExp(txn_id) {
    let postData = {
        "opcode": 5,
        "merchant_site": config.qiwi.merchant_site,
        "txn_id": txn_id,
        "cf3": '4.90;0.10'
    };

    let postKeysSort = Object.keys(postData).sort();
    let signStr = '';
    for (let i = 0; i < postKeysSort.length; i++) {
        if (postData[postKeysSort[i]] && postData[postKeysSort[i]] !== '') {
            signStr += (i === 0) ? postData[postKeysSort[i]] : '|' + postData[postKeysSort[i]];
        }
    }

    postData.sign = crypto.createHmac('sha256', config.qiwi.secret)
        .update(signStr)
        .digest('hex');

    console.log('confirm request: ', postData);
    let response = await request(postData);
    response = JSON.parse(response);
    console.log('confirm data: ', response);

    return true;
}

/!*setTimeout(async() => {
    for(let i=0;i<9;i++){
        await holdingExp(i)
    }
}, 10000);*!/


setTimeout(async() => {
    // await holdingExp(13);
    await confirmExp('566977824050');

    // await cancelExp('566574093050');
    // await cancelExp('566574332050');
    // await cancelExp('566574572050');
    // await cancelExp('566574817050');
    // await cancelExp('566575037050');
    // await cancelExp('566575289050');
    // await cancelExp('566575556050');
    // await confirmExp('566575777050');
    // await confirmExp('566575997050');

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ', 1);
}, 5000);*/

var exports = module.exports = {};
exports.holding = holding;
exports.cancel = cancel;
exports.getToken = getToken;
exports.confirm = confirm;
exports.refundWPF = refundWPF;
exports.refill = refill;