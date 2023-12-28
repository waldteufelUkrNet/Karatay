/**
* Reports.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        reason: {},
        text: {},
        }
};

module.exports = {
tableName: 'reports',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
	  customer: {
      columnName: 'customer_id',
    	model: 'customers'
    },
	  reason: {
      type: 'string',
      columnName: 'reason'
    },
    text: {
      type: 'string',
      columnName: 'text'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

