var mongoose = require('mongoose');
var config = require('../../config');
var history = require('../../libs/history');
var map = require('../../libs/map');
var push = require('../../libs/push');
var api = require('../../models/api');
const moment = require('moment');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function getOrdersForLater(data) {
      let {auth_user} = data;
  
      return new Promise(async (response, reject) => {
        let user = await api.Customer.findOne({_id: auth_user.id});
        if(!user)
        return response({
            status: "ERROR",
            error: "AUTH_ERROR",
            data: {}
        });
  
        let st_of_day = moment().startOf('day');
      
        let orders = await api.Order.find({
          customer_id:  mongoose.Types.ObjectId(auth_user.id),
          for_now: false,
          scheduled_time: {$gte : st_of_day}
        });
  
        return response({
            status: "OK",
            error:null,
            data: await api.Serialize('ORDER',orders)
        });
  
      }
    )
  }


var exports = module.exports = {};
exports.getOrdersForLater = getOrdersForLater;
