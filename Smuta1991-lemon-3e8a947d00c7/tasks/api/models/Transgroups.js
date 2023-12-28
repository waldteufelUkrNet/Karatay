/**
* Transgroups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var map = {
    list: {
        id: {},
        name: {}
    },
    single: {
        id: {},
        name: {}
    }
};

module.exports = {
  tableName: 'transgroups',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    name: {type: 'string'},
    cars: {
    	collection: 'transport',
    	via: 'group'
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

