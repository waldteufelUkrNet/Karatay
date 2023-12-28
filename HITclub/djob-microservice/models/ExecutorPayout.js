var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let ExecutorPayoutSchema = new Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    amount: {type: mongoose.Schema.Types.Decimal128, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    createdAt: {type: Date, default: Date.now},
    status: {type: Number, default: null}
});

ExecutorPayoutSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('ExecutorPayout', ExecutorPayoutSchema),
    schema: ExecutorPayoutSchema
};

