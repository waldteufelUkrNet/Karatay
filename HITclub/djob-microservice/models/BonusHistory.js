var mongoose = require('mongoose');
var {decimal2JSON} = require('./baseService');

let BonusHistorySchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId},
    user_type: {type: String, default: null},
    type: {type: String, default: null},
    amount: {type: mongoose.Schema.Types.Decimal128, default: 0},
    reason: {type: String, default: null},
    exchange_count: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

BonusHistorySchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('BonusHistory', BonusHistorySchema),
    schema: BonusHistorySchema
};