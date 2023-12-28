/**
* DriverRegistration.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: false,
autoUpdatedAt: false,
  tableName: 'driver_registration',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    passport_photo: {type: 'string'},
    passport_reg: {type: 'string'},
    dr_license_front: {type: 'string'},
    dr_license_back: {type: 'string'},
    name: {type: 'string'},
    last_name: {type: 'string'},
    surname: {type: 'string'},
    phone: {type: 'string'},
    bank_card: {type: 'string'},
    car_reg_front: {type: 'string'},
    car_reg_back: {type: 'string'},
    osago: {type: 'string'},
	  car_photo_front: {type: 'string'},
	  car_photo_back: {type: 'string'},
	  car_photo_left: {type: 'string'},
	  car_photo_right: {type: 'string'},
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};