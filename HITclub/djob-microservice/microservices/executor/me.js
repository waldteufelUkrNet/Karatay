var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var request = require('async-request');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var qiwi = require('../../libs/qiwi');

async function getExecutorMe(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if (!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });


            return response({
                status: "OK",
                error:null,
                data: await api.Serialize('EXECUTOR_PROFILE',user)
            });

    });

}

async function logOut(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if (!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

            await api.ExecutorDevices.deleteOne({ user_id: user._id });

            return response({
                status: "OK",
                error:null,
                data: {}
            });

    });

}

async function updateExecutorMe(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if (!user)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });


        if (user.registered !== 2)
            return response({
                status: "ERROR",
                error: 'HAVE_NO_PERMISSIONS',
                data:null
            });

        if (user.organization_id)
                return response({
                    status: "ERROR",
                    error: 'ORGANIZATION_USER_ERROR',
                    data:null
                });

        for (let key in data) {
            user[key] = data[key];
        }

        await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });

}

async function setLocation(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);
        if (!user)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });
        console.log("INPUT DATA ",data)
        user.lon = data.lon;
        user.lat = data.lat;
        user.location = {
          type: 'Point',
          coordinates: [user.lon, user.lat]
        }
        await user.save();

        if(user.active_order_id){
            let order = await api.Order.findOne({_id: user.active_order_id});
            let json_user = user.toJSON();
            if(order && order.status < 100)
                amqpLib.sendSocketMessage("EXECUTOR_LOCATION_UPDATE", "CUSTOMER", order.customer_id, { 
                    lat: json_user.lat,
                    lon: json_user.lon
                });
        }
       

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });
}

async function setOffice(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);
        if (!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

        let create_data={type: "OFFICE"};
        create_data.lon = data.lon;
        create_data.lat = data.lat;
        create_data.name = data.name;
        create_data.front = data.front;
        create_data.flat = data.flat;
        create_data.code = data.code;
        create_data.floor = data.floor;
        create_data.location = {
          type: 'Point',
          coordinates: [create_data.lon, create_data.lat]
        };
      let office = await api.Address.create(create_data);
      user.office_id = office._id;
      user.office = office;
      await user.save();
        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
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

async function removeOffice(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);
        if (!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

    let speciality = user.specialities.find(spec => {
              if(spec.workplace)
                return true;
              else
                return false;
        });

      if(speciality)
        return response({
            status: "ERROR",
            error: 'HAVE_OFFICE_SPECIALITIES',
            data:null
        });

      if(user.office_id)
        await api.Address.findById(user.office_id).remove().exec();
      user.office_id =null;
      user.office = null;
      await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });
}

async function setStatus(data) {
    let {auth_user} = data;
    let alerts = [];

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        let min_cash_balance = await api.Config.findOne({param:'min_cash_balance'});
        min_cash_balance = parseInt(min_cash_balance.value);

        let min_cash_bonus_balance = await api.Config.findOne({param:'min_cash_bonus_balance'});
        min_cash_bonus_balance = parseInt(min_cash_bonus_balance.value);

        if(data.status && user.balance < min_cash_balance && user.bonus_balance < min_cash_bonus_balance){
            alerts.push('CASH_BALANCE_TOO_LOW')
            // return response({
            //     status: "ERROR",
            //     error: 'CASH_BALANCE_TOO_LOW',
            //     data:null
            // });
        }
        
        if(!user.active_card_id)
            alerts.push('NO_ACTIVE_CARD')

        user.status = data.status;
        await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_PROFILE',user),
            alerts
        });
    });
}

async function updateExecutorPushToken(data) {
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
        
        let user = await api.Executor.findOne({
            _id: auth_user.id
        });

        if(!user)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

         let device = await api.ExecutorDevices.findOne({
             user_id: user._id
         });
         if(!device){
             await api.ExecutorDevices.create({os, udid, push_token,user_id: user._id });
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

async function getRefillForm(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let resp = await qiwi.refill(auth_user.id, data.amount, 'EXECUTOR');

        response({
            status: "OK",
            error: null,
            data: resp
        });
    });
}

var exports = module.exports = {};
exports.updateExecutorMe = updateExecutorMe;
exports.getExecutorMe = getExecutorMe;
exports.setLocation = setLocation;
exports.setStatus = setStatus;
exports.setOffice = setOffice;
exports.removeOffice = removeOffice;
exports.getReferralLink = getReferralLink;
exports.updateExecutorPushToken = updateExecutorPushToken;
exports.logOut = logOut;
exports.getRefillForm = getRefillForm;