var mongoose = require('mongoose');

let OrderHistorySchema = new mongoose.Schema({
    text: {type: String, default: null},
    order_id: {type: String, default: null},
    status: {type: Number, default: null},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('OrderHistory', OrderHistorySchema),
    schema: OrderHistorySchema
};
