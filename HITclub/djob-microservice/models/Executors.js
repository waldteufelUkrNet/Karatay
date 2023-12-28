var mongoose = require('mongoose');
let ExecutorSpecialites = require('./ExecutorsSpecialites');
var {decimal2JSON} = require('./baseService');

let ExecutorSchema = new mongoose.Schema({
    phone: {type: String, default: null},
    code: {type: String, default: null},

    name: {type: String, default: null},
    second_name: {type: String, default: null},
    surname: {type: String, default: null},

    photo: {type: String, default: null},
    about: {type: String, default: null},//req
    sex: {type: Number, default: null},
    city: {type: String, default: null}, //req
    inn: {type: String, default: null}, //req
    passport: { //!!!REQ ALL
      series:{type: String, default: null},
      number:{type: String, default: null},
      code:{type: String, default: null},
      issued_by: {type: String, default: null},
      main_photo: {type: String, default: null},
      registration_photo: {type: String, default: null},
      selfy_photo: {type: String, default: null}
    },

    orders_count: {type: Number, default: 0},

    summ_mark: {type: Number, default: 0},
    marks_count: {type: Number, default: 0},

    organization_id: {type: mongoose.Schema.Types.ObjectId, default: null},

    specialities: [ExecutorSpecialites.schema],

    registered: {type: Number, default: 0},
    status: {type: Boolean, default: false},

    balance: {type: mongoose.Schema.Types.Decimal128, default: 0},
    bonus_balance: {type: mongoose.Schema.Types.Decimal128, default: 0},

    lat: {type: mongoose.Schema.Types.Decimal128, default: 0},
    lon: {type: mongoose.Schema.Types.Decimal128, default: 0},
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      }
    },

    office_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    office:Object,

    failed_login_count: {type: Number, default: null},
    sms_sent_count: {type: Number, default: null},
    next_login_sms_available_time: {type: Date, default: null},
    reject_reason: {type: String, default: null},

    referral_users_count: {type: Number,default: 0},
    referral_code: {type: String, default: null},
    referral_balance: {type: mongoose.Schema.Types.Decimal128, default: 0},
    referral_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    referral_type: {type: String, default: null},

    active_order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    active_card_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    requested_order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    requested_order_time: {type: Date, default: null},
    requested_order_departure: {type: String, default: null},  //ADDRESS, OFFICE

    invitation: Object,
    createdAt: {type: Date, default: Date.now}
});

ExecutorSchema.set('toJSON', {
  transform: (doc, ret) => {
    decimal2JSON(ret);
    return ret;
  }
});

ExecutorSchema.index({location: '2dsphere'});

module.exports = {
    model: mongoose.model('Executors', ExecutorSchema),
    schema: ExecutorSchema
};
