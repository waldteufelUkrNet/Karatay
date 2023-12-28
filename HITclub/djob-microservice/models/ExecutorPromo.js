var mongoose = require('mongoose');

let ExecutorPromoSchema = new mongoose.Schema({
    code: {type: String, default: null},
    type: {type: String, default: null},
    amount: {type: Number, default: 0},
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    active: {type: Boolean, default: true},
    activated_date: {type: Date, default: null}
});

module.exports = {
    model: mongoose.model('ExecutorPromo', ExecutorPromoSchema),
    schema: ExecutorPromoSchema
};
