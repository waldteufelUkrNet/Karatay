var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getPromoList(data) {
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
                    {code: {$regex: search}}
                ]
            }
        }


        let promoList = (data.promo_type === 'EXECUTOR') ? await api.ExecutorPromo.find(findCondition).skip(range.start).limit(range.limit) : await api.CustomerPromo.find(findCondition).skip(range.start).limit(range.limit);

        let respList = [];
        for(let i=0;i<promoList.length;i++){
            respList.push((data.promo_type === 'EXECUTOR') ? await api.Serialize('ADMIN_CUSTOMER_PROMO',promoList[i]) : await api.Serialize('ADMIN_EXECUTOR_PROMO',promoList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });
}

async function getPromoCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {code: {$regex: search}}
                ]
            }
        }

        let count = (data.promo_type === 'EXECUTOR') ? await api.ExecutorPromo.count(findCondition) : await api.CustomerPromo.count(findCondition);

        response({
            status: "OK",
            error:null,
            data: count
        });
    });
}

async function addPromo(data) {
    return new Promise(async (response, reject) => {


        if(!data.type || (data.type == 'SUM' && !data.amount) || (data.type == 'SUM_EXPERT' && !data.amount))
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let code = await generateUniqueCode();
        let promo_data = {
            type: data.type,
            amount: data.amount,
            active: data.active,
            code: code
        };

        let promo = (data.promo_type === 'EXECUTOR') ? await api.ExecutorPromo.create(promo_data) : await api.CustomerPromo.create(promo_data);

        response({
            status: "OK",
            error:null,
            data: promo
        });
    });
}

async function deletePromo(data) {
    return new Promise(async (response, reject) => {

        if(!data.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let promo = await api.ExecutorPromo.findById(data.id);

        if(promo){
            await api.ExecutorPromo.deleteOne({_id: data.id});
        } else {
            promo = await api.CustomerPromo.findById(data.id);
            if(!promo)
                return response({
                    status: "ERROR",
                    error: 'MISSING_INPUT_PARAMETERS',
                    data:null
                });

            await api.CustomerPromo.deleteOne({_id: data.id});
        }

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function updatePromo(data) {
    return new Promise(async (response, reject) => {
        if(!data.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let promo = (data.promo_type === 'EXECUTOR') ? await api.ExecutorPromo.findById(data.id) : await api.CustomerPromo.findById(data.id);

        if(!promo)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        promo.type = data.data.type;
        promo.active = data.data.active;
        promo.amount = data.data.type === 'EXPERT' ? 0 : data.data.amount;
        await promo.save();

        response({
            status: "OK",
            error:null,
            data: promo
        });
    });
}


async function generateUniqueCode() {
    let key = lib.randomKey(7);
    let exist = await api.CustomerPromo.findOne({code: key});

    if (!exist)
        return key;
    else
        return generateUniqueCode();
}


var exports = module.exports = {};
exports.getPromoList = getPromoList;
exports.addPromo = addPromo;
exports.deletePromo = deletePromo;
exports.updatePromo = updatePromo;
exports.getPromoCount = getPromoCount;
