var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {decimal2JSON} = require('./baseService');

let CustomerSchema = new Schema({
    name: {type: String, default: null},
    second_name: {type: String, default: null},
    surname: {type: String, default: null},
    
    phone: {type: String, default: null},
    code: {type: String, default: null},
    photo: {type: String, default: null},
    sex: {type: Number, default: 0},
    about: {type: String, default: null},
    city: {type: String, default: null},

    lat: {type: mongoose.Schema.Types.Decimal128, default: null},
    lon: {type: mongoose.Schema.Types.Decimal128, default: null},
    
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

    next_login_sms_available_time: {type: Date, default: null},
    failed_login_count: {type: Number,default: 0},
    sms_sent_count: {type: Number,default: 0},

    summ_mark: {type: Number, default: 0},
    marks_count: {type: Number, default: 0},

    active_order_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    balance: {type: Schema.Types.Decimal128, default: 0},
    bonus_balance: {type: Schema.Types.Decimal128, default: 0},

    referral_users_count: {type: Number,default: 0},
    referral_code: {type: String, default: null},
    referral_balance: {type: mongoose.Schema.Types.Decimal128, default: 0},
    referral_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    referral_type: {type: String, default: null},

    banned: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});
/*
 get: function() {
                let time = this.getDataValue('lon')

                if (time) {
                    return parseFloat(time);
                } else {
                    return time;
                }
            }
 */

CustomerSchema.set('toJSON', {
  transform: (doc, ret) => {
    decimal2JSON(ret);
    return ret;
  }
});

module.exports = {
    model: mongoose.model('Customers', CustomerSchema),
    schema: CustomerSchema
};
