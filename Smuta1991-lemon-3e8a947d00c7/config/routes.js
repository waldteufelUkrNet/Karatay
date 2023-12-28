/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

var express = require('express')
var serveStatic = require('serve-static')
var os = require('os')

const dir = `/var/www/sites/movamba/assets` ;
const apidocDir = `/var/www/sites/movamba/assets` ;

// const dir = `/var/www/lemon/assets` ;
// const apidocDir = `/var/www/lemon/assets` ;
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/uploads/*': serveStatic(dir, {skipAssets: true}), // <-- ADD THIS
  '/apidoc/*': serveStatic(apidocDir, {skipAssets: true}), // <-- ADD THIS

//  '/': {
//    view: 'homepage'
// },
   //'/order_path_details': {
 //   view: 'map'
 // },

  'GET /apidoc/sockets': {
    layout: 'sockets_layaout',
    view: 'connections'
  },

  'POST /unitseller/notification': 'CloupPaymentsController.notification',

  // 'POST /cloudpayment/notification/success': 'CloupPaymentsController.backendSuccess',
  // 'POST /cloudpayment/notification/fail': 'CloupPaymentsController.backendFail',
  // 'POST /cloudpayment/notification/check': 'CloupPaymentsController.backendCheck',
  // 'POST /cloudpayment/notification/confirm': 'CloupPaymentsController.backendConfirm',


  //'GET /cloudpayment/add_card': 'CloupPaymentsController.addCard',


  'GET /order_path_details/:order_id': 'CustomersController.getOrderTrackOnMap',

  'GET /api/settings/banner': 'SettingsController.getBanner',
  'GET /api/settings/help_categories': 'SettingsController.getHelpCategories',

  'GET /api/settings/customer': 'SettingsController.getCustomerSettings',
  'GET /api/settings/tariffs': 'SettingsController.getTarrifs',
  'GET /api/settings/tariffs_by_region/:id': 'SettingsController.getTarriffsByRegion',
  'GET /api/settings/transport': 'SettingsController.getTransport',
  'GET /api/settings/driver_agreement': 'SettingsController.getDriverAgreement',
  'GET /api/settings/client_agreement': 'SettingsController.getClientAgreement',

  'GET /api/settings/agreement': 'SettingsController.getGlobalAgreement',
  'GET /api/settings/about_app': 'SettingsController.getAboutApp',
  'GET /api/settings/support_info': 'SettingsController.getSupportInfo',

  //*
  'GET /api/customer/add_card': 'CustomersController.addCard',
  //'GET /api/customer/recurrent': 'CustomersController.recurrent',
  'POST /api/customer/remove_card': 'CustomersController.removeCard',
  'POST /api/customer/get_company_transactions': 'CustomersController.getCompanyFinanceList',
  'GET /api/customer/register': 'CustomersController.getToken',
  'GET /api/customer/tariffs': 'CustomersController.getTarrifs',
  'GET /api/customer/loader_tariffs': 'CustomersController.getLoaderTarrifs',
  'POST /api/customer/send_me_push': 'CustomersController.sendPush',
  'POST /api/customer/code': 'CustomersController.getCode', 
  'PUT /api/customer/approve': 'CustomersController.approve',
  'PUT /api/customer/set_region': 'CustomersController.setRegion',
  'PUT /api/customer/set_push_token': 'CustomersController.setPushToken',
  'GET /api/customer/transactions': 'CustomersController.transactions',
  'PUT /api/customer/:id/position': 'CustomersController.position',
  'PUT /api/customer/position': 'CustomersController.position',
  'PUT /api/customer/report': 'CustomersController.createReport',
  'GET /api/customer/:id': 'CustomersController.get',
  'GET /company_customer/order_track/:order_id': 'CustomersController.getOrderTrack',
  'PUT /api/customer/:id': 'CustomersController.edit',
  'POST /api/customer/send_add_company_bill_email': 'CustomersController.sendCompanyBillAddedEmail',
  'PUT /api/company_customer/discard': 'CustomersController.outsourceTransaction',
  'GET /api/company_customer/finance_transactions': 'CustomersController.financeTransactions',

  'POST /api/sendTechEmail': 'CustomersController.sendTechEmail',
 
  'POST /api/orders/:id/uploads': 'OrdersController.uploadFiles',
  'PUT /api/orders/:id/cancel': 'OrdersController.cancel',
  'GET /api/orders/:id/take': 'OrdersController.take',
  'PUT /api/orders/:id/assignto/:did': 'OrdersController.assignTo',
  'PUT /api/orders/:id/status': 'OrdersController.status',
  'PUT /api/orders/:id/close': 'OrdersController.close', 
  'GET /api/orders/list': 'OrdersController.list',
  'GET /api/orders/reasons': 'OrdersController.cancelReasons', 
  'GET /api/orders/:id': 'OrdersController.get',
  'POST /api/orders/create': 'OrdersController.create',
  'POST /api/orders/get_distance': 'OrdersController.getDistanceByCoords',
  'POST /api/orders/test': 'OrdersController.testFly',  
  'POST /api/orders/payment_callback': 'OrdersController.testFly',
  'POST /api/orders/push': 'OrdersController.sendPush',

  //*
  'POST /api/orders/pay_with_card': 'OrdersController.payWithCard',
  
  'POST /api/orders/cross_city_line': 'OrdersController.crossCityLine',
  'POST /api/orders/report': 'OrdersController.addReport',
  'POST /api/drivers/rate': 'OrdersController.rate',

  'GET /send_test_email': 'OrdersController.testEmail',
  
  'POST /api/drivers/registration_form': 'DriverController.registrationForm',
  'POST /api/drivers/uploads': 'DriverController.uploadFiles',

  'POST /api/drivers/registration': 'DriverController.registration',
  'POST /api/drivers/login_with_phone': 'DriverController.login_with_phone',
  
  'POST /api/drivers/login': 'DriverController.login',
  'GET /api/drivers/uniteller/add_balance': 'DriverController.addUnitellerBalance',
  'GET /api/drivers/:id': 'DriverController.get',
  'GET /api/drivers/active/:id': 'DriverController.getActiveOrders',
  'POST /api/drivers/map': 'DriverController.map',
  'PUT /api/drivers/position': 'DriverController.position',
  'PUT /api/drivers/status': 'DriverController.status',
  'PUT /api/drivers/set_push_token': 'DriverController.setPushToken',
  'POST /api/drivers/add_fake': 'DriverController.addFake',
  'POST /api/drivers/add_driver': 'DriverController.addDriver',
  'POST /api/drivers/ban': 'DriverController.banDriver',
  'POST /api/drivers/set_offline': 'DriverController.setOffline',
  'POST /api/drivers/ban_users_by_service': 'DriverController.banDriversByService',
  'GET /api/drivers/individual_driver/transactions': 'DriverController.transactions',



  'GET /api/regions/:id/services': 'RegionController.services',
  'GET /api/regions/:id': 'RegionController.get',
  'GET /api/regions': 'RegionController.list'

  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};


