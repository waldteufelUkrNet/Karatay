var mongoose = require('mongoose');

let PushSentSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    user_type: {type: String, default: null},
    type: {type: String, default: 'EXECUTOR'}, // CUSTOMER|EXECUTOR|GLOBAL|PERSONAL
    sub_type: {type: String, default: null},
    text: {type: String, default: null},
    date: {type: Date, default: Date.now},
});

module.exports = {
    model: mongoose.model('PushSent', PushSentSchema),
    schema: PushSentSchema
};
