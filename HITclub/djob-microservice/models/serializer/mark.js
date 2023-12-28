var exports = module.exports = {};

async function getMark(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getMark(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      text: input.text,
      rate: input.rate,
      photo: input.user.photo ? input.user.photo : null,
      name: input.user.name,
      date: input.createdAt
    }

    return resp;
}

exports.getMark=getMark;
