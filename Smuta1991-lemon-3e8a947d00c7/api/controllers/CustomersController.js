/**
 * CustomersController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const axios = require('axios');
const md5 = require('md5');
const sha256 = require('js-sha256').sha256;
const moment = require('moment-timezone');

module.exports = {

	/**
	 * @api {put} /customer/report Оставить жалобу
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiDescription Оставить жалобу
	 * @apiParam {String} reason Причина жалобы
	 * @apiParam {String} text Текст жалобы
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
		* 		"id": 1,
		*			"reason": "12345",
		*			"text": "test text"
		*	}
	 */
	createReport: function(req, res){
		
		if(!req.customer.id || !req.param('reason') || !req.param('text') ){
			return res.notFound({msg: 'INPUT_ERROR', code: 404});
		}

		Reports.create({customer: req.customer.id, reason: req.param('reason'), text:req.param('text')}).exec(function (err, created){
			return res.serialize(created,'customer',200);
		})

		
	},
		 
	/**
	 * @api {post} /customer/code Получить код
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiDescription Получить код
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "msg": "Смс с кодом отправлена на указанный номер"
     *     }
	 * @apiParam {String} phone Номер телефона
	 */
	getCode: function(req, res){

		// generate code
		var code = '0000';
		if(req.param('phone').substring(1,7)!='7(000)'){code=Math.round(1000 + Math.random() * (9999 - 1000));}
Customers.find({phone: req.param('phone')}, function(err, found){
var unproved_id=req.customer.id;
			if (err){
				return res.badRequest(err);
			}
			if (found.length<1){
				
			
		Customers.update(
			{id: req.customer.id},
			{phone: req.param('phone'), proof_code: code}, 
			function(err, updated){
		if(req.param('phone').substring(1,7)!='7(000)'){			
var http = require('http');
http.post = require('http-post');
http.post('http://smsc.ru/sys/send.php', { login:'apptrucktaxi', psw:'paSSword1751700', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
});
}
return res.ok({msg: 'Смс с кодом отправлена на указанный номер'});


				
			}
			);} else if(found.length>1){
				var customer=found[0];
					Customers.update(
			{id:customer.id},
			{token:req.customer.token, proof_code: code}, 
			function(err, updated){
Customers.destroy({id: unproved_id}).exec(function (err){return res.ok({msg: 'Смс с кодом отправлена на указанный номер', customer:customer.id});});
				
			}
			);
				
				
			}else if(found.length==1){
				var customer=found[0];
					Customers.update(
			{id:customer.id},
			{token:req.customer.token, proof_code: code}, 
			function(err, updated){
				if(customer.id==unproved_id){
					
					
					
									if(req.param('phone').substring(1,7)!='7(000)'){			
var http = require('http');
http.post = require('http-post');
http.post('http://smsc.ru/sys/send.php', { login:'apptrucktaxi', psw:'paSSword1751700', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
});
					
									}
					
					
					
					return res.ok({msg: 'Смс с кодом отправлена на указанный номер', customer:customer.id});}
				else
				Customers.destroy({id: unproved_id}).exec(function (err){
					
					
				if(req.param('phone').substring(1,7)!='7(000)'){			
var http = require('http');
http.post = require('http-post');
http.post('http://smsc.ru/sys/send.php', { login:'apptrucktaxi', psw:'paSSword1751700', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
});
}
 
return res.ok({msg: 'Смс с кодом отправлена на указанный номер', customer:customer.id});


});
 //res.ok({msg: 'Смс с кодом отправлена на указанный номер', customer:customer.id});
				
			}
			);
				
				
			}
		
});
	},

    /**
     * @api {get} /customer/transactions История транзакций
     * @apiGroup Customers
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить историю транзакций
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "id": "1",
     *       "value": "125",
     *       "createdAt": "2015-09-13T22:35:10.780Z",
     *       "order": {
     *          "id": "1",
     *          "from": "Место1',
     *          "to: "Место2",
     *          "description": "Доп описание",
     *          "additional_phone": "Доп. телефон",
     *          "start_lat": "0.000",
     *          "start_lon": "0.000",
     *          "finish_lat": "0.000",
     *          "finish_lon": "0.000",
     *          "starttime": "2015-09-13T22:35:10.780Z",
     *          "laststatus": "20",
     *          "paytype": "1",
     *          "for_now": "false",
     *          "need_boxes": "true",
     *          "need_loader": "true",
     *          "moving_apartments": "текст",
     *          "photos": [],
     *          "status": 10
     *       },
     *       ...
     *     }]
     */
    transactions: function(req, res){

        var query  = CustomerTransactions.find({customer: req.customer.id});
        query.sort('id DESC');

        query.exec(function (err,results){

            if (err){
                return res.badRequest(err);
            }

            return res.serialize(results, 'customer', 200)
        });
    },

	    /**
     * @api {get} /company_customer/finance_transactions История финансовых транзакций
     * @apiGroup Customers
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить историю транзакций
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [ {
     *"id": 13,
     * "value": -100,
     *  "createdAt": "2017-05-17T04:42:02.000Z",
     * "comment": "test"
     * },
     *       ...
     *     ]
     */
    financeTransactions: function(req, res){

        var query  = CompanyTransactions.find({customer: req.customer.id});
        query.sort('id DESC');

        query.exec(function (err,results){

            if (err){
                return res.badRequest(err);
            }

            return res.serialize(results, 'customer', 200)
        });
    },
	/**
	 * @api {get} /customer/register Регистрация
	 * @apiGroup Customers
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *       "id": "1",
     *       "token": "HVOMXMSIBMDJLVSMQGHMX7AJ2UBP2YEY3UPWYHZ6KI22WY3LS6HKIZBYYG4BSR6L5GHUZOFRNW7"
     *     }
	 * 
	 * @apiDescription Регистрация нового клиента
	 *
	 * @apiVersion 0.1.0
	 */
	getToken: function(req, res){

		var randtoken = require('rand-token').generator({chars: 'base32'});
		
		var token = randtoken.generate(75);
console.log('track 1');
		Customers.find({token: token}, function(err, found){

			if (err){

				return res.badRequest(err);
			}

			if (found.length<1){

				Customers.create({token: token, region: 8, bill:0, os: req.headers['os'], push_token: ''}).exec(function (err, created){

					if (err){
						return res.badRequest(err);
					}

					return res.ok({id: created.id, 
						token: created.token},201);
				});
				
			}
		});
	},

		/**
	 * @api {put} /company_customer/discard Внешнее пополнение счета
	 * @apiGroup Customers
	 * @apiVersion 0.1.0
	 * @apiDescription Подтвердить н. телефона
	 * @apiParam {String} auth_token Токен пользователя
	 * @apiParam {String} key Ключ доступа
	 * @apiParam {Integer} customer_id ID пользователя
	  * @apiParam {Integer} value сумма пополнения
	  * @apiParam {String} comment Комментарий
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     * "data": "OK"
      *   }
	 */
	outsourceTransaction: function(req, res){
 if(!req.param('key') || !req.param('auth_token') || !req.param('customer_id') || !req.param('value') ){
            	return res.notFound({msg: 'INPUT_ERROR', code: 404});
            }
			else
        Customers.findOne({token: req.param('auth_token'), id: req.param('customer_id')}, function (err, found_customer){

            if (!found_customer || found_customer==undefined){

            	return res.notFound({msg: 'NO_SUCH_USER', code: 404});
            }
			else
        DeveloperKeys.findOne({value: req.param('key')}, function (err, dev_key){
			  if (err){
                    console.log(err);
                }
			if (!dev_key || dev_key==undefined || dev_key.blocked){

            	return res.notFound({msg: 'ERROR_DEV_KEY', code: 404});
            }
			else{
				
				var final_bill=found_customer.bill+req.param('value');
		Customers.update({id: found_customer.id}, {bill:final_bill}).exec(function(err, updated_customer){
				if (err){
					return res.badRequest(err);
				}else{
					 var company_finance_report={};
		    company_finance_report.customer=req.param('customer_id');
			company_finance_report.value=req.param('value');
            company_finance_report.summ=final_bill;
			if(req.param('comment'))
			company_finance_report.comment=req.param('comment');
		    company_finance_report.dev_key_id=dev_key.id;
			CompanyTransactions.create(company_finance_report).exec(function (err, transact){

					if (err){
						console.log('ERROR:'+err);
						return res.badRequest(err);
					}
					console.log('Company transaction '+transact.id+' created');
					return res.serialize({data: "OK"},'driver',200);
				});
					
				}
				});
			}
				
				
		});
        });
	},

	
	/**
	 * @api {put} /customer/approve Подтверждение н. телефона
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiDescription Подтвердить н. телефона
	 * @apiParam {String} phone Номер телефона
	 * @apiParam {String} code Пароль из СМС
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "1",
     *       "phone": "+78315734802",
     *       "company_phone": "+78315734802",
     *       "company_name": "Co & Co",
     *       "fax": "+78315734802",
     *       "is_company": true
     *     }
	 */
	approve: function(req, res){

        Customers.findOne({phone: req.param('phone'), proof_code: req.param('code')}, function (err, found){

            var params = {proof_code: null, proved: true};

            if (found!=undefined){

                if (found.id!=req.customer.id){
                    for (key in found){
                        if (['id','proved','proof_code','token'].indexOf(key)<0 && found[key]!="" && found[key]!=null){
                            params[key] = found[key];
                        }
                    }
                    Customers.destroy({id: found.id}).exec(function (err){});
                }
                
            }else{
            	return res.notFound({msg: 'CODE_ISNT_CORRECT', code: 404});
            }

            Customers.update({id: found.id, phone: req.param('phone'), proof_code: req.param('code')}, params, function(err, updated){

                if (err){
                    return res.notFound(err);
                }

                if (updated=='undefined'){
                    return res.notFound({msg: 'PROFILE_NOT_FOUND', code: 404});
                }

                return res.serialize(updated[0],'customer',200);
            });
            
        });
	},


	/**
     * @api {get} /customer/tariffs Получить тарифы по текущему региону заказчика
     * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить тарифы
     */
    getTarrifs: function(req, res){

			var token = req.headers['auth_token'];
			//	var params = req.allParams();
		
			Customers.findOne({token: token}).exec(function(err, customer){

				if (err){
					return res.notFound(err);
				}
	
				if (customer=='undefined')
					return res.notFound({msg: 'Профиль не найден'});
				if(!customer.region)
					return res.notFound({msg: 'Регион не найден'});

			Tariffs.find({region: customer.region, is_active: true}).populate('transport').exec(function(err, data){
					console.log(err)
					return res.serialize(data, 'customer', 200);
			});
		});
	},

		/**
     * @api {get} /customer/loader_tariffs Получить тарифы по текущему региону заказчика
     * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить тарифы
     */
    getLoaderTarrifs: function(req, res){

			var token = req.headers['auth_token'];
			//	var params = req.allParams();
		
			Customers.findOne({token: token}).exec(function(err, customer){
			
				if (err){
					return res.notFound(err);
				}
	
				if (customer=='undefined')
					return res.notFound({msg: 'Профиль не найден'});
				if(!customer.region)
					return res.notFound({msg: 'Регион не найден'});

				LoaderTariffs.find({region: customer.region, is_active: true}).exec(function(err, data){
					
					return res.serialize(data, 'customer', 200);
			});
		});
	},

	/**
	 * @api {get} /customer/:id Получение профиля
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiDescription Получение профиля клиента
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "1",
     *       "phone": "+78315734802",
     *       "company_phone": "+78315734802",
     *       "company_name": "Co & Co",
     *       "fax": "+78315734802",
     *       "is_company": true
     *     }
	 *
	 * @apiParam {Number} [id] ID клиента
	 * 
	 */
	get: function(req, res){

		Customers.findOne({id: req.param('id')}).populate('cards').exec(function(err, found){
			res.serialize(found,'customer',200);
		});
	},





		/**
	 * @api {put} /customer/set_region Редактирование текущего региона
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Редактирование текущего региона клиента.
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {Number} region ID региона
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "1",
     *       "phone": "+78315734802",
     *       "company_phone": "+78315734802",
     *       "company_name": "Co & Co",
     *       "fax": "+78315734802",
     *       "is_company": true
     *     }
	 */
	setRegion: function(req, res){

		var token = req.headers['auth_token'];
	//	var params = req.allParams();

		Customers.findOne({token: token}).exec(function(err, customer){

			if (err){
				return res.notFound(err);
			}

            if (customer=='undefined'){
                return res.notFound({msg: 'Профиль не найден'});
            }

			var region = req.param('region');

			Customers.update(
				{id: customer.id, token: token},
				{region: region}, 
				function(err, updated){

                    if (err){
                        return res.badRequest();
                    }

					return res.serialize(updated[0],'customer',200);
			});
		});
	},












	/**
	 * @api {put} /customer/:id Редактирование профиля
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Редактирование профиля клиента.
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {Number} id ID клиента
	 * @apiParam {String} phone Телефон
	 * @apiParam {String} fax Факс
	 * @apiParam {Number} company_name Название компании
	 * @apiParam {Boolean} is_company Юр/Физ лицо
	 * @apiParam {Number} region ID региона
	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "1",
     *       "phone": "+78315734802",
     *       "company_phone": "+78315734802",
     *       "company_name": "Co & Co",
     *       "fax": "+78315734802",
     *       "is_company": true
     *     }
	 */
	edit: function(req, res){

		var token = req.headers['auth_token'];
		var params = req.allParams();

		Customers.findOne({id: params.id, token: token}).exec(function(err, customer){

			if (err){
				return res.notFound(err);
			}

            if (customer=='undefined'){
                return res.notFound({msg: 'Профиль не найден'});
            }

			var phone = req.param('phone');

			if (phone && customer.phone && phone!=customer.phone){
				proved = false;
				params['proved'] = false;
			}

			Customers.update(
				{id: params.id, token: token},
				params, 
				function(err, updated){

                    if (err){
                        return res.badRequest();
                    }

					return res.serialize(updated[0],'customer',200);
			});
		});
	},

	/**
	 * @api {put} /customer/:id/position Координаты клиента
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Задать координаты клиента
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {Number} id ID клиента
	 * @apiParam {Number} lat Широта
	 * @apiParam {Number} lon Долгота
	 */
	position: function(req, res){

		var token = req.headers['auth_token'];
		var params = req.allParams();
		for (name in params){
			if (params[name]==0 || params[name]==null){
				delete params[name];
			}
		}

		Customers.findOne({id: params.id, token: token}).exec(function(err, customer){

			if (err){
				return res.notFound(err);
			}

			Customers.update(
				{id: params.id, token: token},
				params, 
				function(err, updated){
					return res.serialize(updated[0],'customer',200);
			});
		});

	},
	
	    /**
     * @api {get} /company_customer/order_track/:order_id Получить маршрут передвижения авто по заказу
     * @apiGroup CompanyCustomers
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Получить маршрут передвижения авто по заказу
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *  [
   * {
    *    "lat": 47.9668,
    *    "lon": 37.7767
   * },
   * {
   *     "lat": 47.9668,
   *     "lon": 37.7767
   * },
   * {
   *     "lat": 47.9668,
   *     "lon": 37.7767
   * },
   *     ....
   *  ]
     */
    getOrderTrack: function(req, res){
		if(!req.customer)
			 return res.badRequest({error:"NO_SUCH_USER"});
		 else
 Ordertracking.find({order_id: req.param('order_id')}).exec(function(err, track_dots) { 
if(err)
	console.log(err);
console.log(track_dots);
 return res.serialize(track_dots, 'customer', 200)
 
 });
       
    },
	getOrderTrackOnMap: function(req, res){
		var jwt = require('jwt-simple');
		var jwt_secret = 'TZE2RW8PIOSVBY20XYE8WIZ9BACISYPA7CG7SJAI8SA9E28DZOPP101366C58671NY8YKH10ACMKJLDJMIILLS10F8KL1YX7TDHWCSGEG79PK9O18MVOJ9CLKNMCOLLQ';
			 if(!req.param('order_id')) return res.view('404');
			 else{
		var criteria = jwt.decode(req.param('order_id'), jwt_secret,true);
		 Orders.findOne(criteria).exec(function(err, order) {
			 if(err || !order) return res.view('404');
			 else
	Ordertracking.find({order_id: order.id}).exec(function(err, track_dots) { 
if(err)
	console.log(err);
var result_dots=[];
track_dots.forEach(function(one){
	result_dots.push({lat:one.lat, lng:one.lon });
	
});
	

          return res.view('map',{
                dots: result_dots
            });
 //return res.serialize(track_dots, 'customer', 200)
 
 });
       });  
			 }
    },
