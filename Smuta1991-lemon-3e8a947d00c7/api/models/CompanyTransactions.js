/**
* CustomerTransactions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        value: {},
        createdAt: {},
        comment: {},
    }
};


module.exports = {
tableName: 'companytransactions',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    value: {
      type: 'float',
 columnName: 'value'
    },
   summ: {
      type: 'float'
    },
    dev_key_id: {
      type: 'integer'
    },
      comment: {
      type: 'string'
    },
    customer: {
      model: 'customers',
	   columnName: 'customer_id'
    },
    driver: {
      model: 'drivers',
	   columnName: 'driver_id'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

