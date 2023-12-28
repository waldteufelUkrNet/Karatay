var mongoose = require('mongoose');
const crypto = require('crypto');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
var moment = require('moment');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function login(data) {
    let {email, password} = data;

    return new Promise(async (response, reject) => {
        let passMD5 = crypto.createHash('md5').update(password).digest("hex");

        let organization = await api.Organization.findOne({email: email, password: passMD5});

        if(!organization)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let token = lib.jwt(organization);

        organization = await api.Serialize('ADMIN_ORGANIZATION_INFO', organization);
        organization.token = token;

        response({
            status: "OK",
            error:null,
            data: organization
        });
    });
}

async function editAccount(data) {
    let {auth_user} = data;
    let {password, about, photo, name, take_urgent, take_not_urgent} = data;

    return new Promise(async (response, reject) => {
        let passMD5 = crypto.createHash('md5').update(password).digest("hex");

        let entity = await api.Organization.findById(auth_user.id);
        if(!entity)
            return response({
                status: "ERROR",
                error: 'AUTH_ERROR',
                data:null
            });

        entity.password = passMD5;
        entity.about = about;
        entity.name = name;
        entity.photo = photo;
        entity.take_urgent = take_urgent;
        entity.take_not_urgent = take_not_urgent;
        entity.save();

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

async function getList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let condition = {};
        if(data.search)
            condition['name'] = {$regex: data.search};

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let entities = await api.Organization.find(condition).skip(range.start).limit(range.limit);

        entities = await api.Serialize('ADMIN_ORGANIZATION_INFO', entities);

        for (let i = 0; i < entities.length; i++) {
            entities[i].amountOfExecutors = await api.Executor.count({organization_id: entities[i].id}) || 0;
        }

        response({
            status: "OK",
            error:null,
            data: entities
        });
    });
}

async function getCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let condition = {};
        if(data.search)
            condition['name'] = {$regex: data.search};

        let count = await api.Organization.count(condition);
        response({
            status: "OK",
            error:null,
            data: count
        });
    });
}

async function getOrganizationExecutors(data){
    let id = data.id;

    return new Promise(async (response, reject) => {
        if(!id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let executors = await api.Executor.find({
            organization_id: mongoose.Types.ObjectId( id )
        });
        executors =  await api.Serialize('ADMIN_EXECUTOR_INFO', executors);

        response({
            status: "OK",
            error:null,
            data: executors
        });
    });
}

async function updateOrganization(data) {
    let id = data.id;
    let {name, email, password, balance, code, register_date, register_agency} = data.data;

    return new Promise(async (response, reject) => {
        let organization = await api.Organization.findById(id);

        if(!organization)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        organization.name = name;
        organization.email = email;
        if(password)
            organization.password = crypto.createHash('md5').update(password).digest("hex");
        organization.balance = balance;
        organization.code = code;
        if(lib.checkIfDateValid(register_date))
            organization.register_date = new Date(register_date);
        organization.register_agency = register_agency;

        await organization.save();

        response({
            status: "OK",
            error:null,
            data: organization
        });
    });
}

async function deleteOrganization(data) {
    let id = data.id;

    return new Promise(async (response, reject) => {
        let organization = await api.Organization.findByIdAndDelete(id);

        if(!organization)
            return response({
                status: "ERROR",
                error: 'MISSING_ORGANIZATION',
                data: null
            });


        await organization.save();

        response({
            status: "OK",
            error: null,
            data: organization
        });
    });
}

async function createOrganization(data) {
    let {name, email, password, balance, code, register_date, register_agency} = data;

    return new Promise(async (response, reject) => {
        let create_data = {name, email, password: crypto.createHash('md5').update(password).digest("hex"), balance, code, register_agency};

        if(lib.checkIfDateValid(register_date))
            create_data['register_date'] = new Date(register_date);

        let organization = await api.Organization.create(create_data);
        response({
            status: "OK",
            error:null,
            data: organization
        });
    });
}

var exports = module.exports = {};
exports.login = login;
exports.editAccount = editAccount;
exports.getList = getList;
exports.updateOrganization = updateOrganization;
exports.deleteOrganization = deleteOrganization;
exports.createOrganization = createOrganization;
exports.getOrganizationExecutors = getOrganizationExecutors;
exports.getCount = getCount;