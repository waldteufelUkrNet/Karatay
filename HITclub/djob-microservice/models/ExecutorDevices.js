var mongoose = require('mongoose');

let ExecutorDevicesSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    os: {type: String, default: null},
    push_token: {type: String, default: ''},
    udid: {type: String, default: null},
    date: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('ExecutorDevices', ExecutorDevicesSchema),
    schema: ExecutorDevicesSchema
};
