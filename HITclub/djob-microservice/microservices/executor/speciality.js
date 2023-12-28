var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


//one-time script to format all user specialities
// // updateAllSpecialities();
// async function updateAllSpecialities() {
//
//     return new Promise(async (response, reject) => {
//         // 0001
//         // let users = await api.Executor.find({specialities: {$ne: []}});
//         // console.log(`!!!!!!! found ${users.length} users`)
//         // for(let i = 0 ; i < users.length ; i ++ ){
//         //     let executor_specialities = await api.ExecutorSpeciality.find({_id: {$in: users[i].specialities.map(item => item._id)}});
//         //     let exSpecIds = executor_specialities.map(item => item._id);
//         //
//         //     users[i].specialities = users[i].specialities.filter(item => exSpecIds.indexOf(item._id) !== -1);
//         //     await  users[i].save();
//         // }
//
//         // 0002
//         // let executor_specialities = await api.ExecutorSpeciality.find({});
//         // for(let i = 0 ; i < executor_specialities.length ; i ++ ){
//         //     let spec = await api.Speciality.findById(executor_specialities[i].specialty_id);
//         //     if(!spec){
//         //         await api.ExecutorSpeciality.deleteOne({ _id: executor_specialities[i]._id });
//         //     }
//         // }
//
//         // 0003
//         let executor_specialities = await api.ExecutorSpeciality.find({});
//         for(let i = 0 ; i < executor_specialities.length ; i++ ){
//             console.log('0001: ', executor_specialities[i].executor_id);
//             let user = await api.Executor.findById(executor_specialities[i].executor_id.toString());
//             if(!user){
//                 await api.ExecutorSpeciality.deleteOne({ _id: executor_specialities[i]._id });
//             }
//
//             if(user) {
//                 if(!user.specialities)
//                     user.specialities = [];
//
//                 user.specialities.push(executor_specialities[i]);
//                 user.save();
//             }
//         }
//
//
//
//        return;
//     });
// }


async function addSpeciality(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        if(!data.specialty_id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });
            let user = await api.Executor.findById(auth_user.id);

        let speciality = await api.Speciality.findById(data.specialty_id);

        if(!speciality)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        if(!user.office){
          if(data.workplace)
            return response({
                status: "ERROR",
                error: 'OFFICE_NOT_FOUND',
                data:null
            });
        }
        data.specialty = speciality;


        console.log(user)
        let executorSpeciality = await api.ExecutorSpeciality.create({
            executor_id: mongoose.Types.ObjectId(auth_user.id),
            specialty_id: mongoose.Types.ObjectId(data.specialty_id),
            specialty: data.specialty,
            workplace: data.workplace,
            certificates:data.certificates,
            on_departure: data.on_departure,
            hourly_rate_price: data.hourly_rate_price,
            hourly_rate_minimal_hours: data.hourly_rate_minimal_hours || 1,
            fixed_rate_price: data.fixed_rate_price,
            hourly_rate_enabled: data.hourly_rate_enabled,
            fixed_rate_enabled: data.fixed_rate_enabled,
            rate_type_for_now: data.rate_type_for_now,
            enabled: data.enabled
        });

        user.specialities.push(executorSpeciality);
        user.save();


          return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_SPECIALITY',executorSpeciality)
        });
    });
}

async function updateSpeciality(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let speciality = await api.ExecutorSpeciality.findById(data.id);
        //console.log(speciality)

        if(!speciality || speciality.executor_id.toString() !== auth_user.id)
            return response({
                status: "ERROR",
                error: 'SPECIALITY_NOT_FOUND',
                data:null
            });

        let user = await api.Executor.findById(auth_user.id);

            delete data.rate;
            delete data.summ_rate;
            delete data.order_count;

            if(!user.office){
              if(data.workplace)
                return response({
                    status: "ERROR",
                    error: 'OFFICE_NOT_FOUND',
                    data:null
                });
            }

             console.log("pre spec ",speciality)
        for (let key in data) {
            if(key !== "specialty_id")
                speciality[key] = data[key];
           
             //   speciality[key] = mongoose.Types.ObjectId(data[key]);
        }
        console.log("post spec ",speciality)
        console.log("--------------------------------------------------------------------------------------------")
        console.log("finding for "+speciality.specialty_id)
        
        //console.log("specialities list  "+user.specialities)

        await speciality.save();
        let speciality_index = user.specialities.findIndex(function(x){
            console.log(x.specialty_id +" ==? "+speciality.specialty_id)
          return x.specialty_id.toString() === speciality.specialty_id.toString();
        } );
      
        console.log(speciality_index)

        if(speciality_index>=0){
            delete user.specialities.splice(speciality_index, 1);
            user.specialities.push(speciality);
           console.log(speciality_index)
        }
        else {
          user.specialities.push(speciality);
        }
        await user.save();

        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('EXECUTOR_SPECIALITY',speciality)
        });
    });
}

async function deleteSpeciality(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let executor_speciality = await api.ExecutorSpeciality.findById(data.id);

        if(!executor_speciality)
            return response({
                status: "ERROR",
                error: 'SPECIALITY_NOT_FOUND',
                data:null
            });

        let user = await api.Executor.findById(auth_user.id);

        user.specialities = user.specialities.filter(item => item.specialty_id.toString() !== executor_speciality.specialty_id.toString());
        await user.save();

        await api.ExecutorSpeciality.deleteOne({ _id: data.id });

        return response({
            status: "OK",
            error:null,
            data: {}
        });
    });
}

var exports = module.exports = {};
exports.addSpeciality = addSpeciality;
exports.updateSpeciality = updateSpeciality;
exports.deleteSpeciality = deleteSpeciality;
