/**
 * CustomersController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
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
http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
});
					
									}
					
					
					
					return res.ok({msg: 'Смс с кодом отправлена на указанный номер', customer:customer.id});}
				else
				Customers.destroy({id: unproved_id}).exec(function (err){
					
					
				if(req.param('phone').substring(1,7)!='7(000)'){			
var http = require('http');
http.post = require('http-post');
http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:code, phones:req.param('phone').substring(1), charset:'utf-8' }, function(resp){
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
		Customers.find({token: token}, function(err, found){

			if (err){
				return res.badRequest(err);
			}

			if (found.length<1){

				Customers.create({token: token, region: 3, bill:0}).exec(function (err, created){

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
     *       "phone": "+78315734802"
     *       
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

                return res.serialize(updated[0],'customer2',200);
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
   
     *     }
	 *
	 * @apiParam {Number} [id] ID клиента
	 * 
	 */
	get: function(req, res){

		Customers.findOne({id: req.param('id')}).populate('cards').exec(function(err, found){
			res.serialize(found,'customer2',200);
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

	 *
	 * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "1",
     *       "phone": "+78315734802",

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

					return res.serialize(updated[0],'customer2',200);
			});
		});
	},
	/**
	 * @api {POST} /search_order/  Поиск заказа
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Поиск заказа.
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {String} city_from Город откуда
	 * @apiParam {String} city_to Город куда
	 * @apiParam {String} ticket_type Тип билета
	 *
	 
	 */
createOrder: function(req, res){

		setTimeout(function(){
			return res.json({error:'Internal server error',status:500});
		},200);
	},
/**
	 * @api {POST} /create_order/  Создать заказ
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Поиск заказа.
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {String} city_from Город откуда
	 * @apiParam {String} city_to Город куда
	 * @apiParam {String} date Дата
	 * @apiParam {String} time Время
	 *
	 
	 */
searchTicket: function(req, res){

		setTimeout(function(){
			return res.json({error:'Internal server error',status:500});
		},200);
	},

		/**
	 * @api {POST} /book_order/  Бронирование заказа
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Бронирование заказа
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {String} ticket_id id билета
	 * @apiParam {String} place_id id места
	 *
	 
	 */
blockTicket: function(req, res){

		setTimeout(function(){
			return res.json({error:'Internal server error',status:500});
		},200);
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
	 * @api {put} /customer/set_push_token Токен клиента
	 * @apiGroup Customers
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Задать координаты клиента
	 * @apiVersion 0.1.0
	 *
	 * @apiParam {Number} id ID клиента
	 */
	setPushToken: function(req, res){

		
		//var token = req.headers['auth_token'];
		//var params = req.allParams();
		//	Customers.update(
		//		{id: req.customer.id, token: token},
		//		params, 
		//		function(err, updated){
		//			 return res.ok({msg:'PAY DONE!', code: 200, err:err});
		//	});
		Customers.update({id: req.customer.id}, 

			{os: req.param('os'), push_token: req.param('push_token')}).exec(function(err, customers){

				if (err){
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
			

/*
   var path = require('path');
            var apn = require('apn');
			

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "123";
note.payload = {'messageFrom': 'Caroline'};
					
					
					
					
				

var options = {
    gateway: 'gateway.push.apple.com',
    production:false,
    cert:'./../services/keys/cert.pem',
    key:  './../services/keys/key.pem'
};

var apnsConnection = new apn.Connection(options);
 var   myDevice = new apn.Device(token);
 apnsConnection.pushNotification(note,myDevice);
   			
			*/		
			


/*			var apnTest = require('apn-test');
	

var test_message = 'Hello';
var test_options = {
	  production:false,
  cert:  require('path').resolve(sails.config.appPath, 'api/services/keys/cert.pem'),
  key: require('path').resolve(sails.config.appPath, 'api/services/keys/key.pem'),
  token: '1876893586d6cb2a270ba151e27cabe1e3d0f1ea5f38bad5357aa18c9f5e2de1'
};	
apnTest(test_message, test_options);
*/

					//return res.ok({data:require('path').resolve(sails.config.appPath, 'api/services/keys/key.pem')},200);
					}
				
		});
		
	},
	addCard: function(req, res){

		Cards.create({cardnumber:req.param('creditcardnumber'), transaction: req.param('transaction_id'), customer:req.param('cs1')}).exec(function(err, card){

				if (err){
					return res.badRequest(err);
				}
                else {return res.serialize({data: "OK"},'driver',200);}
				
		});
		
	},
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