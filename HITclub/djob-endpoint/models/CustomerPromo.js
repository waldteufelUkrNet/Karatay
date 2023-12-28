var mongoose = require('mongoose');

let CustomerPromoSchema = new mongoose.Schema({
    code: {type: String, default: null},
    type: {type: String, default: null},
    amount: {type: Number, default: 0},
    customer_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    active: {type: Boolean, default: true},
    activated_date: {type: Date, default: null}
});

module.exports = {
    model: mongoose.model('CustomerPromo', CustomerPromoSchema),
    schema: CustomerPromoSchema
};