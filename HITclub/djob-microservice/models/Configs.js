var mongoose = require('mongoose');

let ConfigsSchema = new mongoose.Schema({
    param: {type: String, default: null},
    value: {type: String, default: null}
});

module.exports = {
    model: mongoose.model('Configs', ConfigsSchema),
    schema: ConfigsSchema
};