var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CustomerDevicesSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    os: {type: String, default: null},
    push_token: {type: String, default: ''},
    udid: {type: String, default: null},
    date: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('CustomerDevices', CustomerDevicesSchema),
    schema: CustomerDevicesSchema
};

