/**
* Tariffs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        inside: {},
       givingCar: {},
         outside: {},
        minimal: {},
        transport: {},
    },
    driver: {
        id: {},
       givingCar: {},
        inside: {},
        outside: {},
        minimal: {},
        transport: {},
    }
};

module.exports = {

  attributes: {

  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    inside: {
      type: 'float'
    },
    outside: {
      type: 'float'
    },
    minimal: {
      type: 'float'
    },

    givingCar: { columnName: 'giving_car',
      type: 'float'
    },

    transport: {
    	model: 'transport'
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

