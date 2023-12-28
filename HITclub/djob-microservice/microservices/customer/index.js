var {login, sendCode} = require('./auth');
var {getCustomerMarks} = require('./global');
var {updateCustomerMe, logOut, setLocation, updateCustomerPushToken, getCustomerMe, getReferralLink, getRefillForm} = require('./me');
var {activatePromo} = require('./promo');
var {getMyCards, getNewCardForm, updateCard, deleteCard} = require('./cards');
var {getCustomerReferralHistory, customerReferralTransfer} = require('./referral');


var exports = module.exports = {
  getCustomerMarks,
  login,
  sendCode,
  updateCustomerMe,
  getCustomerMe,
  activatePromo,
  getMyCards,
  getNewCardForm,
  getReferralLink,
  updateCard,
  deleteCard,
  setLocation,
  logOut,
  getCustomerReferralHistory,
  customerReferralTransfer,
  updateCustomerPushToken,
  getRefillForm
};
