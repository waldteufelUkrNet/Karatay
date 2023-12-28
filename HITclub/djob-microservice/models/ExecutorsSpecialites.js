let specialitySchema = require('./Speciality');
var mongoose = require('mongoose');

let ExecutorSpecialitesSchema = new mongoose.Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    specialty_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    specialty: {type: specialitySchema.schema, default: null} ,
    orders_count: {type: Number, default: 0},

    rate: {type: Number, default: 0},
    vote_count: {type: Number, default: 0},
    summ_rate: {type: Number, default: 0},

    workplace: {type: Boolean, default: true},
    on_departure: {type: Boolean, default: true},

    certificates:[
      {type: String, default: null}
    ],
    
    hourly_rate_price: {type: Number, default: 0},
    hourly_rate_minimal_hours: {type: Number, default: 1},
    fixed_rate_price: {type: Number, default: 0},
    hourly_rate_enabled: {type: Boolean, default: false},
    fixed_rate_enabled: {type: Boolean, default: false},

    rate_type_for_now: {type: String, default: "HOURLY"},

    enabled: {type: Boolean, default: true}
});

module.exports = {
    model: mongoose.model('ExecutorSpecialites', ExecutorSpecialitesSchema),
    schema: ExecutorSpecialitesSchema
};
