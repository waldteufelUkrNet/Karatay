var {getFaq,getTermsOfConditions, getPrivacyPolicy} = require('./faq');
var {makeSupportRequest, getSupportRequests, updateSupport, getSupportRequestsCount} = require('./support');
var {makeReport} = require('./report');
var exports = module.exports = {
  getFaq,
  makeReport,
  makeSupportRequest,
  getSupportRequests,
  updateSupport,
  getPrivacyPolicy,
  getTermsOfConditions,
  getSupportRequestsCount
};
