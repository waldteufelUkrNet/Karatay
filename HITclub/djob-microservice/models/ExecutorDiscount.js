var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ExecutorDiscountSchema = new Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    discount: {type: Number, default: null},
    expiration: {type: Date, default: null},
    createdAt: {type: String, default: null}
});

module.exports = {
    model: mongoose.model('ExecutorDiscount', ExecutorDiscountSchema),
    schema: ExecutorDiscountSchema
};

