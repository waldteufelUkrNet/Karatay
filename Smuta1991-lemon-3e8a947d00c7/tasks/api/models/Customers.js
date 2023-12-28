/**
* Customers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    driver: {
        id: {},
        phone: {},
        fax: {},
        company_name: {},
        proved: {},
        blocked: {},
        block_reason: {},
    },
    customer: {
        id: {},
        phone: {},
        fax: {},
        is_company: {},
        company_name: {},
        proved: {},
        blocked: {},
        block_reason: {},
        lat: {},
        lon: {},
 init_transaction: {},
 creditcardnumber: {},
        region: {},
        cards: {},
		bill: {}
    },
     customer2: {
        id: {},
        phone: {}
        
    }
};


module.exports = {
  tableName: 'customers',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    fax: {
      type: 'string'
    },
    phone: {
      type: 'string',
      columnName: 'phone'
    },
    company_name: {
      type: 'string',
      columnName: 'company_name'
    },
    is_company: {
      type: 'boolean',
      columnName: 'isCompany'
    },
    proof_code: {
      type: 'string'
    },
    proved: {
      type: 'boolean'
    },
    active_order: {
      type: 'integer',
      columnName: 'activeOrder'
    },
    ratingup: {
    	type: 'integer'
    },
    ratingdown: {
    	type: 'integer'
    },
    token: {
      type: 'string'
    },
os: {
      type: 'text',
columnName: 'os'
    },
push_token: {
      type: 'text',
columnName: 'push_token'
    },
statusactivities: {
    	collection: 'statusactivities',
    	via: 'customer'
    },
	userreport: {
    	collection: 'userreport',
    	via: 'customer'
    },
cards: {
    	collection: 'cards',
    	via: 'customer'
    },
    blocked: {
    	type: 'boolean'
    },
    block_reason: {
      type: 'text'
    },
init_transaction: {
      type: 'text'
    },
creditcardnumber: {
      type: 'text'
    },
    lat: {
      type: 'float'
    },
    lon: {
      type: 'float'
    },
    orders: {
      collection: 'orders',
      via: 'customer'
    },
    transactions: {
      collection: 'customertransactions',
      via: 'customer'
    },
    region: {
      columnName: 'region_id',
      model: 'regions'
    },
    saldo: {
      type: 'float'
    },
 bill: {
      type: 'float'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

