/**
* Cpnfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  autoCreatedAt: false,
autoUpdatedAt: false,
  tableName: 'accepted_versions',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    os: {type: 'string'},
  app_version: {type: 'string'},
  type: {type: 'string'},

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

