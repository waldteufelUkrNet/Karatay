/**
* Region.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        name: {},
        settings: {},
        lat: {},
        lon: {},
        radius: {}
    },
    driver: {
        id: {},
        name: {},
        settings: {},
        lat: {},
        lon: {},
        radius: {}
    },
    list: {
    	id: {},
        name: {},
        settings: {},
        lat: {},
        lon: {},
        radius: {}
    }
};

module.exports = {
  tableName: 'regions',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {type: 'string'},
    services: {
    	collection: 'services',
    	via: 'region'
    },
    customers: {
    	collection: 'customers',
    	via: 'region'
    },
    tariffs: {
        collection: 'tariffs',
        via: 'region'
    },
    settings: {
    	model: 'regionsettings'
    },
    lat: {
    	type: 'float',
    },
    lon: {
    	type: 'float',
    },
    radius: {
        type: 'integer'
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

