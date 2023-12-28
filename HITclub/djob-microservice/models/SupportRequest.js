var mongoose = require('mongoose');

let SupportRequestSchema = new mongoose.Schema({
    email: {type: String, default: null},
    text: {type: String, default: null},
    phone: {type: String, default: null},
    status: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('SupportRequest', SupportRequestSchema),
    schema: SupportRequestSchema
};
