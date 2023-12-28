var mongoose = require('mongoose');
var moment = require('moment');
var qs = require("querystring");
const https= require('https');
var config = require('../../config');
var api = require('../../models/api');
const jwt = require('jsonwebtoken');
var libs = require('../../libs/general');
var push = require('../../libs/push');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function sendCode(data) {
    return new Promise(async (response, reject) => {
        let phone = data.phone;
        if(!phone)
            response(false);

        let user = await api.Customer.findOne({
            phone
        });

        if(!user) {
            let referral_code = await generateUniqueCode();
            user = await api.Customer.create({phone, referral_code});
        }

        console.log("user ", user);
        if(user.banned)
            response({
                status: "ERROR",
                error: 'BANNED',
                data:null
            });
      /*  if(user.sms_sent_count > 2)
            response({
                status: "ERROR",
                error: 'SMS_SEND_LIMIT',
                data: {
                    code_resend_available : false
                }
            });*/
        if( moment().unix() < moment(user.next_login_sms_available_time).unix()){
            response({
                status: "ERROR",
                error: 'NEXT_SMS_TIME_ERROR',
                data: {
                    code_resend_available : true,
                    next_login_sms_available_time: user.next_login_sms_available_time
                }
            });
        }

        let code = '0000';
        if(phone.substring(1,5)!='7000') {
            code=Math.round(1000 + Math.random() * (9999 - 1000));
            try{
                let message_text = "Your+password+is+"+code;
                https.get('https://smsc.ru/sys/send.php?login='+config.sms_gate.login+'&psw='+config.sms_gate.pass+'&phones='+phone+'&mes='+message_text, (resp) => {
                 let data = '';
                  resp.on('data', (chunk) => {
                    data += chunk;
                  });
                  resp.on('end', () => {
                   // console.log(JSON.parse(data).explanation);
                  });
                }).on("error", (err) => {
                  console.log("SEND Error: " + err);
                });
            }catch(e){
                console.log("SEND Error: " + e);
            }
        }

        let next_login_sms_available_time = moment();
        if(user.sms_sent_count === 0)
            next_login_sms_available_time = moment().add(60, 's');
        else if(user.sms_sent_count === 1)
            next_login_sms_available_time = moment().add(300, 's');

        user.code = code;
        user.failed_login_count = 0;
        user.next_login_sms_available_time = next_login_sms_available_time;
        user.sms_sent_count = user.sms_sent_count ? user.sms_sent_count + 1 : 1;

        await user.save();


        let code_resend_available= true;
        if(user.sms_sent_count>=3)
            code_resend_available = false;

        response({
            status: "OK",
            error: null,
            data: {
                code_resend_available,
                next_login_sms_available_time: user.next_login_sms_available_time,
                sms_sent_count: user.sms_sent_count
            }
        });
    });
}

async function login(data) {
    return new Promise(async (response, reject) => {
        let {phone, code} = data;
        console.log(phone+" "+ code)


        console.log('!!!!!!: ', phone);
        let user = await api.Customer.findOne({
            phone,
		code
        });

        if(!user){
          console.log("no user")
          response({
              status: "ERROR",
              error: 'WRONG_CODE',
              data:null
          });
          console.log("no user2")
          return;
        }


        if(user.banned){
          response({
              status: "ERROR",
              error: 'BANNED',
              data:null
          });
          return;
        }

          let token = generateJwt({id: user._id, phone: user.phone}, "CUSTOMER");

      /*  await api.CustomerDevices.remove({user_id: user._id});
        let device = await api.CustomerDevices.findOne({ udid });
        if(device){
            device.os = os;
            device.push_token = push_token;
            device.user_id = user._id;
            device.date = moment().format('YYYY-MM-DD HH:mm:ss');
            await device.save();
        } else
            device = await api.CustomerDevices.create({udid, os, push_token, user_id:user._id, date: moment().format('YYYY-MM-DD HH:mm:ss')});

            */
        user.code = null;
        user.failed_login_count = 0;
        user.next_login_sms_available_time = moment();
        user.sms_sent_count = 0;


        if(data.referral){
            if(data.referral.charAt(0) === 'C'){
                let refInfo = await api.Customer.findOne({
                    referral_code: data.referral
                });
                if(refInfo){
                    if(!refInfo.referral_users_count)
                        refInfo.referral_users_count = 0;
                    refInfo.referral_users_count = refInfo.referral_users_count + 1;
                    await refInfo.save();
                    user.referral_id = refInfo._id;
                    user.referral_type = 'CUSTOMER';
                    push.sendPush("CUSTOMER", user.referral_id, "NEW_REFERRAL", {});
                }
            } else {
                let refInfo = await api.Executor.findOne({
                    referral_code: data.referral
                });
                if(refInfo){
                    if(!refInfo.referral_users_count)
                        refInfo.referral_users_count = 0;
                    refInfo.referral_users_count = refInfo.referral_users_count + 1;
                    await refInfo.save();
                    user.referral_id = refInfo._id;
                    user.referral_type = 'EXECUTOR';
                    push.sendPush("EXECUTOR", user.referral_id, "NEW_REFERRAL", {});
                }
            }
        }

        await user.save();

        response({
            status: "OK",
            error:null,
            data: {
              user: await api.Serialize('CUSTOMER_PROFILE',user),
              token
            }
        });
    });
}

function generateJwt(user, role) {
    const {phone, id} = user;
    return jwt.sign({phone, id, role}, config.mobile_jwt_secret);
}

async function generateUniqueCode(){
    let key = 'C' + libs.randomKey(32);

    let exist = await api.Customer.findOne({
        where: {referral_code: key}
    });

    if(!exist)
        return key;
    else
        return generateUniqueCode();
}

var exports = module.exports = {};
exports.sendCode = sendCode;
exports.login = login;
