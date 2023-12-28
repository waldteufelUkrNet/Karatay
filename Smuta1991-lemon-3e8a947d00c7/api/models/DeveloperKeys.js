/**
* AdminConfig.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {
  autoCreatedAt: false,
autoUpdatedAt: false,
  tableName: 'developer_keys',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    name: {type: 'string'},
	 value: {type: 'string'},
    blocked: {type: 'boolean'}
  }
};