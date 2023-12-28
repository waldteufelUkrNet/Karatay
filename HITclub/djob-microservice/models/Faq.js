var mongoose = require('mongoose');

let FaqSchema = new mongoose.Schema({
    question: {type: String, default: null},
    answer: {type: String, default: null},
    type: {type: String, default: null},
    priority: {type: Number, default: 0}
});

module.exports = {
    model: mongoose.model('Faq', FaqSchema),
    schema: FaqSchema
};
