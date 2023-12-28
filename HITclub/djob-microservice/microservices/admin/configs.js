var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function getConfigs(data) {
    return new Promise(async (response, reject) => {
        let configs = await api.Config.find();

        response({
            status: "OK",
            error:null,
            data: configs
        });
    });
}

async function updateConfigs(data) {
    return new Promise(async (response, reject) => {
        for (let key in data) {
            if(key !== 'auth_user'){
                let exist = await api.Config.findOne({param: key});

                if(exist) {
                    exist.value = data[key];
                    await exist.save();
                } else {
                    await api.Config.create({
                        param: key,
                        value: data[key]
                    })
                }
            }
        }

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

var exports = module.exports = {};
exports.getConfigs = getConfigs;
exports.updateConfigs = updateConfigs;
