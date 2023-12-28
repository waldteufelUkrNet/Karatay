/**
* DriverTransactions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    driver: {
        id: {},
        value: {},
        createdAt: {},
        payment_type: {},
        order: {}
    }
};


module.exports = {
tableName: 'drivertransactions',
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
    order: {
      type: 'integer'
    },
    payment_type: {
      type: 'string'
    },
    driver: {
      model: 'drivers'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

