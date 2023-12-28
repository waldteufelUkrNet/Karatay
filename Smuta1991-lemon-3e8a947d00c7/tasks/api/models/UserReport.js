/**
* UserReport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
tableName: 'user_report',
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
    
    customer: {
     columnName: 'custumer_id',
    	model: 'customers'
    },
	driver: {
      columnName: 'crew_id',
    	model: 'drivers'
    },
	text: {
    	type: 'string'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

