var mongoose = require('mongoose');

let OrderReportSchema = new mongoose.Schema({
    text: {type: String, default: null},
    photo: {type: String, default: null},

    initiator: {type: String, default: null}, //CUSTOMER or EXECUTOR
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    customer_id: {type: mongoose.Schema.Types.ObjectId, default: null},

    order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    
    status: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('OrderReport', OrderReportSchema),
    schema: OrderReportSchema
};
