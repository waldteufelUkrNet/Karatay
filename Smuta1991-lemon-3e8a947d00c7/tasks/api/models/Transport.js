/**
* Transport.js
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
  tableName: 'transport',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    name: {type:'string'},
    group: {model: 'transgroups'},

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

