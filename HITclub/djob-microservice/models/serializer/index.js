var executor = require('./executor');
var customer = require('./customer');
var address = require('./address');
var order = require('./order');
var faq = require('./faq');
var mark = require('./mark');
var speciality = require('./speciality');
var executor_offer = require('./executor_offer');
var promo = require('./promo');
var order = require('./order');
var referral = require('./referral');
var organization = require('./organization');
var support = require('./support');
var report = require('./reports');

var exports = module.exports = {};


function serialize(type, data) {
  switch(type) {
    case 'EXECUTOR_PROFILE':
      return executor.myProfile(data);
      break;
    case 'EXECUTOR_FULL_PROFILE':
      return executor.fullProfile(data);
      break;
    case 'FAQ':
      return faq.getFaq(data);
      break;
    case 'ORDER':
      return order.getOrder(data);
      break;
    case 'MARK':
      return mark.getMark(data);
      break;
    case 'BASE_OFFER':
      return executor_offer.getBaseOffer(data);
      break;
    case 'CUSTOMER_PROFILE':
      return customer.myProfile(data);
      break;
    case 'EXECUTOR_SPECIALITY':
      return speciality.getExecutorSpeciality(data);
      break;
    case 'BASE_SPECIALITY':
      return speciality.getSpeciality(data);
      break;
    case 'BASE_ADDRESS':
      return address.getAddress(data);
      break;

    case 'ADMIN_CUSTOMER_INFO':
      return customer.adminCustomerInfo(data);
      break;
    case 'ADMIN_EXECUTOR_INFO':
      return executor.adminExecutorInfo(data);
      break;
    case 'ADMIN_SPECIALITY_GROUP_INFO':
      return speciality.getSpecialityGroup(data);
      break;
    case 'ADMIN_SPECIALITY_INFO':
      return speciality.getSpeciality(data);
      break;
    case 'ADMIN_CUSTOMER_PROMO':
      return promo.adminPromoInfo(data);
      break;
    case 'ADMIN_EXECUTOR_PROMO':
      return promo.adminExecutorPromoInfo(data);
      break;
    case 'ADMIN_ORDER_INFO':
      return order.getAdminOrder(data);
      break;
    case 'ADMIN_ORDER_HISTORY':
      return order.getAdminOrderHistory(data);
      break;
    case 'ADMIN_CUSTOMER_REFERRAL_HISTORY':
      return referral.adminCustomerReferralHistory(data);
      break;
    case 'ADMIN_EXECUTOR_REFERRAL_HISTORY':
      return referral.adminExecutorReferralHistory(data);
      break;
    case 'ADMIN_EXECUTOR_FINANCIAL_HISTORY':
      return executor.adminExecutorFinancialHistory(data);
      break;
    case 'ADMIN_CUSTOMER_FINANCIAL_HISTORY':
      return customer.adminCustomerFinancialHistory(data);
      break;
    case 'ADMIN_ORGANIZATION_INFO':
      return organization.getOrganization(data);
      break;
    case 'ORGANIZATION_ORDER_HISTORY':
      return organization.getOrganizationOrderHistory(data);
      break;
    case 'ORGANIZATION_ORDER_INFO':
      return organization.getOrganizationOrderInfo(data);
      break;
    case 'ADMIN_SUPPORT_INFO':
      return support.adminSupportInfo(data);
      break;
    case 'ADMIN_REPORTS_LIST':
      return report.adminReportsList(data);
      break;
  }
}

exports.serialize = serialize;
