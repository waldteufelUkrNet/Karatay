var mongoose = require('mongoose');

let SpecialtiesGroupsSchema = new mongoose.Schema({
    name: {type: String, default: null}
});

module.exports = {
    model: mongoose.model('SpecialtiesGroups', SpecialtiesGroupsSchema),
    schema: SpecialtiesGroupsSchema
};