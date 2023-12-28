var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getOrdersList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search_phone = data.search_phone ? data.search_phone : null;
        let search_id = data.search_id ? data.search_id : null;

        let search_cond;
        if(search_phone){
            search_cond = {
                $or: [
                    { "customer.phone": {$regex: search_phone} },
                    { "executor.phone": {$regex: search_phone} }
                ]
            }
        } else if(search_id && search_id.length === 24){
            search_cond = {_id: mongoose.Types.ObjectId(search_id)}
        }

        if(data.filters)
            data.filters = JSON.parse(data.filters);

        if(data.filters && (data.filters.status || data.filters.date_from || data.filters.date_to)){
            let condition_array = [];

            if(search_cond) {
                condition_array.push(search_cond);
            }

            if(data.filters.status) {
                if (data.filters.status === "in_progress")
                    condition_array.push({status: {$gt : 20, $lt : 99}});
                if (data.filters.status === "done")
                    condition_array.push({status: 100});
                if (data.filters.status === "cancelled")
                    condition_array.push({status: {$gt : 100}});
            }

            if(data.filters && data.filters.date_from && data.filters.date_to)
                condition_array.push({createdAt: {$gte: new Date(data.filters.date_from), $lt: new Date(data.filters.date_to)}});

            if(data.filters && data.filters.types && data.filters.types.length === 1)
                condition_array.push({for_now: data.filters.types[0] === 1});

            search_cond = {
                $and: condition_array
            }
        }

        //HOTFIX 
        if(range.start < 0 )
        range.start = 0;
        //HOTFIX 


        let orderList = await api.Order.aggregate([
            {$lookup:
                {
                    from: 'customers',
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                }
            },
            {$lookup:
                {
                    from: 'executors',
                    localField: "executor_id",
                    foreignField: "_id",
                    as: "executor"
                }
            },
            { $match: search_cond },
            { $skip: range.start },
            { $limit: range.limit }
        ]);

        let respList = [];
        for(let i=0;i<orderList.length;i++){
            respList.push(await api.Serialize('ADMIN_ORDER_INFO',orderList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });
}

async function getOrdersListCount(data) {
    return new Promise(async (response, reject) => {
        let search_phone = data.search_phone ? data.search_phone : null;
        let search_id = data.search_id ? data.search_id : null;

        let search_cond;
        if(search_phone){
            search_cond = {
                $or: [
                    { "customer.phone": {$regex: search_phone} },
                    { "executor.phone": {$regex: search_phone} }
                ]
            }
        } else if(search_id && search_id.length === 24){
            search_cond = {_id: mongoose.Types.ObjectId(search_id)}
        }

        if(data.filters)
            data.filters = JSON.parse(data.filters);

        if(data.filters && (data.filters.status || data.filters.date_from || data.filters.date_to)){
            let condition_array = [];

            if(search_cond) {
                condition_array.push(search_cond);
            }

            if(data.filters.status) {
                if (data.filters.status === "in_progress")
                    condition_array.push({status: {$gt : 20, $lt : 99}});
                if (data.filters.status === "done")
                    condition_array.push({status: 100});
                if (data.filters.status === "cancelled")
                    condition_array.push({status: {$gt : 100}});
            }

            if(data.filters.date_from && data.filters.date_to)
                condition_array.push({createdAt: {$gte: new Date(data.filters.date_from), $lt: new Date(data.filters.date_to)}});

            if(data.filters.types.length === 1)
                condition_array.push({for_now: data.filters.types[0] === 1});

            search_cond = {
                $and: condition_array
            }
        }

        let orderCount = await api.Order.aggregate([
            {$lookup:
                {
                    from: 'customers',
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                }
            },
            {$lookup:
                {
                    from: 'executors',
                    localField: "executor_id",
                    foreignField: "_id",
                    as: "executor"
                }
            },
            { $match: search_cond },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        response({
            status: "OK",
            error:null,
            data: orderCount && orderCount[0] ? orderCount[0].count : 0
        });
    });
}

async function getOrderFullInfo(data) {
    return new Promise(async (response, reject) => {
        let order_id = data.id;
        if(!order_id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let order = await api.Order.aggregate([
            {$lookup:
                    {
                        from: 'customers',
                        localField: "customer_id",
                        foreignField: "_id",
                        as: "customer",
                    }
            },
            {$lookup:
                    {
                        from: 'executors',
                        localField: "executor_id",
                        foreignField: "_id",
                        as: "executor"
                    }
            },
            { $match : {'_id': mongoose.Types.ObjectId(order_id) }},
            { $limit: 1 }
        ]);


        if(!order && !order.length)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let orderInfo = await api.Serialize('ADMIN_ORDER_INFO', order[0]);
        orderInfo['reports'] = await api.OrderReport.find({order_id: mongoose.Types.ObjectId(order_id)});


        response({
            status: "OK",
            error:null,
            data: orderInfo
        });
    });
}

async function getOrdersHistory(data) {
    return new Promise(async (response, reject) => {
        let history = await api.OrderHistory.find({
            order_id: data.id
        });

        response({
            status: "OK",
            error:null,
            data: history
        });
    });
}

var exports = module.exports = {};
exports.getOrdersList = getOrdersList;
exports.getOrdersListCount = getOrdersListCount;
exports.getOrdersHistory = getOrdersHistory;
exports.getOrderFullInfo = getOrderFullInfo;