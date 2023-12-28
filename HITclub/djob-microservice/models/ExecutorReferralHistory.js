var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ExecutorReferralHistorySchema = new Schema({
    executor_id: {type: String, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_type: {type: String, default: null},
    summ: {type: String, default: null},
    date: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('ExecutorReferralHistory', ExecutorReferralHistorySchema),
    schema: ExecutorReferralHistorySchema
};
