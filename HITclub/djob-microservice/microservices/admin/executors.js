var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
var push = require('../../libs/push');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true)

async function getExecutorsList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let reg_array = [];

        if(data.filters){
            data.filters = JSON.parse(data.filters);

            if(data.filters.registered_passport)
                reg_array.push(0);

            if(data.filters.registered_wait)
                reg_array.push(1);

            if(data.filters.registered_activate)
                reg_array.push(2);

            if(data.filters.registered_declined){
                reg_array.push(-1);
                reg_array.push(-2);
            }

        }

        if(!reg_array.length)
            reg_array = [-2, -1, 0, 1, 2];

        let search = data.search ? data.search : null;

        let findCondition = {
            registered: {$in: reg_array}
        };
        if(search){
            findCondition = {
                $and: [
                    {$or: [
                            {name: {$regex: search}},
                            {phone: {$regex: search}}
                        ]
                    },
                    findCondition
                ]

            }
        }

        let executorsList = await api.Executor.find(findCondition).skip(range.start).limit(range.limit);

        let respList = [];
        for(let i=0;i<executorsList.length;i++){
            respList.push(await api.Serialize('ADMIN_EXECUTOR_INFO',executorsList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });

}

async function getExecutorsCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let reg_array = [];

        if(data.filters){
            data.filters = JSON.parse(data.filters);

            if(data.filters.registered_passport)
                reg_array.push(0);

            if(data.filters.registered_wait)
                reg_array.push(1);

            if(data.filters.registered_activate)
                reg_array.push(2);

            if(data.filters.registered_declined)
                reg_array.push(-1);
        }

        if(!reg_array.length)
            reg_array = [-1, 0, 1, 2];

        let search = data.search ? data.search : null;

        let findCondition = {
            registered: {$in: reg_array}
        };
        if(search){
            findCondition = {
                $and: [
                    {$or: [
                            {name: {$regex: search}},
                            {phone: {$regex: search}}
                        ]
                    },
                    findCondition
                ]

            }
        }

        let count = await api.Executor.count(findCondition);

        response({
            status: "OK",
            error:null,
            data: count
        });
    });

}

async function updateExecutor(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.id;
        let executor_data = data.data;

        let executor = await api.Executor.findById(executor_id);

        let reg_status = executor.registered;

        if(!executor)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        for (let key in executor_data) {
            executor[key] = executor_data[key];
        }

        await executor.save();
        let new_reg_status = executor.registered;

        if(reg_status !== new_reg_status){
            if(new_reg_status===-2)
                await push.sendPush("EXECUTOR", executor._id, "REG_DECLINED", {});
            else if(new_reg_status===2)
                await push.sendPush("EXECUTOR", executor._id, "REG_APPROVED", {});
            else if(new_reg_status===-1)
                await push.sendPush("EXECUTOR", executor._id, "REG_DECLINED_FOR_EDIT", {});
        }
        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });

}

async function getExecutorFullInfo(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.id;

        let executor = await api.Executor.findById(executor_id);
        if(!executor)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        executor = await api.Serialize('ADMIN_EXECUTOR_INFO', executor);

        response({
            status: "OK",
            error:null,
            data: executor
        });
    });

}


async function getExecutorOrderHistory(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.executor_id;
        if(executor_id.length !== 24)
            return response({
                status: "OK",
                error: 'MISSING_INPUT_PARAMETERS'
            });

        let range = {
            start: data.start ? parseInt(data.start) : 0,
            limit: data.limit ? parseInt(data.limit) : 10
        };

        let order_history = await api.Order.find({
            executor_id: mongoose.Types.ObjectId( executor_id )
        }).sort({'createdAt': 'desc'}).skip(range.start).limit(range.limit);

        order_history = order_history.length ? await api.Serialize('ADMIN_ORDER_HISTORY', order_history) : [];

        response({
            status: "OK",
            error:null,
            data: order_history
        });
    });

}

async function getExecutorReferralHistory(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.executor_id;
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.start ? parseInt(data.start) : 0,
            limit: data.limit ? parseInt(data.limit) : 10
        };

        let referral_history = await api.ExecutorReferralHistory.find({
            executor_id: mongoose.Types.ObjectId(executor_id)
        }).sort({'date': 'desc'}).skip(range.start).limit(range.limit);

        referral_history = referral_history.length ? await api.Serialize('ADMIN_EXECUTOR_REFERRAL_HISTORY', referral_history) : [];

        response({
            status: "OK",
            error:null,
            data: referral_history
        });
    });

}

async function getExecutorFinancialHistory(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.executor_id;

        let range = {
            start: parseInt(data.start) || 0,
            limit: parseInt(data.limit) || 10
        };

        let matchObj = {executor_id: mongoose.Types.ObjectId(executor_id)};

        if(data.type){
            if(data.type === 'BALANCE')
                matchObj.balance_type = 'BALANCE';

            if(data.type === 'BONUS')
                matchObj.balance_type = data.type;

            if(['TRANSFER', 'ADMIN'].indexOf(data.type) !== -1 )
                matchObj.type = data.type;

        }

        if(data.date_from && data.date_to)
            matchObj.createdAt = {
                $gte: new Date(data.date_from),
                $lt: new Date(data.date_to)
            };

        console.log('!!!!!!!!!', matchObj);

        let financial_history = await api.ExecutorFinancialHistory.aggregate([
            {$lookup:
                    {
                        from: 'order',
                        localField: "order_id",
                        foreignField: "_id",
                        as: "order"
                    }
            },
            {$lookup:
                    {
                        from: 'executorpayments',
                        localField: "payment_id",
                        foreignField: "_id",
                        as: "payment"
                    }
            },
            {$sort: {date: -1}},
            {$match : matchObj},
            {$skip: range.start},
            {$limit: range.limit}
        ]);

        financial_history = await api.Serialize('ADMIN_EXECUTOR_FINANCIAL_HISTORY',financial_history);

        response({
            status: "OK",
            error:null,
            data: financial_history
        });
    });
}

async function addExecutorFinancialHistory(data) {
    return new Promise(async (response, reject) => {
        let executor_id = data.executor_id;

        if(!data.summ || !data.info || !data.balance_type || (data.balance_type !== 'BALANCE' && data.balance_type !== 'BONUS'))
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let executor = await api.Executor.findById(executor_id);

        if(!executor)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });



        let after_balance = (data.balance_type === 'BALANCE') ? executor.balance : executor.bonus_balance;
        after_balance = parseFloat(after_balance) +  parseFloat(data.summ);

        let fh = await api.ExecutorFinancialHistory.create({
            executor_id: executor_id,
            type: 'ADMIN',
            balance_type: data.balance_type,
            summ: data.summ,
            info: data.info,
            date: new Date(),
            after_balance: after_balance,
            performer: data.auth_user.email
        });

        if(data.balance_type === 'BALANCE')
            executor.balance = after_balance;
        else
            executor.bonus_balance = after_balance;

        executor.save();

        response({
            status: "OK",
            error:null,
            data: fh
        });
    });
}

var exports = module.exports = {};
exports.getExecutorsList = getExecutorsList;
exports.updateExecutor = updateExecutor;
exports.getExecutorFullInfo = getExecutorFullInfo;
exports.getExecutorOrderHistory = getExecutorOrderHistory;
exports.getExecutorReferralHistory = getExecutorReferralHistory;
exports.getExecutorFinancialHistory = getExecutorFinancialHistory;
exports.getExecutorsCount = getExecutorsCount;
exports.addExecutorFinancialHistory = addExecutorFinancialHistory;