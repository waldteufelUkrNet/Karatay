var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var push = require('../../libs/push');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true)

async function getSpecialitiesList(data) {
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
            findCondition = {name: {$regex: search}}
        }

        let specList = await api.Speciality.find(findCondition).skip(range.start).limit(range.limit);

        specList = await api.Serialize('ADMIN_SPECIALITY_INFO',specList);

        return response({
            status: "OK",
            error:null,
            data: specList
        });
    });

}

var exports = module.exports = {};
exports.getSpecialitiesList = getSpecialitiesList;
