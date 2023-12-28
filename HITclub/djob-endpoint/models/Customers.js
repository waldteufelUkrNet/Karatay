var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    name: {type: String, default: null},
    phone: {type: String, default: null},
    code: {type: String, default: null},
    photo: {type: String, default: null},
    about: {type: String, default: null},
    sex: {type: Number, default: 0},
    email: {type: String, default: null},
    balance: {type: Schema.Types.Decimal128, default: 0},
    bonus_balance: {type: Schema.Types.Decimal128, default: 0},
    failed_login_count: {type: Number,default: 0},
    sms_sent_count: {type: Number,default: 0},
    next_login_sms_available_time: {type: Date, default: null},
    referral_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    banned: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('Customers', CustomerSchema),
    schema: CustomerSchema
};
