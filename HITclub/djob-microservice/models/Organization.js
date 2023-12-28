var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let OrganizationSchema = new Schema({
    name: {type: String, default: null},
    about: {type: String, default: null},
    photo: {type: String, default: null},

    email: {type: String, default: null},
    phone: {type: String, default: null},
    password: {type: String, default: null},

    summ_mark: {type: Number, default: 0},
    marks_count: {type: Number, default: 0},

    balance: {type: mongoose.Schema.Types.Decimal128, default: 0},
    bonus_balance: {type: mongoose.Schema.Types.Decimal128, default: 0},

    register_date: {type: Date, default: null},
    register_agency: {type: String, default: null},
    code: {type: String, default: null},

    take_urgent: {type: Boolean, default: true},
    take_not_urgent: {type: Boolean, default: true},
    active: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

OrganizationSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('Organizations', OrganizationSchema),
    schema: OrganizationSchema
};
