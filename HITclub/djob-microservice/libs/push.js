let FCM = require('fcm-node'); 
var request = require('request');
var serverKeyExecutor = 'AAAAZNgMEns:APA91bFLmO4XoLUT9-OBd1USrFafevLAm3XvjQVDlvsAZJZjD3TFbUR1Ep7agt9DFKhFs8MFp80cB51MZVxqvlCTPqjrcmVHwb7cJknPzzeLhDERHxOd6Xswz-T6Dtqv5nv9x0CEIaiP';
var serverKeyCustomer = "AAAAZNgMEns:APA91bFLmO4XoLUT9-OBd1USrFafevLAm3XvjQVDlvsAZJZjD3TFbUR1Ep7agt9DFKhFs8MFp80cB51MZVxqvlCTPqjrcmVHwb7cJknPzzeLhDERHxOd6Xswz-T6Dtqv5nv9x0CEIaiP";
var fcm_executor = new FCM(serverKeyExecutor);
var fcm_customer = new FCM(serverKeyCustomer);
var api = require('../models/api.js');
var mongoose = require('mongoose');

async function sendPush(type, user_id, alert, payload) {
    var api = require('../models/api.js');
    
    let devices, fcm;
    if (type === "EXECUTOR") {
        devices = await api.ExecutorDevices.find({user_id});
        fcm = fcm_executor;
        console.log("EXECUTOR PUSH! ", devices)
    }
    if (type === "CUSTOMER") {
        devices = await api.CustomerDevices.find({user_id});
        fcm = fcm_customer;
        console.log("CUSTOMER PUSH! ", devices)
    }

    devices.forEach(function (device) {
        if (device.os && device.os.length && device.push_token && device.push_token.length) {
            if (device.os === "ANDROID" && type === "CUSTOMER" && alert === "FREE_TEXT") {
                sendFreeTextPushAndroid(fcm, device.push_token, alert, payload, function (err, status) {
                });
            } else if (device.os === "ANDROID") {
                sendPushAndroid(fcm, device.push_token, alert, payload, function (err, status) {
                });
            } else if (device.os === "IOS" && alert !== "FREE_TEXT") {
                // sendPushAndroid(device.push_token, alert, payload, function(err, status){} );
                sendPushIos(fcm, device.push_token, alert, payload, [], 0, function (err, status) {
                });
            } else if (device.os === "IOS" && alert === "FREE_TEXT" && payload.title && payload.body) {
                sendFreeTextPushIos(fcm, device.push_token, alert, payload, [], 0, function (err, status) {
                });
            }
        }
    });
}

async function sendPushToAll(type, alert, payload) {
    let devices, fcm;
    var api = require('../models/api.js');


    if (type === "EXECUTOR") {
        devices = await api.ExecutorDevices.find();
        fcm = fcm_executor;
        console.log("EXECUTOR PUSH! ", devices);
        await sendToDevices(devices, fcm, alert, payload);
    }

    if (type === "CUSTOMER") {
        devices = await api.CustomerDevices.find();
        fcm = fcm_customer;
        console.log("CUSTOMER PUSH! ", devices);
        await sendToDevices(devices, fcm, alert, payload);
    }

    if(type === "ALL"){
        let devices_c = await api.CustomerDevices.find();
        await sendToDevices(devices_c, fcm_customer, alert, payload);

        let devices_e = await api.ExecutorDevices.find();
        await sendToDevices(devices_e, fcm_executor, alert, payload);
    }
}

async function sendPersonalPush(user_id, user_type, alert, payload) {
    let devices, fcm;
    var api = require('../models/api.js');


    if (user_type === "EXECUTOR") {
        devices = await api.ExecutorDevices.find({user_id: mongoose.Types.ObjectId(user_id) });
        fcm = fcm_executor;
        console.log("EXECUTOR PUSH! ", devices);
        await sendToDevices(devices, fcm, alert, payload);
    }

    if (user_type === "CUSTOMER") {
        devices = await api.CustomerDevices.find({user_id: mongoose.Types.ObjectId(user_id) });
        fcm = fcm_customer;
        console.log("CUSTOMER PUSH! ", devices);
        await sendToDevices(devices, fcm, alert, payload);
    }
}

