var exports = module.exports = {};


async function getExecutorSpeciality(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getExecutorSpeciality(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      specialty: await getSpeciality(input.specialty),
      orders_count: input.orders_count,
      rate: input.rate,
      vote_count: input.vote_count,
      summ_rate: input.summ_rate,
      workplace: input.workplace,
      on_departure: input.on_departure,
      certificates: input.certificates,
      hourly_rate_price: input.hourly_rate_price,
      hourly_rate_enabled: input.hourly_rate_enabled,
      hourly_rate_minimal_hours: input.hourly_rate_minimal_hours,
      fixed_rate_price: input.fixed_rate_price,
      fixed_rate_enabled: input.fixed_rate_enabled,
      enabled: input.enabled,
      rate_type_for_now: input.rate_type_for_now
    //  group: getSpecialityGroup(input.group)
    }

    return resp;
}

async function getSpeciality(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getSpeciality(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      name: input.name,
      info: input.info,
      group_id: input.group_id,
      group: await getSpecialityGroup(input.group)
    };

    return resp;
}

async function getSpecialityGroup(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getSpecialityGroup(input[i]));

      return resp;
    }
    console.log('input',input)
    resp = {
      id: input._id,
      name: input.name
    };

    return resp;
}

exports.getExecutorSpeciality=getExecutorSpeciality;
exports.getSpeciality=getSpeciality;
exports.getSpecialityGroup=getSpecialityGroup;
