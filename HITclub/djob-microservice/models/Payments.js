var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let PaymentsSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId},
    user_type: {type: String},                          // CUSTOMER, EXECUTOR
    card_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId},
    qiwi_txn_id: {type: String, default: null},
    qiwi_order_id: {type: String, default: null},
    amount: {type: mongoose.Schema.Types.Decimal128, default: null},
    commission: {type: mongoose.Schema.Types.Decimal128, default: null},
    type: {type: String, default: 'ORDER_PAYMENT'},     // ORDER_PAYMENT, CARD_VERIFY, REFILL_ACCOUNT
    createdAt: {type: Date, default: null},
    status: {type: Number, default: null},
    statusCode: {type: Number, default: null}
});

PaymentsSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('Payments', PaymentsSchema),
    schema: PaymentsSchema
};