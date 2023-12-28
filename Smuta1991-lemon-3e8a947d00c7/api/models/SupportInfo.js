/**
* Cpnfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
  customer: {
      id: {},
      name: {},
      type: {},
      value: {},
    }
};


module.exports = {
  tableName: 'support_info',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {type: 'string'},
    type: {type: 'string'},
    value: {type: 'string'},

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

