var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let ReferralUserSchema = new Schema({
    email: {type: String, default: null},
    password: {type: String, default: null},
    firstname: {type: String, default: null},
    lastname: {type: String, default: null},
    phone: {type: String, default: null},
    balance: {type: mongoose.Schema.Types.Decimal128, default: null},
    code: {type: String, default: null},
    activate: {type: String, default: null},
    validity: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

ReferralUserSchema.set('toJSON', {
  transform: (doc, ret) => {
    decimal2JSON(ret);
    return ret;
  }
});

module.exports = {
    model: mongoose.model('ReferralUser', ReferralUserSchema),
    schema: ReferralUserSchema
};
