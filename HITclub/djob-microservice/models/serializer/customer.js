var exports = module.exports = {};
var libs = require('../../libs/general');

async function myProfile(input) {
    input = input.toJSON();
    let resp = {
      id: input._id,
      name: input.name,
      second_name: input.second_name,
      surname: input.surname,
      phone: input.phone,
      sex: input.sex,
      city: input.city,
      about: input.about,
      photo: input.photo,
      lat: input.lat,
      lon: input.lon,
      balance: parseFloat('' + input.balance).toFixed(2),
      bonus_balance: parseFloat('' + input.bonus_balance).toFixed(2),
      referral_users_count: input.referral_users_count ? input.referral_users_count : 0 ,
      referral_code: input.referral_code ? input.referral_code : null,
      referral_balance: input.referral_balance ? input.referral_balance :0
    };

    return resp;
}

async function adminCustomerInfo(input){
    let resp = {
        id: input._id,
        name: input.name,
        phone: input.phone,
        lat: input.lat,
        lon: input.lon,
        banned: input.banned,
        referral_id: input.referral_id,
        photo: input.photo,
        balance:  input.balance ? parseFloat(input.balance) : null,
        bonus_balance: input.bonus_balance ? parseFloat(input.bonus_balance) : null,
        failed_login_count: input.failed_login_count,
        next_login_sms_available_time: input.next_login_sms_available_time,
        referral_code: input.referral_code ? input.referral_code : null
    };

    return resp;
}


async function shortCustomer(input) {
    let resp;
  
    if(Array.isArray(input)){
        resp = [];
  
        for(let i=0; i<input.length; i++)
            resp.push(await shortExecutor(input[i]));
  
        return resp;
    }
  
    resp = {
        id: input._id,
        name: input.name,
        phone: input.phone,
        rate: input.marks_count ? parseFloat(input.summ_mark/input.marks_count).toFixed(2) : "0" 
    };
    
    return resp;
  }

async function adminCustomerFinancialHistory(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await adminCustomerFinancialHistory(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        customer_id: input.customer_id,
        type: input.type,
        balance_type: input.balance_type,
        summ: input.summ ? parseFloat(input.summ.toString()).toFixed(2) : 0,
        order_id: input.order_id,
        payment_id: input.payment_id,
        card_id: input.card_id,
        info: input.info,
        date: libs.formatDate(input.date),
        after_balance: input.after_balance ? parseFloat(input.after_balance.toString()).toFixed(2) : 0,
        performer: input.performer
    };

    return resp;
}

exports.myProfile=myProfile;
exports.shortCustomer=shortCustomer;
exports.adminCustomerInfo=adminCustomerInfo;
exports.adminCustomerFinancialHistory=adminCustomerFinancialHistory;
