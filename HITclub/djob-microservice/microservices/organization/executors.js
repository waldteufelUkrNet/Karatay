var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var push = require('../../libs/push');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getExecutorsList(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let search = data.search ? data.search : null;

        let findCondition = {
            organization_id: mongoose.Types.ObjectId(auth_user.id)
        };
        if(search){
            findCondition = {
                $or: [
                    {name: {$regex: search}},
                    {phone: {$regex: search}}
                ]
            }
        }

        let executorsList = await api.Executor.aggregate([
            {$lookup:
                    {
                        from: 'orders',
                        localField: "active_order_id",
                        foreignField: "_id",
                        as: "order",
                    }
            },
            { $match: findCondition},
            { $skip: range.start },
            { $limit: range.limit }
        ]);

        if(data.filter)
            data.filter = JSON.parse(data.filter);

        let respList = [];

        if(data.filter && data.filter.specialities && data.filter.specialities.length){
            for(let i=0;i<executorsList.length;i++){
                if(executorsList[i].specialities && executorsList[i].specialities.length){
                    let filterItem = null;
                    for(let j=0;j<executorsList[i].specialities.length;j++){
                        if(data.filter.specialities.indexOf('' + executorsList[i].specialities[j].specialty_id) !== -1){
                            filterItem = executorsList[i];
                        }
                    }

                    if(filterItem){
                        respList.push(filterItem);
                    }
                }
            }
        } else {
            respList = executorsList;
        }

        respList = await api.Serialize('ADMIN_EXECUTOR_INFO',respList);

        return response({
            status: "OK",
            error:null,
            data: respList
        });
    });

}

async function getExecutorInfo(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
        if(!data.id || data.id.length !== 24)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let executor = await api.Executor.findById(data.id);
        if(!executor || executor.organization_id != auth_user.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        executor = await api.Serialize('ADMIN_EXECUTOR_INFO',executor);

        return response({
            status: "OK",
            error:null,
            data: executor
        });
    });

}

async function inviteExecutor(data) {

    return new Promise(async (response, reject) => {

        let {phone, auth_user} = data;
        let organization = await api.Organization.findById(auth_user.id);
        let executor = await api.Executor.findOne({phone});
        if(!executor)
          return response({
              status: "ERROR",
              error:"NO_SUCH_EXECUTOR",
              data: {}
          });

        if(executor.organization_id || executor.invitation)
          return response({
              status: "ERROR",
              error:"EXECUTOR_HAS_INVITATION",
              data: {}
          });

        let invitation = await api.OrganizationInvitation.create({
          organization_id: organization._id,
          executor_id: executor._id,
          name: organization.name
        });

        executor.invitation = invitation;
        await executor.save();
        await push.sendPush("EXECUTOR", executor.id, "NEW_ORGANIZATION_INVITATION", {});

        return response({
            status: "OK",
            error:null,
            data: {}
          });
    });

}

async function checkExecutor(data) {
    return new Promise(async (response, reject) => {
        if(!data.phone)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let exist = await api.Executor.findOne({phone: data.phone});

        response({
            status: "OK",
            error:null,
            data: exist ? await api.Serialize('ADMIN_EXECUTOR_INFO', exist) : null
        });
    });

}

async function createExecutor(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
        if(!data.phone)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        data.organization_id = auth_user.id;

        if(data.office){
            let create_data={type: "OFFICE"};
            create_data.lon = data.office.lon;
            create_data.lat = data.office.lat;
            create_data.name = data.office.name;
            create_data.front = data.office.front;
            create_data.flat = data.office.flat;
            create_data.code = data.office.code;
            create_data.floor = data.office.floor;
            create_data.location = {
                type: 'Point',
                coordinates: [create_data.lon, create_data.lat]
            };
            let office = await api.Address.create(create_data);
            data.office_id = office._id;
            data.office = office;
        } else {
            data.office_id = null;
            data.office = null;
        }


        // console.log('!!!!!!!!!!!: ', data);

        let executor = await api.Executor.create(data);

        if(data.specialities){
            let newSpecialites = [];
            for(let i=0; i<data.specialities.length;i++){
                let esp = await api.ExecutorSpeciality.create({
                    specialty_id: data.specialities[i].specialty_id,
                    specialty: await api.Speciality.findById(data.specialities[i].specialty_id),
                    executor_id: executor._id,
                    workplace: data.specialities[i].workplace,
                    on_departure: data.specialities[i].on_departure,
                    certificates: data.specialities[i].certificates,
                    hourly_rate_price: data.specialities[i].hourly_rate_price,
                    fixed_rate_price: data.specialities[i].fixed_rate_price,
                    hourly_rate_enabled: data.specialities[i].hourly_rate_enabled,
                    fixed_rate_enabled: data.specialities[i].fixed_rate_enabled,
                    enabled: data.specialities[i].enabled
                });

                newSpecialites.push(esp);
            }
            executor.specialities = newSpecialites;
        } else {
            await api.ExecutorSpeciality.deleteMany({executor_id: executor._id});
            executor.specialities = [];
        }
        executor.save();

        response({
            status: "OK",
            error:null,
            data: await api.Serialize('ADMIN_EXECUTOR_INFO', executor)
        });
    });

}

