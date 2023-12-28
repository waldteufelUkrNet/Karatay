/**
 * CrewController
 *
 * @description :: Server-side logic for managing crews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	* @api {post} /drivers/login Логин водителя
	* @apiGroup Drivers
	* @apiParam {String} callsign Позывной
	* @apiParam {String} code Код службы
	* @apiParam {String} pass Пароль
	* @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     "data": {
	*	        "id": 1,
	*	        "phone_num": "+766677776",
	*	        "lat": 0.001,
	*	        "lon": 0.001,
	*	        "color": "red",
	*	        "reg_number": "ВА374О"
	*	   },
	*	   "access": {
	*	       "token": "UZOIHIABNRY4TMEGU6CZ4GS27TIOHGMNBLHXQARA4SJW7PLYNELXL2CPYP43DOGWS2WENWPCADNTDRXBK6XO2U7CDUCMNIOOOKVFUQK3O"
	*	   }
	* @apiVersion 0.1.0
	*/
	login: function(req, res){

		Services.findOne({code: req.param('code')}).exec(function(err, service){

			if (err){
				return res.notFound(err);
			}

			if (service==undefined){
				return res.notFound({msg: 'SERVICE_NOT_FOUND',code: 404});
			}
			if (service.blocked){
				return res.notFound({msg: 'SERVICE_IS_BLOCKED',code: 404});
			}
			if(service.saldo<0&&((-1)*service.saldo)>service.credit){
				return res.notFound({msg: 'SERVICE_IS_OUT_OF_CREDIT_LIMIT',code: 404});
			}
			var crypto = require('crypto');
			var pass =  crypto.createHash('md5').update(req.param('pass')).digest('hex');

			Drivers.findOne({callsign: req.param('callsign'), pass: pass, service: service.id}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					return res.notFound(err);
				}

				if (driver==undefined){
					return res.notFound({msg: "USER_NOT_FOUND", code: 404})
				}

				if (driver.blocked==true){
					return res.notFound({msg: "USER_BLOCKED", code: 404})
				}
				var randtoken = require('rand-token').generator({chars: 'base32'});
				var token = randtoken.generate(105);

				AccessTokens.create({token: token, driver: driver.id}).exec(function (err, created){

					if (err){
						return res.badRequest(err);
					}

					return res.serialize({data: driver,
						access: created},'driver',200);
				});
			});
		});
	},

	/**
	* @api {get} /drivers/:id Профиль водителя
	* @apiGroup Drivers
	* @apiParam {Number} id ID водителя
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	*/
	get: function(req, res){

		Drivers.findOne({id: req.param('id')}).populate('service').exec(function(err, driver){

			if (err){
				return res.notFound(err);
			}




			Tariffs.findOne({transport: driver.car}).exec(function(err, tariff){



				if (err){
					return res.notFound(err);
				}
	     if (req.customer){
			 Transport.findOne({id: driver.car}).exec(function(err, car){
			 	return res.serialize({driver: driver, tariff: tariff, car:car}, 'customer', 200);
				});
			}
			 Transport.findOne({id: driver.car}).exec(function(err, car){
				return res.serialize({driver: driver, tariff: tariff, car:car}, 'driver', 200);
				});
			});
		});
	},


	map: function(req, res){

		

		var bquery =  { "from" : 0, "size" : 9999,
			"query": {
				"filtered" : {
			        "query" : {
			            "match_all" : {}
			        },
			        "filter" : {
						and: [
						{
			        	"geo_bounding_box" : {
			                "location" : {
			                    "top" : req.param('top_left_lat'),
			                    "left" : req.param('top_left_lon'),
			                    "bottom" : req.param('btm_right_lat'),
			                    "right" : req.param('btm_right_lon')
			                }
			            }
						},
						{
											terms: {
												status: [1,2]
											}
										}
						]
			        }
			    }
			}
		};

		var not_in = req.param('not_in');

		if (!not_in){
			not_in = Array();
		}
		if (not_in.length>0){

		}

	Drivers.find({lat:{ '>': req.param('btm_right_lat'), '<': req.param('top_left_lat') }, lon:{ '<': req.param('btm_right_lon'), '>': req.param('top_left_lon') }, status:[1,2]}, function(err, found){

			//Drivers.find({id: _.pluck(response.hits.hits, '_id')}, function(err, found){

				if (err){
					return res.badRequest(err);
				}

				return res.serialize(found, 'customer', 200);
			});
		

	},

	/**
	* @api {put} /drivers/position Смена координат
	* @apiGroup Drivers
	* @apiParam {Number} lat
	* @apiParam {Number} lon
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	*
	*/
	position: function(req, res){

		Drivers.update({id: req.driver.id},

			{lat: req.param('lat'), lon: req.param('lon')}).exec(function(err, drivers){

				if (err){
					return res.badRequest(err);
				}
				if (drivers!=undefined){


	var driver = drivers[0];
					if(driver.status==2){
						var rooms = sails.sockets.rooms();
						sails.sockets.emit(rooms, 'drivers_'+driver.id,{
							id: driver.id,
							lat: driver.lat,
							lon: driver.lon
						});
Drivers.update({id: req.driver.id}, {status:2}).exec(function(err, active_drivers){return res.serialize(driver,'driver',200);});
                                         }
					else{
					var driver = drivers[0];
					var rooms = sails.sockets.rooms();
					sails.sockets.emit(rooms, 'drivers_'+driver.id,{
							id: driver.id,
							lat: driver.lat,
							lon: driver.lon
					});
Drivers.update({id: req.driver.id}, {status:1}).exec(function(err, active_drivers){return res.serialize(driver,'driver',200);});
					}
				}
		});
	},

	/**
	* @api {put} /drivers/status Смена статуса водителя
	* @apiGroup Drivers
	* @apiParam {Number} status
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	*
	*/
	status: function(req, res){

			Orders.find({driver: req.driver.id, for_now:true, status :{ '<': 100 }}, function(err, found_now_orders){

				if (err){
					return res.badRequest(err);
				}
if(found_now_orders.length)
	return res.badRequest("Вы имеете выполняемую заявку");

		Drivers.update({id: req.driver.id}, {status: req.param('status')}).exec(function(err, drivers){

				if (err){
					return res.badRequest(err);
				}
                else {
					var driver=drivers[0];
					return res.serialize({data: "OK"},'driver',200);
					}
		});
		});
	},
		/**
	* @api {get} /drivers/active/:id текущие заказы
	* @apiGroup Drivers
	* @apiParam {Number} id ID водителя
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	*/
	getActiveOrders: function(req, res){

		Drivers.findOne({id: req.param('id')}).populate('service').populate('car').exec(function(err, driver){

			if (err){
				return res.notFound(err);
			}
        Orders.find({driver:driver.id, status:50}).exec(function(err, found){

					    	return res.serialize(found, 'driver', 200);
					    });

		});
	},

	setPushToken: function(req, res){

		Drivers.update({id: req.driver.id},

			{os: req.param('os'), push_token: req.param('push_token')}).exec(function(err, drivers){

				if (err){
					return res.badRequest(err);
				}
                else {return res.serialize({data: "OK"},'driver',200);}

		});

	},
		addFake: function(req, res){
	Drivers.findOne({id: req.param('id')}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					return res.badRequest(err);
				}
                else {
					return res.serialize({data: "OK"},'driver',200);
					}
		});
	},
	addDriver: function(req, res){

	    Drivers.findOne({id: req.param('id')}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					return res.badRequest(err);
				}
                else {
				    return res.serialize({data: "OK"},'driver',200);
				}
		});

	},

	banDriver: function(req, res){

	Drivers.findOne({id: req.param('id')}).exec(function(err, driver){
		   var rooms = sails.sockets.rooms();
		if(req.param('ban')==true)
			                          sails.sockets.emit(rooms, 'driver_'+driver.id,{
			id: driver.id,
			action: "BANNED"
		    });
        else
	        sails.sockets.emit(rooms, 'driver_'+driver.id,{
			id: driver.id,
			action: "UNBANNED"
			});
		return res.serialize({data: "OK"},'driver',200);
		});
	},

	banDriversByService: function(req, res){

	Drivers.find({service: req.param('service_id')}).exec(function(err, drivers){

	var rooms = sails.sockets.rooms();
	for(i=0; i<drivers.length;i++)
								sails.sockets.emit(rooms, 'driver_'+drivers[i].id,{
									id: drivers[i].id,
									action: "BANNED"
								});


					return res.serialize({data: "OK"},'driver',200);


		});

	},
		setOffline: function(req, res){



	Drivers.findOne({id: req.param('id')}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					return res.badRequest(err);
				}
                else {
						return res.serialize(driver,'driver',200);

					}

		});

	}
};
