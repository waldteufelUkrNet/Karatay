var {login, editAccount, getList, updateOrganization, deleteOrganization, createOrganization, getOrganizationExecutors, getCount} = require('./root');
var {getOrdersForOffer, getSchedules, adminCancelOrderForLater, getExecutorsForOffer, createOrderOffer, getHistory, getOrderHistory, getOrderInfo } = require('./orders');
var {getExecutorsList, inviteExecutor, checkExecutor, createExecutor, getExecutorInfo, updateExecutor, detachExecutor, attachExecutor, killAllProccess} = require('./executors');
var {getSpecialitiesList} = require('./specialities');

var exports = module.exports = {
    login,
    editAccount,
    getExecutorsList,
    inviteExecutor,
    createExecutor,
    checkExecutor,
    createOrderOffer,
    getOrdersForOffer,
    getSchedules,
    getExecutorsForOffer,
    getExecutorInfo,
    getSpecialitiesList,
    updateExecutor,
    detachExecutor,
    attachExecutor,
    getHistory,
    getOrderHistory,
    getOrderInfo,
    getList,
    updateOrganization,
    deleteOrganization,
    createOrganization,
    getOrganizationExecutors,
    getCount,
    adminCancelOrderForLater,
    killAllProccess
};
