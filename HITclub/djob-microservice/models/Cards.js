var mongoose = require('mongoose');


let CardSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    info: {type: String, default: null},
    user_type: {type: String, default: null}, // CUSTOMER, EXECUTOR
    number: {type: String, default: null},
    token: {type: String, default: null},
    token_expire: {type: Date, default: null},
    createdAt: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
});

module.exports = {
    model: mongoose.model('Cards', CardSchema),
    schema: CardSchema
};