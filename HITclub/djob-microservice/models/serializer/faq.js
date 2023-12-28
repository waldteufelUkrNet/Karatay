var exports = module.exports = {};

async function getFaq(input) {
    let resp;

    if(Array.isArray(input)){
      resp = [];

      for(let i=0; i<input.length; i++)
        resp.push(await getFaq(input[i]));

      return resp;
    }

    resp = {
      id: input._id,
      question: input.question,
      answer : input.answer
    }

    return resp;
}

exports.getFaq=getFaq;
