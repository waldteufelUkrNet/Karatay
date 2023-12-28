var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var moment = require('moment');

async function getCustomerReferralHistory(data) {
    let {auth_user} = data;
    let range = {
        start: data.range && data.range.start ? data.range.start : 0,
        limit: data.range && data.range.limit ? data.range.limit : 20,
    };

    return new Promise(async (response, reject) => {
        let history = await api.CustomerReferralHistory.find({
            customer_id: auth_user.id
        }).sort({'date': 'desc'}).skip(range.start).limit(range.limit);

        let resArray = [];
        for(let i=0;i<history.length;i++){

            let order = await api.Order.findById(history[i].order_id);

            let item = {
                order_id: history[i].order_id,
                summ: history[i].summ,
                date: history[i].date,
                user_type: history[i].user_type,
                user: null,
                speciality: order.specialty.name
            };

            let user;
            if(history[i].user_type === 'CUSTOMER')
                user = await api.Customer.findById(history[i].user_id);
            else
                user = await api.Executor.findById(history[i].user_id);

            


            let name = user.name;
            name = user.surname ? name+" "+user.surname : name;
            item.user = {
                id: user._id,
                phone: '+*******' + user.phone.substr(-4),
                name
            };

            resArray.push(item);
        }

        response({
            status: "OK",
            error: null,
            data: resArray
        });
    });
}

async function customerReferralTransfer(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Customer.findById(auth_user.id);

        if(data.amount && data.amount > user.referral_balance){
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });
        }

        if(data.amount){
            await api.CustomerFinancialHistory.create({
                customer_id: auth_user.id,
                type: 'REFERRAL',
                balance_type: 'BONUS',
                summ: data.amount,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });

            user.bonus_balance += data.amount;
            user.referral_balance -= data.amount;
        } else {
            await api.CustomerFinancialHistory.create({
                customer_id: auth_user.id,
                type: 'REFERRAL',
                balance_type: 'BONUS',
                summ: user.referral_balance,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });

            user.bonus_balance += user.referral_balance;
            user.referral_balance = 0;
        }

        await user.save();

        response({
            status: "OK",
            error: null,
            data: user
        });
    });
}

var exports = module.exports = {};
exports.getCustomerReferralHistory = getCustomerReferralHistory;
exports.customerReferralTransfer = customerReferralTransfer;
