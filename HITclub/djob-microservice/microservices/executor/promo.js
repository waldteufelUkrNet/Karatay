var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var moment = require('moment');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function activateExecutorPromo(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let promo = await api.ExecutorPromo.findOne({
            code: data.code,
            active: 1,
        });

        if(!promo)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_PROMO',
                data:null
            });

        let executor = await api.Executor.findById(auth_user.id);

        if(!executor)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_USER',
                data:null
            });

        if(promo.type === 'SUM'){
            executor.bonus_balance = parseFloat(executor.bonus_balance) + parseFloat(promo.amount);
            await executor.save();

            await api.BonusHistory.create({
                user_id: executor._id,
                user_type: 'EXECUTOR',
                amount: promo.amount,
                type: 'AMOUNT',
                reason: 'PROMO'
            });

            await api.ExecutorFinancialHistory.create({
                executor_id: executor._id,
                type: 'PROMO',
                balance_type: 'BONUS',
                summ: promo.amount,
                info: data.code,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
        }

        promo.executor_id = executor._id;
        promo.active = 0;
        promo.activated_date = moment().format('YYYY-MM-DD HH:mm:ss');
        await promo.save();

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('EXECUTOR_PROFILE',executor),
        });
    });
}

var exports = module.exports = {};
exports.activateExecutorPromo = activateExecutorPromo;
