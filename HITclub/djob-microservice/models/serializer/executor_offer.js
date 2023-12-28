var exports = module.exports = {};
var address = require('./address');
var executor = require('./executor');

async function getBaseOffer(input) {
    let resp;
    var api = require('../api');
    
    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getBaseOffer(input[i]));

      return resp;
    }

    let input_json = input.toJSON();

    resp = {
      id: input._id,
      summ: input_json.summ,
      departure: input.departure,
      summ_type: input.summ_type,
      minimal_hours: input.minimal_hours || 1,
      address: await address.getAddress(input.address),
      status: input.status,
      createdAt: input.createdAt,
      executor: null
    }
    let executor_entity = await api.Executor.findById(input_json.executor_id);
    if(executor_entity)
        resp.executor = await executor.shortExecutor(executor_entity);

    return resp;
}

exports.getBaseOffer=getBaseOffer;
