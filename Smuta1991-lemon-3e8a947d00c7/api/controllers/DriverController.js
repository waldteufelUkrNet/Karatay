/**
 * CrewController
 *
 * @description :: Server-side logic for managing crews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const md5 = require('md5');
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
			console.log("service code ",req.param('code'))
			if (err){
				return res.notFound(err);
			}

			if (service==undefined){
				console.log('SERVICE_NOT_FOUND')
				return res.notFound({msg: 'SERVICE_NOT_FOUND',code: 404});
			}
			if (service.blocked){
				console.log('SERVICE_IS_BLOCKED')
				return res.notFound({msg: 'SERVICE_IS_BLOCKED',code: 404});
			}
			if(service.saldo<0&&((-1)*service.saldo)>service.credit){
				console.log('SERVICE_IS_OUT_OF_CREDIT_LIMIT')
				return res.notFound({msg: 'SERVICE_IS_OUT_OF_CREDIT_LIMIT',code: 404});
			}
			var crypto = require('crypto');
			var pass =  crypto.createHash('md5').update(req.param('pass')).digest('hex');
			console.log(pass)

			Drivers.findOne({callsign: req.param('callsign'), pass: pass, service: service.id}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					return res.notFound(err);
				}

				if (driver==undefined){
					console.log('USER_NOT_FOUND')
					return res.notFound({msg: "USER_NOT_FOUND", code: 404})
				}

				if (driver.blocked==true){
					console.log('USER_BLOCKED')
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


	uploadFiles: function(req, res) {

		req.file('images').upload({
			maxBytes: 50000000,
			dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/drivers')
		}, function(err, uploadedFiles) {
				if (err) return res.negotiate(err);


				async.each(['0'], function(file, callback) {
						var index = 0;

					
								var abs_path = uploadedFiles[0]['fd'];
								var img_name = abs_path.substr(abs_path.lastIndexOf('/') + 1);

						callback('uploads/drivers/' + img_name);
				}, function(path) {
						// if any of the file processing produced an error, err would equal that error
						if (err) {
							console.log('err ',err)
							return res.serialize({error: 'UPLOAD_ERROR'}, 'customer', 200);
						}

						console.log('path ',path)
						return res.ok({path: path});
				});

				
		});
},

	registrationForm: function(req, res){
			
		var http = require('http');
		http.post = require('http-post');
		var final_user_id;
		console.log(req.body)
		const {
			passport_photo, passport_reg,	dr_license_front,
			dr_license_back,	name,	last_name,	
			surname,	phone,	bank_card,	
			car_reg_front,	car_reg_back,	osago,	
			car_photo_front,	car_photo_back,	car_photo_left,	
			car_photo_right
		} = req.body;

		console.log({
			passport_photo, passport_reg,	dr_license_front,
			dr_license_back,	name,	last_name,	
			surname,	phone,	bank_card,	
			car_reg_front,	car_reg_back,	osago,	
			car_photo_front,	car_photo_back,	car_photo_left,	
			car_photo_right	
		})
		if (!passport_photo || 
			!passport_reg || 
			!dr_license_front || 
			!dr_license_back || 
			!name || 
			!last_name || 
			!surname || 
			!phone || 
			!bank_card || 
			!car_reg_front || 
			!car_reg_back || 
			!car_photo_front || 
			!car_photo_back || 
			!car_photo_left || 
			!car_photo_right 
			){
			return res.notFound({msg: 'INPUT_ERROR',code: 400});
		}
	
		 
		DriverRegistration.create({
			passport_photo, passport_reg,	dr_license_front,
			dr_license_back,	name,	last_name,	
			surname,	phone,	bank_card,	
			car_reg_front,	car_reg_back,	osago: osago || null,	
			car_photo_front,	car_photo_back,	car_photo_left,	
			car_photo_right
		}).exec(function (err, created){
			return res.serialize({status:"OK"},'driver',200);
		});
		

},

	registration: function(req, res){
			
			var http = require('http');
			http.post = require('http-post');
			var final_user_id;
			if (!req.param('phone') || !req.param('name') || !req.param('reg_number') || !req.param('car_type')){
				return res.notFound({msg: 'INPUT_ERROR',code: 400});
			}
			var crypto = require('crypto');
			 
		
			Drivers.find({phone_num:req.param('phone')}).exec(function(err, old_drivers){
				if (old_drivers.length){
					final_user_id = old_drivers[0].id;
					//return res.notFound({msg: "USER_ALREADY_EXISTS", code: 400})
				}
				
					 
			var proto_pass="00000";
			if(req.param('phone').substring(1,7)!='7(000)' && req.param('phone').substring(1,5)!='7000' && req.param('phone').substring(0,4)!='7000' && req.param('phone').substring(0,6)!='7(000)'){	
				proto_pass = Math.round(1000 + Math.random() * (99999 - 10000));
				http.post('http://smsc.ru/sys/send.php', { login:'apptrucktaxi', psw:'paSSword1751700', mes:proto_pass, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
				});
			}
			
			console.log("pass ", proto_pass);
			
			
			var pass =  crypto.createHash('md5').update(proto_pass+"").digest('hex');
            
			if(!final_user_id)
				Drivers.create({
					pass: pass,
					name:req.param('name'),
					phone_num:req.param('phone'),
					callsign:"0000",
					status:0,
					email:"",
					blocked:false,
					block_reason:"",
					lat: "0.00000000",
					lon:"0.00000000",
					ratingup:0,
					ratingdown:0,
					car:req.param('car_type'),
					reg_number: req.param('reg_number'),
					region_number:"1",
					service: 1
				}).exec(function (err, created){
					Drivers.update({id: created.id},{callsign: 10000+created.id+""}).exec(function(err, drivers){
						
						return res.serialize({status:"OK"},'driver',200);
						
					});
				});
			else
				Drivers.update({id: final_user_id},{
					pass: pass,
					name:req.param('name'),
					phone_num:req.param('phone'),
					car:req.param('car_type'),
					reg_number: req.param('reg_number')
          				}).exec(function(err, drivers){
						
						return res.serialize({status:"OK"},'driver',200);
						
					});


			
			});
			

	},
	
	login_with_phone: function(req, res){

			console.log("req inp")
			console.log(req.param('phone'))
			console.log(req.param('pass'))
			if (!req.param('phone') || !req.param('pass') ){
				return res.notFound({msg: 'INPUT_ERROR',code: 400});
			}

		console.log("LOGIN WITH PHONE USING PARAMS ",req.param('pass'));
			
			var crypto = require('crypto');
			var pass =  crypto.createHash('md5').update(req.param('pass')).digest('hex');
			console.log(pass)
			Drivers.find({phone_num: req.param('phone')}).exec(function(err, drivers){
				console.log(drivers)
			})
			Drivers.findOne({phone_num: req.param('phone'), pass: pass}).populate('service').populate('car').exec(function(err, driver){

				if (err){
					console.log(err)
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

					return res.serialize({data: driver,	access: created},'driver',200);
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
	get: async function(req, res){

		let driver = await Drivers.findOne({id: req.param('id')}).populate('service');
		if(!driver)
			return res.ok({driver:null});
		let tariff = await Tariffs.findOne({transport: driver.car});
		let transport = await Transport.findOne({id: driver.car});
		let loader_tariff = await LoaderTariffs.findOne({
			region: driver.service.region
		})
		if (req.customer)
			return res.serialize({driver: driver, tariff: tariff, car:transport, loader_tariff}, 'customer', 200);

		return res.serialize({driver: driver, tariff: tariff, car:transport, loader_tariff}, 'driver', 200);
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

	/**
     * @api {get} /drivers/individual_driver/transactions История транзакций индивидуального водителя
     * @apiGroup Drivers
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить историю транзакций
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     [
				{
						"id": 2,
						"value": 433,
						"createdAt": "2021-05-02T21:00:00.000Z",
        		"order": 8647
				},
				{
						"id": 1,
						"value": -234,
						"createdAt": "2021-05-12T21:00:00.000Z"
				}
		]
     */
    transactions: async function(req, res){
			if(!req.driver || !req.driver.service || !req.driver.service.is_individual_driver)
				return res.badRequest("IS_NOT_INDIVIDUAL_DRIVER");

			console.log(req.driver)

			try{ 
				let querystr = {driver: req.driver.id};

			if(req.param('date_from') && req.param('date_to')){
				var start = new Date(req.param('date_from'));
				start.setUTCHours(0,0,0,0);

				var end = new Date(req.param('date_to'));
				end.setUTCHours(23,59,59,999);
				querystr['createdAt'] =  { '>': 	start, '<': 	end }
			}
			var results  = await IndividualDriverTransactions.find(querystr).sort('id DESC');
			//new Date('2018-08-24
					return res.serialize({ balance: req.driver.service.saldo, list: results }, 'driver', 200)
		} catch(e) {
			return res.badRequest("input error");
		}
		
	},
	/**
	* @api {post} /drivers/map Водители на карте
	* @apiGroup Drivers
	* @apiParam {Number} top_left_lat Широта верхней левой точки карты
	* @apiParam {Number} top_left_lon Долгота верхней левой точки карты
	* @apiParam {Number} btm_right_lat Широта нижней правой точки карты
	* @apiParam {Number} btm_right_lon Долгота нижней правой точки карты
	* @apiParam {String[]} not_in Массив ID исключающихся из выдачи
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	*
	*/
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
console.log('driver sent location');
		Drivers.update({id: req.driver.id},{lat: req.param('lat'), lon: req.param('lon')}).exec(function(err, drivers){

				if (err){
					console.log('driver update error',err);
					return res.badRequest(err);
				}
				// console.log('driver update success');
				if (drivers!=undefined){
 console.log('driver update success');
    	var driver = drivers[0];
		var rooms = sails.sockets.rooms();
						sails.sockets.emit(rooms, 'drivers_'+driver.id,{
							id: driver.id,
							lat: driver.lat,
							lon: driver.lon
						});
				//	if(driver.status==2){		
                    if(driver.active_order) {
						Orders.findOne({id: driver.active_order}).exec(function(err, order) {
                if (err) { console.log('order find error',err); return res.badRequest(err); }
				console.log('order find success (for ordertracking) ', order.id);
				if(order.status <90 && order.status > 60) {
					 Ordertracking.create({order_id:order.id, lat:driver.lat, lon:driver.lon}).exec(function(err, track) {
						 console.log('track create success for order ', order.id);
						 if(err)console.log('track create error',err);
						return res.serialize(driver,'driver',200);
						});
						}
               else{
			   return res.serialize(driver,'driver',200);}
      					});					
					}
									//	 }else{
//Drivers.update({id: req.driver.id}, {status:1}).exec(function(err, active_drivers){return res.serialize(driver,'driver',200);});
				//	}
					
					
					
					
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

			console.log(err)
			if (err){
				return res.notFound(err);
			}
        Orders.find({driver:driver.id, status:  ['50', '60', '70', '80', '90'] }).exec(function(err, found){
								console.log('2 ',err)
					    	return res.serialize(found, 'driver', 200);
					    });

		});
	},


	addUnitellerBalance: function(req, res) {
				if(!req.driver)
				req.driver = {
					id: 9
				}

				if (!req.driver){
						return res.view('404')
				}

				
				if(!req.param('summ') || !parseInt(req.param('summ')))
					return res.view('404')
			
					var randomstring = require("randomstring");
		
				const OrderID = 'drbal_'+req.driver.id+'_'+randomstring.generate(),
				UPID = '00028513',
				Subtotal_P = parseFloat(req.param('summ')).toFixed(2),
				Lifetime = '',
				password = 'efepspUXil08RnMpdT1MHPr7danSmT9jTKKKb7451ExtTRMcHxLGcbi5MHaW8BiqbV4EJ9k2VdNCsgfD',
				CallbackFields = 'AcquirerID Card_IDP CardNumber Customer_IDP Total';
				
				let Signature = md5(UPID) + 
					'&' + md5(OrderID) +
					'&' + md5(Subtotal_P) + '&' + md5('') + '&' + md5('') + '&' + md5(Lifetime) + '&' + md5('') + '&'
					+ md5('') + '&'
					+ md5('') + '&'
					+ md5('') + '&' +
					md5(password);
					console.log("sig 1 ",Signature )
					Signature = md5(Signature)
					console.log("sig 2 ",Signature )
					Signature = Signature.toUpperCase();
					console.log("sig 3 ",Signature )
				
					return res.view('uniteller/order_payment', {
						UPID,
						OrderID,
						Subtotal_P,
						Lifetime,
						Signature,
						CallbackFields
				})


				// return res.view('cloudwatch/driver_balance', {
				// 		account_id: 'driver_' + req.driver.id,
				// 		summ: req.param('summ')
				// })
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
	sails.sockets.emit(rooms, 'driver_'+drivers[i].id,{id: drivers[i].id, action: "BANNED"});
	return res.serialize({data: "OK"},'driver',200);});
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
