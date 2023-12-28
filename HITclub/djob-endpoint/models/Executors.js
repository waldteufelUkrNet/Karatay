var mongoose = require('mongoose');

let ExecutorSchema = new mongoose.Schema({
    name: {type: String, default: null},
    phone: {type: String, default: null},
    code: {type: String, default: null},
    photo: {type: String, default: null},
    about: {type: String, default: null},
    sex: {type: Number, default: null},
    email: {type: String, default: null},
    registered: {type: Number, default: null},
    status: {type: Boolean, default: false},
    balance: {type: mongoose.Schema.Types.Decimal128, default: null},
    lat: {type: mongoose.Schema.Types.Decimal128, default: null},
    lon: {type: mongoose.Schema.Types.Decimal128, default: null},
    failed_login_count: {type: Number, default: null},
    sms_sent_count: {type: Number, default: null},
    next_login_sms_available_time: {type: Date, default: null},
    referral_id: {type: Number, default: null},
    passport_photo_image: {type: String, default: null},
    passport_registration_image: {type: String, default: null},
    patent_image: {type: String, default: null},
    passport_series: {type: String, default: null},
    passport_number: {type: String, default: null},
    passport_code: {type: String, default: null},
    passport_issued_by: {type: String, default: null},
    transport: {type: String, default: null},
    createdAt: {type: Date, default: Date.now}
});


module.exports = {
    model: mongoose.model('Executors', ExecutorSchema),
    schema: ExecutorSchema
};