async function updateExecutor(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
        let id = data.id;
        data = data.data;

        let executor = await api.Executor.findById(id);

        if(!executor || executor.organization_id != auth_user.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        if(data.office){
            let create_data={type: "OFFICE"};
            create_data.lon = data.office.lon;
            create_data.lat = data.office.lat;
            create_data.name = data.office.name;
            create_data.front = data.office.front;
            create_data.flat = data.office.flat;
            create_data.code = data.office.code;
            create_data.floor = data.office.floor;
            create_data.location = {
                type: 'Point',
                coordinates: [create_data.lon, create_data.lat]
            };
            let office = await api.Address.create(create_data);
            data.office_id = office._id;
            data.office = office;
        } else {
            data.office_id = null;
            data.office = null;
        }

        for (var key in data) {
            executor[key] = data[key];
        }

        if(data.specialities){
            let newSpecialites = [];
            let oldSpecialitesArrId = [];
            for(let i=0; i<data.specialities.length;i++){
                let esp;
                if(data.specialities[i].id){
                    esp = await api.ExecutorSpeciality.findById(data.specialities[i].id);
                }
                if(esp){
                    esp.workplace = data.specialities[i].workplace;
                    esp.on_departure = data.specialities[i].on_departure;
                    esp.certificates = data.specialities[i].certificates;
                    esp.hourly_rate_price = data.specialities[i].hourly_rate_price;
                    esp.fixed_rate_price = data.specialities[i].fixed_rate_price;
                    esp.hourly_rate_enabled = data.specialities[i].hourly_rate_enabled;
                    esp.fixed_rate_enabled = data.specialities[i].fixed_rate_enabled;
                    esp.enabled = data.specialities[i].enabled;
                    esp.save();
                    oldSpecialitesArrId.push(mongoose.Types.ObjectId(esp._id));
                } else {
                    esp = await api.ExecutorSpeciality.create({
                        specialty_id: data.specialities[i].specialty_id,
                        specialty: await api.Speciality.findById(data.specialities[i].specialty_id),
                        executor_id: executor._id,
                        workplace: data.specialities[i].workplace,
                        on_departure: data.specialities[i].on_departure,
                        certificates: data.specialities[i].certificates,
                        hourly_rate_price: data.specialities[i].hourly_rate_price,
                        fixed_rate_price: data.specialities[i].fixed_rate_price,
                        hourly_rate_enabled: data.specialities[i].hourly_rate_enabled,
                        fixed_rate_enabled: data.specialities[i].fixed_rate_enabled,
                        enabled: data.specialities[i].enabled
                    });
                    oldSpecialitesArrId.push(mongoose.Types.ObjectId(esp._id));
                }
            }

            await api.ExecutorSpeciality.deleteMany({_id: {$nin: oldSpecialitesArrId}, executor_id: executor._id});
        } else {
            await api.ExecutorSpeciality.deleteMany({executor_id: executor._id});
            executor.specialities = [];
        }

        executor.specialities = await api.ExecutorSpeciality.find({executor_id: executor._id});
        executor.save();
        response({
            status: "OK",
            error:null,
            data: await api.Serialize('ADMIN_EXECUTOR_INFO', executor)
        });
    });

}

async function detachExecutor(data) {
    let userID = data.id;
    return new Promise(async (response, reject) => {

        let executor = await api.Executor.findByIdAndUpdate( mongoose.Types.ObjectId(userID), { organization_id: null});

        response({
            status: "OK",
            error: null,
            data: executor
        });
    });

}

async function attachExecutor(data) {
    return new Promise(async (response, reject) => {
        let executorPhone = data.phone,
            companyId     = data.companyId;

        let executor = await api.Executor
                             .findOneAndUpdate({phone: executorPhone},
                                               {organization_id: mongoose.Types.ObjectId(companyId)},
                                               {new: true});
        if(!executor)
            return response({
                status: "ERROR",
                error: 'WRONG_USER',
                data:null
            });

        executor = await api.Serialize('ADMIN_EXECUTOR_INFO', executor);

        response({
            status: "OK",
            error: null,
            data: executor
        });
    });
}

async function killAllProccess(data) {
    return new Promise(async (response, reject) => {
        response({
            status: "OK",
            error: null,
            data: null
        });
    });
}

var exports = module.exports = {};
exports.getExecutorsList = getExecutorsList;
exports.inviteExecutor = inviteExecutor;
exports.checkExecutor = checkExecutor;
exports.createExecutor = createExecutor;
exports.getExecutorInfo = getExecutorInfo;
exports.updateExecutor = updateExecutor;
exports.detachExecutor = detachExecutor;
exports.attachExecutor = attachExecutor;
exports.killAllProccess = killAllProccess;