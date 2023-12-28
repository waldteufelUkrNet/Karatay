var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function makeSupportRequest(data) {
    let {email, phone, text} = data;

    return new Promise(async (response, reject) => {
        let sup_request = await api.SupportRequest.create({email, phone, text});

            return response({
                status: "OK",
                error:null,
                data: {}
            });
    });
}

async function getSupportRequests(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        if(data.filter)
            data.filter = JSON.parse(data.filter);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let status_arr = [];
        if(data.filter.new){
            status_arr.push(0);
            status_arr.push(null);
        }

        if(data.filter.processed)
            status_arr.push(1);

        let requests = await api.SupportRequest.find({status: { $in : status_arr }}).skip(range.start).limit(range.limit);
        requests = await api.Serialize('ADMIN_SUPPORT_INFO',requests);

        return response({
            status: "OK",
            error:null,
            data: requests
        });
    });
}

async function getSupportRequestsCount(data) {
    return new Promise(async (response, reject) => {
        if(data.filter)
            data.filter = JSON.parse(data.filter);

        let status_arr = [];
        if(data.filter.new){
            status_arr.push(0);
            status_arr.push(null);
        }

        if(data.filter.processed)
            status_arr.push(1);

        let count = await api.SupportRequest.count({status: { $in : status_arr }});

        return response({
            status: "OK",
            error:null,
            data: count
        });
    });
}

async function updateSupport(data) {
    return new Promise(async (response, reject) => {

        // console.log('!!!!!!!!!!!!!: ', data);
        if(!data.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let support = await api.SupportRequest.findById(data.id);

        if(!support)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        support.status = data.data.status;
        await support.save();

        response({
            status: "OK",
            error:null,
            data: support
        });
    });
}

var exports = module.exports = {};
exports.makeSupportRequest = makeSupportRequest;
exports.getSupportRequests = getSupportRequests;
exports.updateSupport = updateSupport;
exports.getSupportRequestsCount = getSupportRequestsCount;