sendCompanyBillAddedEmail: function(req, res){
	NotificationService.sendCustomerEmail("COMPANY_BILL_RISE", {
                                            user_id: req.param('user_id'), summ:req.param('summ')
                                        }, function(r) {
											return res.ok({status:"OK"}, 200);
										});
},	
sendTechEmail: function(req, res){
	NotificationService.sendTechEmail(req.param('type'),req.param('options') , function(r) {
		return res.ok({status:"OK"}, 200);
	});
},	



     /**
	 * @api {put} /customer/set_push_token Токен клиента
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Задать координаты клиента
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {Number} id ID клиента
	 */
	setPushToken: function(req, res){
		Customers.update({id: req.customer.id}, 

			{os: req.param('os'), push_token: req.param('push_token')}).exec(function(err, customers){

				if (err){
					console.log(err)
					return res.badRequest(err);
				}
                else {return res.serialize({data: "OK"},'driver',200);}
				
		});
		
	},
sendPush: function(req, res){

		
		Customers.findOne({id: req.param('customer')}

			).exec(function(err, target_customer){

		
				if (err){
					return res.badRequest(err);
				}
                else {
					
					
					var token = target_customer.push_token+'1';
					var push_type=target_customer.os;
					 var title='К сожалению мы не смогли найти авто по Вашей заявке.';
				
					  var push=require("./../services/pushCustomer.js"); //return res.serialize({data: "OK"},'driver',200);
					  
  push.sendMessage(push_type,token,title,'body', function(err, result) {
		if (err){
					return res.badRequest(err);
				}
		 return res.serialize({data: "OK"},'driver',200);
		
      });
					}
				
		});
		
	},


	addCard: async function(req, res) {
		console.log("test ", req.customer)
		var randomstring = require("randomstring");
		
				if (!req.customer)
						req.customer = {
								id: 1206
						}
				if (!req.customer){
						return res.view('404')
				}

				const OrderID = 'ncard_'+req.customer.id+'_'+randomstring.generate(),
				UPID = '00028513',
				Subtotal_P = '1.00',
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

 },


 recurrent: async function(req, res) {
	console.log("test ", req.customer)
	var randomstring = require("randomstring");
	
			if (!req.customer)
					req.customer = {
							id: 1206
					}
			if (!req.customer){
					return res.view('404')
			}

			const Order_IDP = randomstring.generate(),
			Shop_IDP = '00028513',
			Subtotal_P = '3.00',
			Parent_Order_IDP = 'brrse6H5dDiihqRE3Z1eRUoEaaeumQ8b',
			password = 'efepspUXil08RnMpdT1MHPr7danSmT9jTKKKb7451ExtTRMcHxLGcbi5MHaW8BiqbV4EJ9k2VdNCsgfD',
			CallbackFields = 'AcquirerID Card_IDP CardNumber Customer_IDP Total';
			
			let Signature = md5(Shop_IDP) + 
				'&' + md5(Order_IDP) +
				'&' + md5(Subtotal_P) + 
				'&' + md5(Parent_Order_IDP) + 
				'&' + md5(password);
				console.log("sig 1 ",Signature )
				Signature = md5(Signature)
				console.log("sig 2 ",Signature )
				Signature = Signature.toUpperCase();
				console.log("sig 3 ",Signature )
			
				const data = 	{
					Shop_IDP,
					Order_IDP,
						Subtotal_P,
						Parent_Order_IDP,
						CallbackFields,
						URL_RETURN: 'https://google.com',
						Signature
					}
					const body = new URLSearchParams(data);
		
					const response = await axios.post(
						'https://wpay.uniteller.ru/recurrent/',
						body
				);

		console.log(response)
		return res.ok('test')
		
},


	// addCard: function(req, res){

	// 	Cards.create({cardnumber:req.param('creditcardnumber'), transaction: req.param('transaction_id'), customer:req.param('cs1')}).exec(function(err, card){

	// 			if (err){
	// 				return res.badRequest(err);
	// 			}
  //               else {return res.serialize({data: "OK"},'driver',200);}
				
	// 	});
		
	// },
	removeCard: function(req, res){

		Cards.destroy({id:req.param('id')}).exec(function(err, customers){

				if (err){
					return res.badRequest(err);
				}
                else {return res.serialize({data: "OK"},'driver',200);}
				
		});
		
	},
	getCompanyFinanceList: function(req, res){

		
		Customers.findOne({id:req.param('customer')}

			).exec(function(err, customer){

				if (err){
					return res.badRequest(err);
				}
                else {
				
						var rez=[];
					Orders.find({customer: customer.id, paytype:3, status:100}

			).exec(function(err, orders){	
			if (err){
					return res.badRequest(err);
				}
		
				orders.forEach(function(item, i, orders) {
					
					var summ=item.inside_price+item.outside_price;
rez.push({order:item.id, summ:summ, time:item.updatedAt});
});
			return res.ok(rez);	
					
					});
					
				}
		});
		
	}
};