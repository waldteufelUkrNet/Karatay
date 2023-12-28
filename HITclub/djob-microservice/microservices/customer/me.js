var mongoose = require('mongoose');
var moment = require('moment');
var qs = require("querystring");
const https= require('https');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var qiwi = require('../../libs/qiwi');

async function getCustomerMe(data) {
    return new Promise(async (response, reject) => {
        let {auth_user} = data;

        if(!auth_user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let user = await api.Customer.findOne({
            _id: auth_user.id
        });

        if(!user)
            return response({
                status: "ERROR",
                error: "AUTH_ERROR",
                data: {}
            });
        else
            return response({
                status: "OK",
                error: null,
                data: await api.Serialize('CUSTOMER_PROFILE',user)
            });
    });
}

async function logOut(data) {
    return new Promise(async (response, reject) => {
        let {auth_user} = data;

        if(!auth_user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });

        let user = await api.Customer.findOne({
            _id: auth_user.id
        });

        if(!user)
            return response({
                status: "ERROR",
                error: "AUTH_ERROR",
                data: {}
            });

            await api.CustomerDevices.deleteOne({ user_id: user._id });

            return response({
                status: "OK",
                error: null,
                data: {}
            });
    });
}

async function updateCustomerMe(data) {
    return new Promise(async (response, reject) => {
        let {auth_user} = data;
          
        if(!auth_user || !auth_user.id){
            response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });
            return;
        }
        
        let user = await api.Customer.findOne({
            _id: auth_user.id
        });

        if(!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

          for (let key in data) {
              if(key !== 'auth_user')
                user[key] = data[key];
          }
        //user.name = data.name;

        await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('CUSTOMER_PROFILE',user)
        });
    });
}

async function updateCustomerPushToken(data) {
    return new Promise(async (response, reject) => {
        let {auth_user, os, udid, push_token} = data;
          
        if(!auth_user || !auth_user.id){
            response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });
            return;
        }
        
        let user = await api.Customer.findOne({
            _id: auth_user.id
        });

        if(!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

         let device = await api.CustomerDevices.findOne({
             user_id: user._id
         });
         if(!device){
             await api.CustomerDevices.create({os, udid, push_token,user_id: user._id });
         }else{
             device.os = os;
             device.push_token = push_token;
             device.udid = udid;
             device.save();
         }

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function setLocation(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Customer.findById(auth_user.id);
        if (!user)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        user.lon = data.lon;
        user.lat = data.lat;
        user.location = {
          type: 'Point',
          coordinates: [user.lon, user.lat]
        }
        await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('CUSTOMER_PROFILE',user)
        });
    });
}

async function getReferralLink(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);
        if (!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

       // let customer_link = "https://hitclub.page.link/?link=https://www.google.com/&referral="+user.referral_code+"&apn=app.hitclub.client&ibi=app.hitclub.client";
       // let executor_link = "https://hitclub.page.link/?link=https://www.google.com/&referral="+user.referral_code+"&apn=app.hitclub.client&ibi=app.hitclub.client";

        let url = config.host+"/deep_link/"+user.referral_code;
        return response({
            status: "OK",
            error:null,
            data: {
                url
             }
        });
    });
}

async function getRefillForm(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let resp = await qiwi.refill(auth_user.id, data.amount);

        response({
            status: "OK",
            error: null,
            data: resp
        });
    });
}

var exports = module.exports = {};
exports.getCustomerMe = getCustomerMe;
exports.updateCustomerMe = updateCustomerMe;
exports.setLocation = setLocation;
exports.getReferralLink = getReferralLink;
exports.updateCustomerPushToken = updateCustomerPushToken;
exports.logOut = logOut;
exports.getRefillForm = getRefillForm;