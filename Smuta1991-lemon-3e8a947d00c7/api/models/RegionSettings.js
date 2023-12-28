/**
* RegionSettings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var map = {
  customer: {
  	find_car_time: {},
    first_circle_time: {},
    first_circle_radius: {},
    second_circle_time: {},
    second_circle_radius: {},
    free_time_for_order: {},
    offerlist: {},
    geoshape: {}
  },
  driver: {
  	find_car_time: {},
    first_circle_time: {},
    first_circle_radius: {},
    second_circle_time: {},
    second_circle_radius: {},
    free_time_for_order: {},
    geoshape: {}
  },
}

module.exports = {
  tableName: 'region_settings',
  attributes: {

  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    find_car_time: {
      columnName: 'findCarTime',
      type: 'integer'
    },
    first_circle_time: {
      columnName: 'circleOneTime',
      type: 'integer'
    },
    first_circle_radius: {
      columnName: 'circleOneRadius',
      type: 'integer'
    },
    second_circle_time: {
      columnName: 'circleTwoTime',
      type: 'integer'
    },
    second_circle_radius: {
      columnName: 'circleTwoRadius',
      type: 'integer'
    },
    free_time_for_order: {
      columnName: 'timeToFreeOrder',
      type: 'integer'
    },
	 driver_decite_time_for_order: {
      columnName: 'driverDecideOperatorOrderTime',
      type: 'integer'
    },
    region: {
      columnName: 'region_id',
      model: 'regions'
    },
    offline_timout: {
      type: 'integer'
    },
    geoshape: {
      type: 'json'
    },
   offerlist: {
      type: 'json'
    },
   offerlistjson: {
      type: 'text'
    },
	
    getGrpFields: function(grp) {
        return map[grp];
    }
  }
};

