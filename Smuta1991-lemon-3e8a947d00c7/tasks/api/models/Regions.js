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
        settings: {}
    },
    driver: {
        id: {},
        name: {},
        settings: {}
    },
    list: {
    	id: {},
    	name: {}
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

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

