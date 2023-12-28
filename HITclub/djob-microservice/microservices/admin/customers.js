var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getCustomersList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {name: {$regex: search}},
                    {phone: {$regex: search}}
                ]
            }
        }

        let customersList = await api.Customer.find(findCondition).skip(range.start).limit(range.limit);

        let respList = [];
        for(let i=0;i<customersList.length;i++){
            respList.push(await api.Serialize('ADMIN_CUSTOMER_INFO',customersList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });

}

async function getCustomersCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {name: {$regex: search}},
                    {phone: {$regex: search}}
                ]
            }
        }

        let count = await api.Customer.count(findCondition);

        response({
            status: "OK",
            error:null,
            data: count
        });
    });

}

async function getCustomerFullInfo(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.id;

        let customer = await api.Customer.findById(customer_id);
        if(!customer)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        customer = await api.Serialize('ADMIN_CUSTOMER_INFO', customer);

        response({
            status: "OK",
            error:null,
            data: customer
        });
    });

}

async function getCustomerOrderHistory(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.customer_id;
        return response({
            status: "OK",
            error:null,
            data: []
        });
        let range = {
            start: parseInt(data.start) || 0,
            limit: parseInt(data.limit) || 10
        };

        let order_history = await api.Order.find({
            customer_id: mongoose.Types.ObjectId( customer_id )
        }).sort({'createdAt': 'desc'}).skip(range.start).limit(range.limit);

        order_history = order_history.length ? await api.Serialize('ADMIN_ORDER_HISTORY', order_history) : [];

        response({
            status: "OK",
            error:null,
            data: order_history
        });
    });

}

async function getCustomerReferralHistory(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.customer_id;

        let range = {
            start: parseInt(data.start) || 0,
            limit: parseInt(data.limit) || 10
        };

        let referral_history = await api.CustomerReferralHistory.find({
            customer_id: customer_id,
        }).sort({'date': 'desc'}).skip(range.start).limit(range.limit);

        referral_history = referral_history.length ? await api.Serialize('ADMIN_CUSTOMER_REFERRAL_HISTORY', referral_history) : [];

        response({
            status: "OK",
            error:null,
            data: referral_history
        });
    });
}

async function getCustomerFinancialHistory(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.customer_id;

        let range = {
            start: parseInt(data.start) || 0,
            limit: parseInt(data.limit) || 10
        };

        let matchObj = {customer_id: mongoose.Types.ObjectId(customer_id)};

        if(data.type){
            if(data.type === 'BALANCE'){
                matchObj.balance_type = 'BALANCE';
                matchObj.type = {$ne: 'ADMIN'};
            }


            if(data.type === 'BONUS'){
                matchObj.balance_type = data.type;
                matchObj.type = {$ne: 'ADMIN'};
            }

            if(['TRANSFER', 'ADMIN', 'PAYMENT'].indexOf(data.type) !== -1 )
                matchObj.type = data.type;
        }

        if(data.date_from && data.date_to)
            matchObj.createdAt = {
                $gte: new Date(data.date_from),
                $lt: new Date(data.date_to)
            };

        let financial_history = await api.CustomerFinancialHistory.aggregate([
            {$lookup:
                    {
                        from: 'order',
                        localField: "order_id",
                        foreignField: "_id",
                        as: "order"
                    }
            },
            {$sort: {date: -1}},
            {$match : matchObj},
            {$skip: range.start},
            {$limit: range.limit}
        ]);

        financial_history = await api.Serialize('ADMIN_CUSTOMER_FINANCIAL_HISTORY',financial_history);

        response({
            status: "OK",
            error:null,
            data: financial_history
        });
    });
}

async function updateCustomer(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.id;
        let customer_data = data.data;

        let customer = await api.Customer.findById(customer_id);

        if(!customer)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        for (let key in customer_data) {
            customer[key] = customer_data[key];
        }

        console.log('0001: ', customer_data);

        await customer.save();

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });

}

async function addCustomerFinancialHistory(data) {
    return new Promise(async (response, reject) => {
        let customer_id = data.customer_id;

        if(!data.summ || !data.info || !data.balance_type || (data.balance_type !== 'BALANCE' && data.balance_type !== 'BONUS'))
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let customer = await api.Customer.findById(customer_id);

        if(!customer)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        let after_balance = (data.balance_type === 'BALANCE') ? customer.balance : customer.bonus_balance;
        after_balance = parseFloat(after_balance) +  parseFloat(data.summ);

        let fh = await api.CustomerFinancialHistory.create({
            customer_id: customer_id,
            type: 'ADMIN',
            balance_type: data.balance_type,
            summ: data.summ,
            info: data.info,
            date: new Date(),
            after_balance: after_balance,
            performer: data.auth_user.email
        });

        if(data.balance_type === 'BALANCE')
            customer.balance = after_balance;
        else
            customer.bonus_balance = after_balance;

        customer.save();

        response({
            status: "OK",
            error:null,
            data: fh
        });
    });
}

var exports = module.exports = {};
exports.getCustomersList = getCustomersList;
exports.getCustomerFullInfo = getCustomerFullInfo;
exports.updateCustomer = updateCustomer;
exports.getCustomerOrderHistory = getCustomerOrderHistory;
exports.getCustomerReferralHistory = getCustomerReferralHistory;
exports.getCustomerFinancialHistory = getCustomerFinancialHistory;
exports.getCustomersCount = getCustomersCount;
exports.addCustomerFinancialHistory = addCustomerFinancialHistory;
