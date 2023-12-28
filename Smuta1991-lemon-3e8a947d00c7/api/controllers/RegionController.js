/**
 * RegionController
 *
 * @description :: Server-side logic for managing Regions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * @api {get} /regions Список регионов
	 * @apiGroup Regions
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Список регионов
	 * @apiVersion 0.1.0
	 */
	list: function(req, res){
		Regions.find().populate('settings').exec(function (err, found){
			// RegionSettings.update({
			// 	region: 3
			// 	}, {
			// 			geoshape:[
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842789, lon:55.76522},
			// 				{lat:37.842627, lon:55.755723},
			// 				{lat:37.841828, lon:55.747399},
			// 				{lat:37.841217, lon:55.739103},
			// 				{lat:37.840175, lon:55.730482},
			// 				{lat:37.83916, lon:55.721939},
			// 				{lat:37.837121, lon:55.712203},
			// 				{lat:37.83262, lon:55.703048},
			// 				{lat:37.829512, lon:55.694287},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558},
			// 				{lat:37.842762, lon:55.774558}
			// 			]
			// 	}).exec(function (err, updated){
			// 		console.log(updated)
			// 	});

		  return res.serialize(found,'customer',200);
		});
	},

	getCurrentRegion: function(req, res){
		if(!req.driver || !req.driver.service || !req.driver.service.region)
				return res.badRequest("IS_NOT_INDIVIDUAL_DRIVER");

				console.log(driverss)
		Regions.findOne({id: driver.service.region}).populate('settings').exec(function (err, found){

		  return res.serialize(found,'customer',200);
		});
	},

	/**
	 * @api {get} /regions/:id Регион
	 * @apiGroup Regions
	 * @apiParam {Number} id ID региона
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Получение региональных настроек
	 * @apiVersion 0.1.0
	 */
	get: function (req, res){
		Regions.findOne({id: req.param('id')}).populate('settings').populate('tariffs').exec(function (err, found){

		  if (err){
		  	return res.badRequest(err);
		  }

	found.settings.offerlist=JSON.parse(found.settings.offerlistjson);
 return res.serialize(found,'customer',200);


		 
		});

	},

	/**
	 * @api {get} /regions/:id/services Список служб в регионе
	 * @apiGroup Regions
	 * @apiDescription Список служб в регионе
	 * @apiParam {Number} id ID региона
	 * @apiVersion 0.1.0
	 */
	services: function(req, res){

		Services.find({region: req.param('id'), id:{"!":2}, blocked:false},function (err, results){

		  if (err){
			return res.badRequest();
		  }
		  return res.serialize(results,'customer',200);
		});
	}
};

