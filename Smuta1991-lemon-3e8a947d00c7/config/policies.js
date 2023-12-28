/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/

//  CloupPaymentsController: {
//   '*': 'userNotLogged',
//   addCard: 'customerLogged'
// },

  CustomersController: {
    '*': 'customerLogged',
    getToken: 'userNotLogged', //true
    outsourceTransaction: 'userNotLogged',
    sendPush: 'userNotLogged',
    addCard: 'customerLogged',
    removeCard:'userNotLogged',
    sendTechEmail:'userNotLogged',
    getTarrifs:'userNotLogged',
    sendCompanyBillAddedEmail:'userNotLogged',
    getOrderTrackOnMap:'userNotLogged'
  },

  DriverController: {
    '*': 'driversLogged',
    login: 'userNotLogged',
    registrationForm: 'userNotLogged',
    uploadFiles: 'userNotLogged',
	  login_with_phone: 'userNotLogged',
	  registration: 'userNotLogged',
    get: 'userNotLogged',
    map: 'userNotLogged',
    addFake: 'userNotLogged',
    addDriver: 'userNotLogged',
    banDriver:'userNotLogged',
    setOffline: 'userNotLogged',
    banDriversByService: 'userNotLogged',
  },

  SettingsController: {
    '*': 'userNotLogged',
    getClientAgreement: 'anyone',
    getGlobalAgreement: 'anyone'
  },

  OrdersController: {
    assignTo: 'userNotLogged',
    status: 'userNotLogged',
    testFly: 'userNotLogged',
    list: 'driversLogged',
    take: 'driversLogged',
    close: 'driversLogged',
    create: 'customerLogged',
    uploadFiles: 'customerLogged',
    get: 'userLogged',
    cancel: 'userLogged',
    cancelReasons: 'userLogged',
    payWithCard: 'customerLogged'
  },

  RegionsController: {
    '*': ['customerLogged', 'driversLogged']
  }
};
