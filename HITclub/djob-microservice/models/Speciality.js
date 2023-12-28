let groupSchema = require('./SpecialtiesGroups');
var mongoose = require('mongoose');

let SpecialitySchema = new mongoose.Schema({
    name: {type: String, default: null},
    info: {type: String, default: null},
    group: {type: groupSchema.schema, default: null},
    group_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    enabled: {type: Boolean, default: true}
});

module.exports = {
    model: mongoose.model('Specialites', SpecialitySchema),
    schema: SpecialitySchema
};