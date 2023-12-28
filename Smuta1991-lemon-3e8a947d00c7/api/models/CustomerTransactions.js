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
        order: {},
    }
};


module.exports = {
tableName: 'customertransactions',
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
    
    customer: {
      model: 'customers'
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

