/**
* OrdersReason.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        name: {}
    },
    driver: {
        id: {},
        name: {}
    }
};

module.exports = {

  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    name: {type: 'string'},
    rtype: {type: 'string'},

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

