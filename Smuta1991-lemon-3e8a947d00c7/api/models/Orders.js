/**
* Orders.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
    driver: {
        id: {},
        from: {},
        to: {},
        description: {},
        additional_phone: {},
        start_lat: {},
        start_lon: {},
        finish_lat: {},
        finish_lon: {},
        starttime: {},
        laststatus: {},
        paytype: {},
        for_now: {},
        need_boxes: {},
        need_loader: {},
        moving_apartments: {},
        photos: {},
        customer: {},
        status: {},
        is_fixed_price: {},
        fixed_price: {},
        fixed_price_distance: {},
        loader_count: {},
        cartype: {},
        service_id: {},
		inside_time:{},
		outside_time:{},
		inside_price:{},
		outside_price:{},
        driver: {}
    },
    customer: {
        id: {},
        from: {},
        to: {},
        description: {},
        additional_phone: {},
        start_lat: {},
        start_lon: {},

        is_fixed_price: {},
        fixed_price: {},
        fixed_price_distance: {},
        finish_lat: {},
        finish_lon: {},
        loader_count: {},
        starttime: {},
        laststatus: {},
        paytype: {},
        for_now: {},
        need_boxes: {},
        need_loader: {},
        moving_apartments: {},
        photos: {},
        status: {},
        cartype: {},
        service_id: {},
        driver: {}
    }
};

module.exports = {
  tableName: 'orders',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    from: {
      type: 'string',
      columnName: 'startpoint'
    },
  	to: {
  	  type: 'string',
      columnName: 'endpoint'
  	},
  	description: {
  	  type: 'string',
      columnName: 'comment'
  	},
  	start_lat: {
  	  type: 'float'
  	},
  	start_lon: {
  	  type: 'float'
  	},
    finish_lat: {
      type: 'float'
    },
    finish_lon: {
      type: 'float'
    },
    need_boxes: {
      type: 'boolean'
    },
    need_loader: {
      type: 'boolean'
    },
    moving_apartments: {
      type: 'text'
    },
  	starttime: {
  		type: 'datetime'
  	},
	operator_got_time: {
  		type: 'datetime'
  	},
    additional_phone: {
      type: 'string'
    },
	source: {
      type: 'string'
    },
  	laststatus: {
  		type: 'integer',
  		columnName: 'laststatus'
  	},
  	paytype: {
  		type: 'integer'
    },
    
    region_id: {
  		type: 'integer'
  	},
    photos: {
      collection: 'ordersphoto',
      via: 'request'
    },
  	bill_status: {
  		type: 'integer',
  		columnName: 'bill_status'
    },
    is_fixed_price: {
    	type: 'boolean'
    },
    loader_count: {
      type: 'integer'
    },
    fixed_price: {
  		type: 'float'
  	},
    fixed_price_distance: {
      type: 'integer'
    },
  	for_now: {
  		type: 'boolean'
  	},
  	driver: {
  		model: 'drivers'
  	},
  	customer: {
  		model: 'customers'
  	},
  	service_id: {
      columnName: 'service_id',
  		type: 'integer'
  	},
    service: {
      model: 'services'
    },
  	cartype: {
  		model: 'transport',
defaultsTo : 0
  	},
    round: {
      type: 'integer'
    },
    status: {
      type: 'integer'
    },
    
	inside_time: {
      type: 'integer'
    },
	outside_time: {
      type: 'integer'
    },
	inside_price: {
      type: 'integer'
    },
	outside_price: {
      type: 'integer'
    },
    cancel_reason: {
      type: 'string'
    },
	 u_key: {
      type: 'string'
    },
statusactivities: {
    	collection: 'statusactivities',
    	via: 'order'
    },
	userreport: {
    	collection: 'userreport',
    	via: 'order'
    },
orderreports: {
    	collection: 'orderreports',
    	via: 'order'
    },
    getGrpFields: function(grp) {
        return map[grp];
    },
updatedAt: {
  		type: 'datetime'
    },
    bill_summ: {
      type: 'integer'
    }

  }
};

