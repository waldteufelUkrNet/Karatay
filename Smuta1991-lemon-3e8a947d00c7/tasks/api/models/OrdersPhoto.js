/**
* OrdersPhoto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
	driver: {
	    path: {}
	},
	customer: {
	    path: {}
	}
};
module.exports = {

  attributes: {

  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    path: {
      type: 'text'
    },
    request: {
      columnName: 'order_id',
  		model: 'orders'
  	},

  	getGrpFields: function(grp) {
        return map[grp];
    }

  }
};

