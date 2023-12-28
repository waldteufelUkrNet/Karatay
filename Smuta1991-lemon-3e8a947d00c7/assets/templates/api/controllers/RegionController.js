/**
 * RegionController
 *
 * @description :: Server-side logic for managing Regions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	
	list: function(req, res){
		Regions.find().exec(function (err, found){

		  return res.serialize(found,'customer',200);
		});
	},

	
	get: function (req, res){
		Regions.findOne({id: req.param('id')}).populate('settings').populate('tariffs').exec(function (err, found){

		  if (err){
		  	return res.badRequest(err);
		  }

	found.settings.offerlist=JSON.parse(found.settings.offerlistjson);
 return res.serialize(found,'customer',200);


		 
		});

	},

	
	services: function(req, res){

		Services.find({region: req.param('id'), id:{"!":2}, blocked:false},function (err, results){

		  if (err){
			return res.badRequest();
		  }
		  return res.serialize(results,'customer',200);
		});
	}
};

