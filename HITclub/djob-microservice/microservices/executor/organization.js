var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var moment = require('moment');


async function acceptOrganizationInvitation(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if(!user.invitation || user.organization_id)
          return response({
              status: "ERROR",
              error: 'NO_ANY_INVITATION',
              data:null
          });

      let active_orders = await api.Order.find({status:{$lt:100}, executor_id: user._id});
        if(active_orders.length)
          return response({
              status: "ERROR",
              error: 'HAVE_ACTIVE_ORDERS',
              data:null
          });
      let active_offers = await api.ExecutorOffer.find({ executor_id: user._id });
      if(active_offers.length)
        return response({
            status: "ERROR",
            error: 'HAVE_ACTIVE_OFFERS',
            data:null
        });

        await api.ExecutorSpeciality.updateMany({ executor_id: user._id }, { enabled: false });

        user.organization_id = user.invitation.organization_id;
        user.invitation = null;
        await user.save();

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });
}

async function declineOrganizationInvitation(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if(!user.invitation || user.organization_id)
          return response({
              status: "ERROR",
              error: 'NO_ANY_INVITATION',
              data:null
          });

        user.invitation = null;
        await user.save();

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });
}

async function leaveOrganization(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user = await api.Executor.findById(auth_user.id);

        if(!user.organization_id)
          return response({
              status: "ERROR",
              error: 'NO_ANY_ORGANIZATION',
              data:null
          });

        let active_orders = await api.Order.find({status:{$lt:100}, executor_id: user._id});
            if(active_orders.length)
              return response({
                  status: "ERROR",
                  error: 'HAVE_ACTIVE_ORDERS',
                  data:null
              });
        let active_offers = await api.ExecutorOffer.find({ executor_id: user._id });
          if(active_offers.length)
            return response({
                status: "ERROR",
                error: 'HAVE_ACTIVE_OFFERS',
                data:null
            });

        await api.ExecutorSpeciality.updateMany({ executor_id: user._id }, { enabled: false });

        user.organization_id = null;
        await user.save();

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('EXECUTOR_PROFILE',user)
        });
    });
}

var exports = module.exports = {};
exports.acceptOrganizationInvitation = acceptOrganizationInvitation;
exports.declineOrganizationInvitation = declineOrganizationInvitation;
exports.leaveOrganization = leaveOrganization;
