/**
* Services.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var map = {
    customer: {
        id: {},
        name: {},
        code: {}
    },
    driver: {
        id: {},
        name: {},
        code: {},
        boss_name: {}
    }
};

module.exports = {
  tableName: 'services',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    name: {type: 'string'},
    code: {type: 'string'},
    region: {
      columnName: 'region_id',
    	model: 'regions'
    },
    drivers: {
    	collection: 'drivers',
    	via: 'service'
    },
    
    orders: {
    	collection: 'orders',
    	via: 'service'
    },
    credit: {
        columnName: 'max_credit',
        type: 'float',
    },
    percent: {
        columnName: 'payment_percent',
        type: 'float',
    },
    blocked: {
        type: 'boolean'
    },
    block_reason: {
      type: 'text'
    },
    phone: {
      columnName: 'telnum',
      type: 'string',
    },
orderreports: {
    	collection: 'orderreports',
    	via: 'service'
    },
    saldo: {
      columnName: 'balance',
      type: 'float',
    },
    boss_name: {
      columnName: 'director_name',
      type: 'string',
    },
    boss_login: {
      columnName: 'director_login',
      type: 'string',
    },
    boss_email: {
      columnName: 'director_email',
      type: 'string',
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

