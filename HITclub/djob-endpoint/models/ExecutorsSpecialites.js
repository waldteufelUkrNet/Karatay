let specialitySchema = require('./Speciality');
var mongoose = require('mongoose');

let ExecutorSpecialitesSchema = new mongoose.Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: false},
    specialty_id: {type: mongoose.Schema.Types.ObjectId, default: false},
    specialty: {type: specialitySchema.schema, default: false} ,
    orders_count: {type: Number, default: 0},
    workplace: {type: Boolean, default: true},
    on_departure: {type: Boolean, default: true},
    hourly_rate_price: {type: Number, default: true},
    fixed_rate_price: {type: Number, default: true},
    hourly_rate_enabled: {type: Boolean, default: false},
    fixed_rate_enabled: {type: Boolean, default: false},
    enabled: {type: Boolean, default: false}
});

module.exports = {
    model: mongoose.model('ExecutorSpecialites', ExecutorSpecialitesSchema),
    schema: ExecutorSpecialitesSchema
};