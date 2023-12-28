var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let ExecutorFinancialHistorySchema = new Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    type: {type: String, default: null}, // ORDER | PAYMENT | REFERRAL | PROMO | TRANSFER | ADMIN | REFILL
    balance_type: {type: String, default: null}, // BONUS | BALANCE | CARD | null
    summ: {type: mongoose.Schema.Types.Decimal128, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    payment_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    card_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    info: {type: String, default: null},
    date: {type: Date, default: null},
    after_balance: {type: mongoose.Schema.Types.Decimal128, default: null},
    performer: {type: String, default: null}
});

ExecutorFinancialHistorySchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('ExecutorFinancialHistory', ExecutorFinancialHistorySchema),
    schema: ExecutorFinancialHistorySchema
};
