var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getDisputesList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search_phone = data.search_phone ? data.search_phone : null;

        let search_cond;
        if(search_phone){
            search_cond = {
                $or: [
                    { "customer.phone": {$regex: search_phone} },
                    { "executor.phone": {$regex: search_phone} }
                ]
            }
        }

        if(data.filters)
            data.filters = JSON.parse(data.filters);

        let condition_array = [];

        if(search_cond) {
            condition_array.push(search_cond);
        }

        if(data.filters && data.filters.date_from && data.filters.date_to){
            condition_array.push({createdAt: {$gte: new Date(data.filters.date_from), $lt: new Date(data.filters.date_to)}});
        }

        if(data.filters && data.filters.types && data.filters.types.length === 1)
            condition_array.push({for_now: data.filters.types[0] === 1});

        condition_array.push({status: {$in: [121, 131]}});

        search_cond = {
            $and: condition_array
        };

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
            { $match : search_cond },
            { $skip : range.start },
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

async function getDisputesCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let search_phone = data.search_phone ? data.search_phone : null;

        let search_cond;
        if(search_phone){
            search_cond = {
                $or: [
                    { "customer.phone": {$regex: search_phone} },
                    { "executor.phone": {$regex: search_phone} }
                ]
            }
        }

        if(data.filters)
            data.filters = JSON.parse(data.filters);

        let condition_array = [];

        if(search_cond) {
            condition_array.push(search_cond);
        }

        if(data.filters && data.filters.date_from && data.filters.date_to){
            condition_array.push({createdAt: {$gte: new Date(data.filters.date_from), $lt: new Date(data.filters.date_to)}});
        }

        if(data.filters && data.filters.types && data.filters.types.length === 1)
            condition_array.push({for_now: data.filters.types[0] === 1});

        condition_array.push({status: {$in: [121, 131]}});

        search_cond = {
            $and: condition_array
        };

        let count = await api.Order.aggregate([
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
            { $match : search_cond },
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
            data: count && count[0] ? count[0].count : 0
        });
    });
}

var exports = module.exports = {};
exports.getDisputesList = getDisputesList;
exports.getDisputesCount = getDisputesCount;
