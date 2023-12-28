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
		Regions.find().exec(function (err, found){

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

