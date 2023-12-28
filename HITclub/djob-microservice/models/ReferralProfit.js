var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let ReferralProfitSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId},
    referral_id: {type: mongoose.Schema.Types.ObjectId},
    user_type: {type: String},
    order_id: {type: mongoose.Schema.Types.ObjectId},
    amount: {type: mongoose.Schema.Types.Decimal128, default: null},
    createdAt: {type: Date, default: Date.now}
});

ReferralProfitSchema.set('toJSON', {
  transform: (doc, ret) => {
    decimal2JSON(ret);
    return ret;
  }
});

module.exports = {
    model: mongoose.model('ReferralProfit', ReferralProfitSchema),
    schema: ReferralProfitSchema
};
