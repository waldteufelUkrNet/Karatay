var mongoose = require('mongoose');

let ExecutorMarkSchema = new mongoose.Schema({
    text: {type: String, default: null},
    rate: {type: Number, default: null},
    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    organization_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user: Object,
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('ExecutorMarks', ExecutorMarkSchema),
    schema: ExecutorMarkSchema
};
