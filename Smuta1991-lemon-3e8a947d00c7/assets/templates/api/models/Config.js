/**
* Cpnfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  tableName: 'config',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {type: 'string'},
  value: {type: 'string'},

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

