var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var moment = require('moment');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function activatePromo(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let promo = await api.CustomerPromo.findOne({
            code: data.code,
            active: 1,
        });

        if(!promo)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_PROMO',
                data:null
            });

        let customer = await api.Customer.findById(auth_user.id);

        if(!customer)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_USER',
                data:null
            });

        if(promo.type === 'SUM'){
            customer.bonus_balance = parseFloat(customer.bonus_balance) + parseFloat(promo.amount);
            await customer.save();

            await api.BonusHistory.create({
                user_id: customer._id,
                user_type: 'CUSTOMER',
                amount: promo.amount,
                type: 'AMOUNT',
                reason: 'PROMO'
            });

            await api.CustomerFinancialHistory.create({
                customer_id: customer._id,
                type: 'PROMO',
                balance_type: 'BONUS',
                summ: promo.amount,
                info: data.code,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
        } else if(promo.type === 'SUM_EXPERT') {
            customer.bonus_balance = parseFloat(customer.bonus_balance) + parseFloat(promo.amount);
            customer.is_expert = 1;
            await customer.save();

            await api.BonusHistory.create({
                user_id: customer._id,
                user_type: 'CUSTOMER',
                amount: promo.amount,
                type: 'AMOUNT_EXPERT',
                reason: 'PROMO'
            });

            await api.CustomerFinancialHistory.create({
                customer_id: customer._id,
                type: 'PROMO',
                balance_type: 'BONUS',
                summ: promo.amount,
                info: data.code,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
        } else {
            customer.is_expert = 1;
            await customer.save();

            await api.BonusHistory.create({
                user_id: customer._id,
                user_type: 'CUSTOMER',
                amount: 0,
                type: 'EXPERT',
                reason: 'PROMO'
            });
        }

        promo.customer_id = customer._id;
        promo.active = 0;
        promo.activated_date = moment().format('YYYY-MM-DD HH:mm:ss');
        await promo.save();

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('CUSTOMER_PROFILE',customer)
        });
    });
}

var exports = module.exports = {};
exports.activatePromo = activatePromo;
