/**
* OrderReports.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        order: {},
        summ: {},
        doc: {},
         }
};

module.exports = {
tableName: 'orders_reports',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    order: {
     columnName: 'order_id',
    	model: 'orders'    },
    
    service: {
     columnName: 'service_id',
    	model: 'services'
    },
	driver: {
      columnName: 'driver_id',
    	model: 'drivers'
    },
    summ: {
      type: 'float',
columnName: 'summ'
    },
	comission: {
      type: 'float',
columnName: 'comission'
    },
    type: {
    	type: 'boolean',
		columnName: 'type'
    },
 doc: {
    	type: 'string',
		columnName: 'doc'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

