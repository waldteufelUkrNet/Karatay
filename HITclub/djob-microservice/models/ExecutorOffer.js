var address = require('./Addresses');
var mongoose = require('mongoose');
var {decimal2JSON} = require('./baseService');

let ExecutorOfferSchema = new mongoose.Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    organization_id: {type: mongoose.Schema.Types.ObjectId, default: null},

    summ_type: {type: String, default: "HOURLY"},// HOURLY, FIXED
    minimal_hours: {type: Number, default: 1},
    summ:  {type: mongoose.Schema.Types.Decimal128, default: null},
    departure: {type: String, default: "ADDRESS"},
    address: {type: address.schema, default: null},
    status: {type: String, default: 'WAITING'}, // WAITING, DECLINED, ACCEPTED

    createdAt: {type: Date, default: Date.now}
});

ExecutorOfferSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('ExecutorOffer', ExecutorOfferSchema),
    schema: ExecutorOfferSchema
};