async function sendToDevices(devices, fcm, alert, payload) {
    devices.forEach(function (device) {
        console.log("device ", device.push_token)
        if (device.os && device.os.length && device.push_token && device.push_token.length) {
            if (device.os === "ANDROID"  && alert === "FREE_TEXT") {
                sendFreeTextPushAndroid(fcm, device.push_token, alert, payload, function (err, status) {
                });
            } else if (device.os === "ANDROID") {
                sendPushAndroid(fcm, device.push_token, alert, payload, function (err, status) {
                });
            } else if (device.os === "IOS" && alert !== "FREE_TEXT") {
                sendPushIos(fcm, device.push_token, alert, payload, [], 0, function (err, status) {
                });
            } else if (device.os === "IOS" && alert === "FREE_TEXT" && payload.title && payload.body) {
                sendFreeTextPushIos(fcm, device.push_token, alert, payload, [], 0, function (err, status) {
                });
            }
        }
    });
}

function sendPushAndroid(fcm, token, alert, payload, callback) {

    payload.alert = alert;

    let message = {
        to: token,
        data: payload
    };


    console.log("ANDROID push body", message);
    console.log("ANDROID push ", message.alert);

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("PUSH LOG(A): Something has gone wrong!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG (A): Successfully sent ");
            callback(null, "ok");
        }
    });
    callback(null, "ok");
}

function sendFreeTextPushAndroid(fcm, token, alert, payload, callback) {

    let message = {
        to: token,
        notification: {
            title: payload.title,
            body: payload.body
        },
        data: {}
    };

    console.log("ANDROID push body", message);
    console.log("ANDROID push ", message.alert);

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("PUSH LOG(A): Something has gone wrong!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG (A): Successfully sent ");
            callback(null, "ok");
        }
    });
    callback(null, "ok");
}

function sendPushIos(fcm, token, alert, payload, loc_args, badge = 0, callback) {


    for (var k in payload) {
        if (payload.hasOwnProperty(k)) {
            //alert("Key is " + k + ", value is" + payload[k]);
            if (payload[k] === "CASH")
                loc_args.push("наличные")
            else if (payload[k] === "CASH")
                loc_args.push("на карту")
            else if( k !== "order_id")
                loc_args.push(payload[k] + "");
        }
    }

    var message = {
        to: token,
        content_available: true,
        mutable_content: true,
        notification: {
            body_loc_key: alert,
            title_loc_key: alert + "_TITLE",
            sound: "default",
            body_loc_args: loc_args
        },
        data: {

            payload
        }
    };

    delete message.data.aps;
    console.log("IOS push", message);
    //console.log(message);

    fcm.send(message, function (err, response) {
        console.log(response)
        if (err) {
            console.log("PUSH LOG(IOS): Something has gone wrong (IOS)!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG(IOS): Successfully sent");
            callback(null, "ok");
        }
    });

    callback(null, "ok");
}

function sendFreeTextPushIos(fcm, token, alert, payload, loc_args, badge = 0, callback) {


    var message = {
        to: token,
        content_available: true,
        //mutable_content: true,
        notification: {
            title: payload.title,
            body: payload.body
        },
        data: {

            payload
        }
    };

    delete message.data.aps;
    console.log("IOS push", message);
    //console.log(message);

    fcm.send(message, function (err, response) {
        console.log(response)
        if (err) {
            console.log("PUSH LOG(IOS): Something has gone wrong (IOS)!", err);
            callback(null, "error");
        } else {
            console.log("PUSH LOG(IOS): Successfully sent");
            callback(null, "ok");
        }
    });

    callback(null, "ok");
}

var exports = module.exports = {};
exports.sendPush = sendPush;
exports.sendPushToAll = sendPushToAll;
exports.sendPersonalPush = sendPersonalPush;
