var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CustomerReferralHistorySchema = new Schema({
    customer_id: {type: String, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_type: {type: String, default: null},
    summ: {type: String, default: null},
    date: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('CustomerReferralHistory', CustomerReferralHistorySchema),
    schema: CustomerReferralHistorySchema
};
