var mongoose = require('mongoose');

let CustomerMarkSchema = new mongoose.Schema({
    text: {type: String, default: null},
    rate: {type: Number, default: null},
    order_id: { type: mongoose.Schema.Types.ObjectId, default: null},
    user: Object,
    customer_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('CustomerMarks', CustomerMarkSchema),
    schema: CustomerMarkSchema
};
