/**
* AccessTokens.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    driver: {
        token: {}
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
    token: {type: 'string'},
    driver: {
  		model: 'drivers'
  	},

  	getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

