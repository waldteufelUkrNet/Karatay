var mongoose = require('mongoose');

let BonusHistorySchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: false},
    user_type: {type: String, default: null},
    type: {type: String, default: null},
    amount: {type: mongoose.Schema.Types.Decimal128, default: 0},
    reason: {type: String, default: null},
    exchange_count: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('BonusHistory', BonusHistorySchema),
    schema: BonusHistorySchema
};