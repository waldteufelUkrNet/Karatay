/**
* Crew.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
customer: {
        lat: {},
        lon: {},
    }
};

module.exports = {
	//  autoPK: false,
autoUpdatedAt: false,
  tableName: 'ordertracking',
  attributes: {
  		id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'id'
    },
    lat: {
    	type: 'float',
    },
    lon: {
    	type: 'float',
    },
    order_id: {
      type: 'integer'
    },
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

