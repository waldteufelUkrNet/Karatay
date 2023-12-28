var exports = module.exports = {};

async function  getAddress(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getAddress(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      name: input.name,
      lon : input.lon ? parseFloat(input.lon.toString()) : null,
      lat : input.lat ? parseFloat(input.lat.toString()) : null,
      front : input.front,
      code : input.code,
      floor : input.floor,
      flat: input.flat ? input.flat : null
    };

    return resp;
}

exports.getAddress=getAddress;
