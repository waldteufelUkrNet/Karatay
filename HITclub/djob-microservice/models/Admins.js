var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let AdminsSchema = new Schema({
    email: {type: String, default: null},
    password: {type: String, default: null},
    role: {type: String, default: 'ADMIN'},
    active: {type: Boolean, default: true}
});


module.exports = {
    model: mongoose.model('Admins', AdminsSchema),
    schema: AdminsSchema
};
