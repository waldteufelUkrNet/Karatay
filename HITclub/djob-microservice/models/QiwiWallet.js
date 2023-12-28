var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let QiwiWalletSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    phone: {type: String, default:null},
    active: {type: Boolean, default: true},
    confirmed: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('QiwiWallet', QiwiWalletSchema),
    schema: QiwiWalletSchema
};

