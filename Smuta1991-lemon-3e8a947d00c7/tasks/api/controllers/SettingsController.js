/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    
    getCustomerSettings: function(req, res) {

    	Settings.getValues(['site','contacts','agreement'], function(values){
    		res.ok(values);
    	});
    },

    
    getTarrifs: function(req, res){

        Tariffs.find({}).populate('transport').exec(function(err, data){
            
            return res.serialize(data, 'customer', 200);
        });
    },

    
    getTransport: function(req, res){

        Transport.find({}).populate('group').exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

            if (result==undefined){
                return res.notFound({msg: "NO_ANY_TRANSPORT"});
            }
            return res.serialize(result, 'customer', 200);
        });
    },
		getDriverAgreement: function(req, res){
			   Config.findOne({name:'driver_agreement'}).exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

          return res.ok({text:result.value, code: 200, err:err});
        });
		},
		getClientAgreement: function(req, res){
			   Config.findOne({name:'agreement_text'}).exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

          return res.ok({text:result.value, code: 200, err:err});
        });
		},
		getAboutApp: function(req, res){
			   Config.findOne({name:'about_app'}).exec(function(err, result1){
Config.findOne({name:'support_phone_number'}).exec(function(err, result2){
	Config.findOne({name:'dispetcherskaja_phone'}).exec(function(err, result3){
            if (err){
                return res.badRequest(err);
            }
var site="http://www.movamba.com";
          return res.ok({text:result1.value, support_phone_number:result2.value, dispetcherskaja_phone:result3.value, site:site, code: 200, err:err});
		   });
           });
		   });
		}
    
};

