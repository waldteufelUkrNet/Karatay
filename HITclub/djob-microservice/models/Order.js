var mongoose = require('mongoose');
var speciality = require('./Speciality');
var cards = require('./Cards');
var address = require('./Addresses');
var {decimal2JSON} = require('./baseService');

let OrderSchema = new mongoose.Schema({
    //_id: { type: String },
    price: {type: mongoose.Schema.Types.Decimal128, default: null},
    // min hours for hourly work
    minimal_hours: {type: Number, default: 1},

    specialty_id: {type: mongoose.Schema.Types.ObjectId, default: null}, //req
    specialty: {type: speciality.schema, default: null},
    status: {type: Number, default: 10},
    //10 - created , 11 - find executor
    comment: {type: String, default: null}, //req

    //address_id: {type: Number, default: null},
    address: {type: address.schema, default: null}, //req
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    customer_id: {type: mongoose.Schema.Types.ObjectId, default: null}, //req
    organization_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    //find_status: {type: Number, default: null},
    payment_type: {type: String, default: "CASH"}, //req


    cancel_reason_code: {type: String, default: null}, 

    for_now: {type: Boolean, default: true}, // req
    
    scheduled_time: {type: Date, default: Date.now}, //!req
    scheduled_time_minutes: {type: Number, default: 0}, //!req

    departure: {type: String, default: "ANY"}, // ANY, ADDRESS, OFFICE // req

    departure_address:  Object,

    map:Object,
    start_walk_time: {type: Date, default: null},

    start_work_time: {type: Date, default: null},
    end_work_time: {type: Date, default: null},
    finishedAt: {type: Date, default: null},
    duration: {type: Number, default: null},
    check:Object,

    offered_executor_ids: [{type: String}],

    summ_type: {type: String, default: "HOURLY"},// HOURLY, FIXED
    summ: {type: mongoose.Schema.Types.Decimal128, default: null},
    expected_time: {type: Number, default: null},
    card_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    card: cards.schema,

    requested_summ_type: {type: String, default: null},
    requested_price: {type: mongoose.Schema.Types.Decimal128, default: null},
    requested_departure: {type: String, default: null},

    cancel_reason:Object,

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});


OrderSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });

module.exports = {
    model: mongoose.model('Orders', OrderSchema),
    schema: OrderSchema
};
