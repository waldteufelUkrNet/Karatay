var api = require('../../models/api');

var exports = module.exports = {};

async function getListSpecialities(data) {
    return new Promise(async (response, reject) => {
        let specialties = await api.Speciality.find({enabled:true});
 
        response({
            status: "OK",
            error:null,
            data: await api.Serialize('BASE_SPECIALITY', specialties)
        });
    });
}

async function getListDetailedSpecialities(data) {
    return new Promise(async (response, reject) => {
        let specialties = await api.Speciality.find({enabled:true});
        let senior_config = await api.Config.findOne({param:"master_order_count_needed"});
        let middle_config = await api.Config.findOne({param:"middle_order_count_needed"});

        response({
            status: "OK",
            error:null,
            data: {
                configs:{
                    senior_order_count_needed: senior_config ? parseInt(senior_config.value) : 10,
                    middle_order_count_needed: middle_config ? parseInt(middle_config.value) : 3
                },
                specialties
            }
        });
    });

}

async function getSpecialityDetails(data) {
    return new Promise(async (response, reject) => {
        let specialty = await api.Speciality.findById(data.id);


        if(!specialty)
            response({
                status: "ERROR",
                error: 'SPECIALTY_NOT_FOUND',
                data:null
            });

        response({
            status: "OK",
            error:null,
            data: specialty
        });
    });

}

async function getGroupsList(data) {
    return new Promise(async (response, reject) => {

        let condition = {};
        if(data.search !== null){
            condition = {name: '/' + data.search + '/i'};
        }

        let specialties = await api.SpecialtyGroup.find(condition);

        let resData = [];

        /*for(let i=0;i<specialties.length;i++){
            let item = specialties[i].get({plain: true});
            item.specialties = item.specialties.sort(function (a, b) {
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });

            resData.push(item);
        }
*/
        response({
            status: "OK",
            error:null,
            data: specialties
        });
    });

}

exports.getListSpecialities = getListSpecialities;
exports.getGroupsList = getGroupsList;
exports.getListDetailedSpecialities = getListDetailedSpecialities;
exports.getSpecialityDetails = getSpecialityDetails;
