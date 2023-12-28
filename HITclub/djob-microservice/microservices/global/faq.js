var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function getFaq(data) {
    let {auth_user, type} = data;

    return new Promise(async (response, reject) => {

      //auth_user.role
        let faq_list = await api.Faq.find({type}).sort([['priority', -1]]);

            return response({
                status: "OK",
                error:null,
                data: await api.Serialize('FAQ',faq_list)
            });
    });

}

async function getPrivacyPolicy(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {

      //auth_user.role
        let pr_policy  = await  api.Config.findOne({param: 'privacy_policy'});

            return response({
                status: "OK",
                error:null,
                data: pr_policy.value
            });
    });

}

async function getTermsOfConditions(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {

      //auth_user.role
        let pr_policy  = await  api.Config.findOne({param: 'terms_of_conditions'});

            return response({
                status: "OK",
                error:null,
                data: pr_policy.value
            });
    });

}

var exports = module.exports = {};
exports.getFaq = getFaq;
exports.getPrivacyPolicy = getPrivacyPolicy;
exports.getTermsOfConditions = getTermsOfConditions;