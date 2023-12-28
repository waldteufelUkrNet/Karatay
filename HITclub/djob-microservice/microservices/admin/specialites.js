var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var lib = require('../../libs/admin');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

async function getSpecialitesList(data) {
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
                    {name: {$regex: search}}
                ]
            }
        }

        let specialitesList = await api.Speciality.find(findCondition).skip(range.start).limit(range.limit);

        let respList = [];
        for(let i=0;i<specialitesList.length;i++){
            respList.push(await api.Serialize('ADMIN_SPECIALITY_INFO',specialitesList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });
}

async function getSpecialitesCount(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let search = data.search ? data.search : null;

        let findCondition = {};
        if(search){
            findCondition = {
                $or: [
                    {name: {$regex: search}}
                ]
            }
        }

        let count = await api.Speciality.count(findCondition);
        response({
            status: "OK",
            error:null,
            data: count
        });
    });
}

async function addSpeciality(data) {
    return new Promise(async (response, reject) => {
        if(!data.name || !data.info || !data.group_id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let group = await api.SpecialtyGroup.findById(data.group_id);

        if(!group)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let speciality = await api.Speciality.create({
            name: data.name,
            info: data.info,
            group_id: data.group_id,
            group: group
        });

        response({
            status: "OK",
            error:null,
            data: speciality
        });
    });
}

async function updateSpeciality(data) {
    return new Promise(async (response, reject) => {
        if(!data.id || !data.data.name || !data.data.info || !data.data.group_id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let speciality = await api.Speciality.findById(data.id);

        if(!speciality)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let group = await api.SpecialtyGroup.findById(data.data.group_id);

        if(!group)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        speciality.name = data.data.name;
        speciality.info = data.data.info;
        speciality.group_id = data.data.group_id;
        speciality.group = group;

        speciality.save();

        response({
            status: "OK",
            error:null,
            data: speciality
        });
    });
}

async function deleteSpeciality(data) {
    return new Promise(async (response, reject) => {
        if(!data.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let speciality = await api.Speciality.findById(data.id);

        if(!speciality)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        await api.Speciality.deleteOne({_id: data.id});

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });

}

async function getSpecialitesGroupList(data) {
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
                    {name: {$regex: search}}
                ]
            }
        }

        let specialitesGroupsList = await api.SpecialtyGroup.find(findCondition).skip(range.start).limit(range.limit);

        let respList = [];
        for(let i=0;i<specialitesGroupsList.length;i++){
            respList.push(await api.Serialize('ADMIN_SPECIALITY_GROUP_INFO',specialitesGroupsList[i]))
        }

        response({
            status: "OK",
            error:null,
            data: respList
        });
    });

}

async function addSpecialitesGroup(data) {
    return new Promise(async (response, reject) => {
        if(!data.name)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let group = await api.SpecialtyGroup.create({name: data.name});

        response({
            status: "OK",
            error:null,
            data: await api.Serialize('ADMIN_SPECIALITY_GROUP_INFO', group)
        });
    });

}

async function updateSpecialitesGroup(data) {
    return new Promise(async (response, reject) => {
        if(!data.id || !data.data || !data.data.name)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let group = await api.SpecialtyGroup.findById(data.id);

        if(!group)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        group.name = data.data.name;
        await group.save();

        response({
            status: "OK",
            error:null,
            data: await api.Serialize('ADMIN_SPECIALITY_GROUP_INFO', group)
        });
    });
}

async function deleteSpecialitesGroup(data) {
    return new Promise(async (response, reject) => {
        if(!data.id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let group = await api.SpecialtyGroup.findById(data.id);

        if(!group)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        await api.SpecialtyGroup.deleteOne({_id: data.id});

        response({
            status: "OK",
            error:null,
            data: {}
        });
    });

}

var exports = module.exports = {};
exports.getSpecialitesGroupList = getSpecialitesGroupList;
exports.addSpecialitesGroup = addSpecialitesGroup;
exports.updateSpecialitesGroup = updateSpecialitesGroup;
exports.deleteSpecialitesGroup = deleteSpecialitesGroup;
exports.getSpecialitesList = getSpecialitesList;
exports.addSpeciality = addSpeciality;
exports.updateSpeciality = updateSpeciality;
exports.deleteSpeciality = deleteSpeciality;
exports.getSpecialitesCount = getSpecialitesCount;
