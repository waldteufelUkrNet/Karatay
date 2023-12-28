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
         price_for_km: {},
         minimal_fixed_price: {},
        minimal: {},
        transport: {},
    },
    driver: {
        id: {},
       givingCar: {},
        inside: {},
        outside: {},  
        price_for_km: {},
        minimal_fixed_price: {},
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
    price_for_km: {
      type: 'float'
    },
    minimal_fixed_price: {
      type: 'float'
    },
    minimal: {
      type: 'float'
    },
    is_active: {
      type: 'boolean'
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

