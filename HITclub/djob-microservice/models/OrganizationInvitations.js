var mongoose = require('mongoose');

let OrganizationInvitationsSchema = new mongoose.Schema({
    executor_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    organization_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    name: {type: String, default: null},
    createdAt: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('OrganizationInvitations', OrganizationInvitationsSchema),
    schema: OrganizationInvitationsSchema
};
