var {updateExecutorMe, logOut, setLocation, setOffice, setStatus, getExecutorMe, updateExecutorPushToken, removeOffice, getReferralLink, getRefillForm} = require('./me');
var {addSpeciality, updateSpeciality, deleteSpeciality} = require('./speciality');
var {getExecutorMarks, getExecutorProfile} = require('./global');
var {login, sendCode, registration, loginByToken} = require('./auth');
var {getExecutorReferralHistory, executorReferralTransfer} = require('./referral');
var {acceptOrganizationInvitation, declineOrganizationInvitation, leaveOrganization} = require('./organization');
var {getWallet, createWallet, updateWallet, deleteWallet} = require('./wallet');
var {getMyCards, getNewCardForm, updateCard, deleteCard} = require('./cards');
var {activateExecutorPromo} = require('./promo');

var exports = module.exports = {
    login,
    logOut,
    sendCode,
    getExecutorMarks,
    updateExecutorMe,
    getExecutorProfile,
    getExecutorMe,
    setLocation,
    setOffice,
    setStatus,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
    registration,
    loginByToken,
    removeOffice,
    getExecutorReferralHistory,
    executorReferralTransfer,
    acceptOrganizationInvitation,
    declineOrganizationInvitation,
    leaveOrganization,
    getReferralLink,
    updateExecutorPushToken,
    getWallet,
    createWallet,
    updateWallet,
    deleteWallet,
    getMyCards,
    getNewCardForm,
    updateCard,
    deleteCard,
    getRefillForm,
    activateExecutorPromo
};
