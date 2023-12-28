/**
* Tariffs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        price: {}
    },
    driver: {
        id: {},
        price: {}
    }
};

module.exports = {
  tableName: 'loader_tariffs',
  attributes: {

  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    price: {
      type: 'float'
    },
   
    is_active: {
      type: 'boolean'
    },
    region: {
      columnName: 'region_id',
      model: 'regions'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }

  }
};

