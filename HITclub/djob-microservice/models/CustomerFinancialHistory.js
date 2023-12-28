var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let CustomerFinancialHistorySchema = new Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    type: {type: String, default: null}, // ORDER | PAYMENT | REFERRAL | PROMO | TRANSFER | QIWI_ORDER_PAYMENT | QIWI_ADDING_CARD_STAGE_TWO | ADMIN | REFILL
    balance_type: {type: String, default: null}, // BONUS | BALANCE | CARD | null
    summ: {type: mongoose.Schema.Types.Decimal128, default: null},
    commission: {type: mongoose.Schema.Types.Decimal128, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    qiwi_order_id: {type: String, default: null},
    qiwi_status: {type: Number, default: null},
    payment_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    card_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    info: {type: String, default: null},
    date: {type: Date, default: null},
    after_balance: {type: mongoose.Schema.Types.Decimal128, default: null},
    performer: {type: String, default: null}
});


CustomerFinancialHistorySchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });
module.exports = {
    model: mongoose.model('CustomerFinancialHistory', CustomerFinancialHistorySchema),
    schema: CustomerFinancialHistorySchema
};
