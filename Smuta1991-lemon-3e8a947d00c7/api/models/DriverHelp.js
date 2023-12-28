/**
* DriverHelp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  autoCreatedAt: false,
autoUpdatedAt: false,
  tableName: 'driver_help',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    name: {type: 'string'},
	  data: {type: 'string'}
  }
};