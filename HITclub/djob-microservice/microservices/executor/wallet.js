var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var moment = require('moment');


async function getWallet(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let wallet = await api.QiwiWallet.findOne({
            where: {user_id: auth_user.id}
        });

        let ex = await api.Executor.findOne({
            where: {id: auth_user.id},
            attributes:['id', 'bonus_balance']
        });

        let discounts = await api.ExecutorDiscount.find({
            executor_id: auth_user.id,
            expiration: {$gte: moment().format('YYYY-MM-DD HH:mm:ss')}
        });

        let bonus = null;
        let discount = null;

        if (discounts && discounts.length) {
            bonus = true;
            discount = parseFloat(discounts[0].discount);
            for(let i=0;i<discounts.length;i++){
                if(parseFloat(discounts[i].discount) > discount){
                    discount = parseFloat(discounts[i].discount);
                }
            }
        }

        response({
            status: "OK",
            error: null,
            data: {wallet: wallet, bonus_balance: parseFloat(ex.bonus_balance), discount_active: bonus, discount: parseFloat(discount)}
        });
    });
}

async function createWallet(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        if(!data.phone) {
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data: {}
            });
        }

        await api.QiwiWallet.destroy({
            where: {user_id: auth_user.id, user_type: 'EXECUTOR'}
        });

        let wallet = await api.QiwiWallet.create({
            user_id: auth_user.id,
            phone: data.phone
        });

        response({
            status: "OK",
            error: null,
            data: wallet
        });
    });
}

async function updateWallet(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        if(!data.phone) {
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data: {}
            });
        }

        let wallet =  await api.QiwiWallet.findOne({
            where: {id: data.id, user_id: auth_user.id}
        });

        if(!wallet)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_WALLET',
                data: {}
            });

        await wallet.update({phone: data.phone});

        response({
            status: "OK",
            error: null,
            data: wallet
        });
    });
}

async function deleteWallet(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let wallet =  await api.QiwiWallet.findOne({
            where: {id: data.id, user_id: auth_user.id}
        });

        if(!wallet)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_WALLET',
                data: {}
            });

        await wallet.destroy();

        response({
            status: "OK",
            error: null,
            data: {}
        });
    });
}

var exports = module.exports = {};
exports.getWallet = getWallet;
exports.createWallet = createWallet;
exports.updateWallet = updateWallet;
exports.deleteWallet = deleteWallet;
