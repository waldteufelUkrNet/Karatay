/**
* Cards.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        transaction: {},
         cardnumber: {}
         }
};

module.exports = {
tableName: 'cards',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
   
    customer: {
     columnName: 'customer',
    	model: 'customers'
    },
	transaction: {
      type: 'float',
columnName: 'transaction'
    },
    cardnumber: {
    	type: 'string',
		columnName: 'cardnumber'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

