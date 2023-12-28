/**
* Crew.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    customer: {
        id: {},
        phone_num: {},
        lat: {},
        lon: {},
        color: {},
        car: {},
        reg_number: {},
        status: {},
        region_number: {},
name:{}
    },
    driver: {
        id: {},
        phone_num: {},
        lat: {},
        lon: {},
        color: {},
        car: {},
        callsign: {},
        status: {},
        blocked: {},
        block_reason:{},
        ratingup: {},
        name:{},
        ratingdown: {},
        active_order:{},
        reg_number: {},
        service: {},
        region_number: {}
    }
};

module.exports = {
  tableName: 'drivers',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    callsign: {
      type: 'string'
    },
    pass: {
      type: 'string'
    },
    status: {type: 'integer'},
    email: {
      type: 'string'
    },
    phone_num: {
      type: 'string',
      columnName: 'telnum'
    },
    blocked: {
    	type: 'boolean'
    },
    block_reason: {
      type: 'text'
    },
	os: {
      type: 'text'
    },
name: {
      type: 'text'
    },
	push_token: {
      type: 'text'
    },
    ratingup: {
    	type: 'integer'
    },
    ratingdown: {
    	type: 'integer',
    },
    lat: {
    	type: 'float',
    },
    lon: {
    	type: 'float',
    },
    active_order: {
      type: 'integer'
    },
    car: {
      model: 'transport'
    },
    color: {
      type: 'string',
    },
    reg_number: {
      type: 'string',
    },
    region_number:{
      columnName:'reg_number_region',
      type: 'integer'
    },
statusactivities: {
    	collection: 'statusactivities',
    	via: 'driver'
    },
	userreport: {
    	collection: 'userreport',
    	via: 'driver'
    },
orderreports: {
    	collection: 'orderreports',
    	via: 'driver'
    },
    orders: {
      collection: 'orders',
      via: 'driver'
    },
    service: {
      columnName: 'service_id',
      model: 'services'
    },
    tokens: {
      collection: 'accesstokens',
      via: 'driver'
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

