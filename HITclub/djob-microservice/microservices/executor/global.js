var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var moment = require('moment');

async function getExecutorMarks(data) {
    let {executor_id, limit, offset} = data;

    return new Promise(async (response, reject) => {

        let executor = await api.Executor.findById(executor_id);

        let marks = [];
        if(!executor.organization_id)
          marks = await api.ExecutorMark.find({
            executor_id: mongoose.Types.ObjectId( executor_id ),
            organization_id: null
          }).sort({'createdAt': 'desc'}).skip(offset).limit(limit);
        else
          marks = await api.ExecutorMark.find({
            executor_id: mongoose.Types.ObjectId( executor_id ),
            organization_id: mongoose.Types.ObjectId( executor.organization_id  )
          }).sort({'createdAt': 'desc'}).skip(offset).limit(limit);

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('MARK',marks)
        });
    });
}

async function getExecutorProfile(data) {
  let {executor_id} = data;

  return new Promise(async (response, reject) => {
      if(executor_id.length !== 24)
          return response({
              status: "OK",
              error: 'MISSING_INPUT_PARAMETERS'
          });

      let executor = await api.Executor.findById(executor_id);
      if(!executor)
          return response({
            status: "ERROR",
            error: "NO_SUCH_USER",
            data: null
          });
          
      response({
          status: "OK",
          error: null,
          data: await api.Serialize('EXECUTOR_FULL_PROFILE',executor)
      });
  });
}

var exports = module.exports = {};
exports.getExecutorMarks = getExecutorMarks;
exports.getExecutorProfile = getExecutorProfile;