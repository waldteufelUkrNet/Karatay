/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	/**
	 * @api {post} /orders/create Создание заказа
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiDescription Создание заказа
	 *
	 * @apiParam {String} from Точка отправлния (адрес)
	 * @apiParam {String} to Точка прибытия (адрес)
	 * @apiParam {String} description Дополнительное описание
	 * @apiParam {Number} start_lat Широта (Координаты места отправления)
	 * @apiParam {Number} start_lon Долгота (Координаты места отправления)
	 * @apiParam {Number} finish_lat Широта (Координаты места прибытия)
	 * @apiParam {Number} finish_lon Долгота (Координаты места прибытия)
	 * @apiParam {String} additional_phone Дополнительный н. телефона
	 * @apiParam {Number} paytype Тип оплаты
	 * Коды оплаты:
	 * <ul>
	 * <li>1 - наличный расчет</li>
	 * <li>2 - безналичный расчет</li>
	 * <li>3 - расчет по счету предприятия ( только для юр. лиц)</li>
	 * </ul>
	 * @apiParam {Number} cartype Тип авто
	 * @apiParam {Boolean} [for_now] На сейчас
	 * @apiParam {Boolean} [need_boxes] Нужны коробки
	 * @apiParam {Boolean} [need_loader] Нужен грузчик
	 * @apiParam {String[]} services  Массив с ID служб
	 * @apiParam {String} [moving_apartments] Комментарии по переезду
	 * @apiParam {String} [starttime] Время выполнения 2015-09-13T22:35:10.780Z
	 *
	 * @apiVersion 0.1.0
	 */
	create: function(req, res){

		var new_order_params = req.allParams();

		for (name in new_order_params){

			if (new_order_params[name]==""){

				delete new_order_params[name];
			}else{

				if (name=='starttime'){
					new_order_params[name] = new Date(new_order_params[name]);
				}
			}
		}
		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
		  host: 'localhost:9200'
		});

		new_order_params['customer'] = req.customer.id;
		new_order_params['status'] = 20; // Waiting for execute
		new_order_params['round'] = 1;

		var services = new_order_params['services'];
		delete new_order_params['services'];

		async.waterfall([
			function(callback){

				Orders.create(new_order_params).exec(function (err, created){

					if (err){
						return callback(err);
					}
					console.log('start of first circle order #'+created.id);

					callback(null, created);
				});
			},function(new_order, callback){

				Customers.update({id: req.customer.id}, {active_order: new_order.id}, function(err, customer){

					if (err){
						return callback(err);
					}
					callback(null, new_order);
				});
			},function(new_order, callback){

			if(!new_order.finish_lat || !new_order.finish_lon){
			new_order.finish_lat=0;
			new_order.finish_lon=0;
			}
				// Add order to index
				client.create({
				  index: 'movamba',
				  type: 'orders',
				  id: new_order.id,
				  body: {
				  	id: new_order.id,
				  	from: new_order.from,
				  	to: new_order.to,
				  	transport: new_order.cartype,
				  	status: new_order.status,
				  	services: services,
				  	location: {
				  		lat: new_order.start_lat,
				  		lon: new_order.start_lon,
				  	},
				  	finish_at: {
				  		lat: new_order.finish_lat,
				  		lon: new_order.finish_lon
				  	},
				  	round: new_order.round,
				    counter: 1
				  }
				}, function (err, response) {

					if (err){
						return callback(err);
					}

					callback(null, new_order);
				});
			}, function(new_order, callback){

				RegionSettings.findOne({region: req.customer.region.id}, function(err, settings){

					if (err){
						return callback(err);
					}

					return callback(null, new_order, settings);
				});
			}], function (err, order, settings) {
		    
			    if (err){
	    			return res.badRequest(err);
	    		}

	    		async.waterfall([

					function(callback){

						setTimeout(function(){
							console.log('end of first circle order #'+order.id);

							Orders.update({id: order.id, status: 20, round: 1},{status: 30, round: 2}).exec(function(err, orders){

								if (err){
									return callback(err);
								}

								if (orders.length<1){
									return callback({msg: 'Order not found', code: 404});
								}

								console.log('start of second circle order #'+order.id);

								order = orders[0];

								var rooms = sails.sockets.rooms();
								sails.sockets.emit(rooms, 'orders_'+order.id,{
									id: order.id,
									status: order.status
								});

								// Update order to index
								client.update({
								  index: 'movamba',
								  type: 'orders',
								  id: order.id,
								  body: {
								  	doc: {
								  		status: order.status,
								  		round: order.round,
									    counter: 1
								  	}
								  }
								},function (err, response){

									console.log('update index of order #'+order.id);
									if (err){
										return callback(err);
									}

									callback(null, order, settings);
								});
							});

						}, settings.first_circle_time*60*1000);
					},
					function(order, settings, callback){

						setTimeout(function(){

							console.log('end of second circle for order #'+order.id);

							Orders.update({id: order.id, status: 30, round: 2},{status: 40, round: 0}).exec(function(err, orders){

								if (err){
									return callback(err);
								}

								if (orders.length<1){
									return callback({msg: 'Order not found', code: 404})
								}

								order = orders[0];

								console.log('order #'+order.id+' is free');

								var rooms = sails.sockets.rooms();
								sails.sockets.emit(rooms, 'orders_'+order.id,{
									id: order.id,
									status: order.status
								});

								// Update order to index
								client.update({
								  index: 'movamba',
								  type: 'orders',
								  id: order.id,
								  body: {
								  	doc: {
								  		status: order.status,
								  		round: order.round,
									    counter: 1
								  	}
								  }
								}, function (err, response) {
									console.log('update index of order #'+order.id);
									if (err){
										return callback(err);
									}
									callback(null, order, settings);
								});
							});

						}, settings.second_circle_time*60*1000);

					},
					function (order, settings, callback){

						setTimeout(function(){

							Orders.update({id: order.id, status: 40, round: 0},{status: 110}).exec(function(err, orders){

								if (err){
									return callback(err);
								}

								if (orders.length<1){
									return callback({msg: 'Order not found', code: 404})
								}

								order = orders[0];

								console.log('order #'+order.id+' closed, driver not found');

								var rooms = sails.sockets.rooms();
								sails.sockets.emit(rooms, 'orders_'+order.id,{
									id: order.id,
									status: order.status
								});

								// Remove order index
								client.delete({
								  index: 'movamba',
								  type: 'orders',
								  id: order.id,
								}, function (err, response) {
									console.log('index of order #'+order.id+' removed');
									if (err){
										return callback(err);
									}
									callback(null, order, settings);
								});

							});

						}, settings.free_time_for_order*60*1000);

					}], function(err, result){

						if (err){
							console.log(err);
							return err;	
						}
						console.log(result);
						return result;
					}
				);

	    		return res.serialize(order,'customer',201);
	    	    }
	    	);
	},

	/**
	 * @api {post} /orders/:id/uploads Фото к заказу
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiParam {Number} id ID заказа
	 * 
	 * @apiVersion 0.1.0
	 * @apiDescription Загрузка фотографий к заказу <br>
	 * Пример запроса через CURL: <bt>
	 * <code>curl -X POST -H "auth_token: ..." "http://[host]:[port]/api/orders/1/uploads" <br>
	 * -F images=@"/.../photo1.jpg" -F images=@"/.../photo2.jpg" -F images=@"/.../photo3.jpg" </code>
	 */
	uploadFiles: function(req, res){

		Customers.findOne({token: req.headers['auth_token']}, function(err, customer){

			if (err){
				return res.notFound(err);
			}

			Orders.findOne({id: req.param('id'), customer: customer.id},function(err, order){

				if (err){
					console.log('order error '+order);
					return res.notFound(err);
				}

				req.file('images').upload({
						dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/orders')
					},function (err, uploadedFiles) {
					  if (err) return res.negotiate(err);


					async.each(uploadedFiles, function(file, callback){
						var index = 0;

						while (index < uploadedFiles.length){
						  	var abs_path = uploadedFiles[index]['fd'];
						  	var img_name = abs_path.substr(abs_path.lastIndexOf('/')+1);
						  	OrdersPhoto.create({path: 'uploads/orders/'+img_name, request: req.param('id')}).exec(function (err, created){
						  		
								if (err){
									callback(err);
								}
							});
						  	index++;
						}
						callback();
					}, function(err){
					    // if any of the file processing produced an error, err would equal that error
					    if( err ) {
					    	return res.badRequest(err);
					    }

					    Orders.findOne({id: req.param('id')}).populate('photos').exec(function(err, changed){ 

					    	return res.serialize(changed, 'customer', 200);
					    });
					});
				});
			});
		});
	},

	/**
	 * @api {put} /orders/:id/cancel Отмена заказа
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiParam {Number} id ID заказа
	 * @apiParam {Sting} reason Причина закрытия
	 * @apiVersion 0.1.0
	 * @apiDescription Отменить заказ 
	 */
	cancel: function(req, res){

		var role = null;
		var criteria = {id: req.param('id')};
		var params = {cancel_reason: req.param('reason')};

		if (req.customer){
			role = 'customer';
			criteria.customer = req.customer.id;
			params.status = 120;

		}else if (req.driver){
			role = 'driver';
			criteria.driver = req.driver.id;
			params.status = 130;

		}

		var rooms = sails.sockets.rooms();
		sails.sockets.emit(rooms, 'orders_'+criteria.id,{
			id: criteria.id,
			cancel_reason: params.cancel_reason,
			status: params.status
		});

		Orders.update(criteria, params).exec(function(err, orders){

			if (err){
				return res.badRequest(err);
			}

			if (orders==undefined){
				return res.notFound({msg: 'ORDER_NOT_FOUND'});
			}

			if (orders.length<1){
				return res.notFound({msg: 'ORDER_NOT_FOUND'});	
			}

			var order = orders[0];

			var elasticsearch = require('elasticsearch');
			var client = new elasticsearch.Client({
			  host: 'localhost:9200',
			});

			client.delete({
				 index: 'movamba',
				 type: 'orders',
				 id: order.id,
			}, function (error, response) {

				if (err){
					return res.badRequest(err);
				}
				
				return res.serialize(order, role, 200);
			});
		});
	},

	/**
	 * @api {get} /orders/reasons Причины отмены заказа
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiDescription Поучение возможных причин отмены заказа 
	 * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
	 * [{
	 *   "id": 1,
	 *	 "name": "Текст причины",
	 *  },
	 *  ...]
	 */
	cancelReasons: function(req, res){

		var type = 'customer';
		if (req.driver!=undefined){
			type = 'driver';
		}

		OrdersReason.find({rtype: type}).exec(function(err, response){

			if (err){
				return res.badRequest(err);
			}
			if (response==undefined){
				return res.badRequest({msg: "QUERY_ERROR"});
			}

			return res.serialize(response, type, 200);
		});
	},


	/**
	 * @api {get} /orders/:id Получить инф. о заказе
	 * @apiGroup Orders
	 * @apiHeader {String} auth_token Ключ авторизации
	 * @apiVersion 0.1.0
	 * @apiParam {Number} id ID заказа
	 * @apiDescription Получить информацию о заказе <br>
	 * Коды статусов:
	 * <ul>
	 * <li>10 - Ожидает исполнения</li>
	 * <li>20 - поиск в первом круге</li>
	 * <li>30 - поиск во втором круге</li>
	 * <li>40 - свободный заказ</li>
	 * <li>50 - водитель откликнулся ( экипаж назначен)</li>
	 * <li>60 - экипаж выехал на заказ (подача авто)</li>
	 * <li>70 - экипаж прибыл </li>
	 * <li>80 - заказ выполняется </li>
	 * <li>90 - поездка окончена. Оплата </li>
	 * <li>100 - заказ закрыт ( оплата произведена )</li>
	 * <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li>
	 * <li>120 - заказ отменен (заказчиком)</li>
	 * <li>130 - заказ отменен (исполнителем)</li>
	 * <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li>
	 * </ul>
	 */
	get: function(req, res){
		Orders.findOne({id: req.param('id')})
		.populate('photos')
		.populate('customer')
		//.populate('curtype')
		.exec(function(err, order){

			if (err){
				return res.badRequest(err);
			}

			if (order==undefined){
				return res.notFound({msg:"ORDER_NOT_FOUND",code: 404});
			}

			return res.serialize(order,'driver',200);
		});
	},

	/**
	* @api {get} /orders/list Cписок заказов
	* @apiGroup Orders
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiVersion 0.1.0
	* @apiDescription Список активных заказов для водителя 
	*/
	list: function(req, res){

		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
		  host: 'localhost:9200',
		});

		var not_in = [0];
		Services.findOne({id: req.driver.service.id}).populate('region').exec(function(err, service){

			if (err){
				return res.badRequest(err);
			}

			RegionSettings.findOne({region: service.region.id}, function(err, settings){


				if (err){
						return res.badRequest(err);
				}

				var rounds = [settings.first_circle_radius, settings.second_circle_time];

				async.each(rounds, function(round, callback){

					var build_query = {
						query: {
							filtered: {
								query: {
									match : {
										round: rounds.indexOf(round)+1
									}
								},
								filter : {
									and: [
										{
											geo_distance : {
								                distance : round+"km",
								                location : {
								                    lat : req.driver.lat,
								                    lon : req.driver.lon
								                }
								            }
										},
										{
											not : {
												terms: {
													id: not_in
												}
											}
										},
										{
											terms: {
												status: [20,30,40]
											}
										},/*
										{
											terms: {
												service: [req.driver.service.id]
											}
										},*/
										{
											term: {
												transport: req.driver.car
											}
										}
									]
						        }
							}
						}
					};

					client.search({
						index: 'movamba',
						type: 'orders',
						body: build_query
					}, function(err, response){

						if (err){
							callback(err);
						}else{
							if (response.hits.hits.length>0){
								not_in = _.uniq(not_in.concat(_.pluck(response.hits.hits, '_id')));								
							}
							callback();
						}
					});
				}, function(err){

						if( err ) {
					    	return res.badRequest(err);
					    }

					    Orders.find({id: not_in}).exec(function(err, found){ 

					    	return res.serialize(found, 'driver', 200);
					    });
					});

			});

		});

	},

	/**
	* @api {get} /orders/:id/take Взять заказ
	* @apiGroup Orders
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiParam {Integer} id ID заказа
	* @apiVersion 0.1.0
	* @apiDescription Взять заказ
	*/
	take: function(req, res){

		var elasticsearch = require('elasticsearch');
		var client = new elasticsearch.Client({
		  host: 'localhost:9200',
		});

		async.waterfall([
		    function(callback) {

		    	Orders.update({id: req.param('id')}, {status: 50, driver: req.driver.id}).exec(function(err, orders){

		    		if (err){
		    			return callback(err);
		    		}

		    		if (orders.length<1){
		    			return callback({msg: "Order not found", code: 404});
		    		}

		    		var order = orders[0];

		    		// Update order to index
					client.update({
					  index: 'movamba',
					  type: 'orders',
					  id: order.id,
					  body: {
					  	doc: {
					  		status: order.status,
					  	}
					  }
					},function (err, response){

						console.log('update index of order #'+order.id);
						if (err){
							return callback(err);
						}

						callback(null, order);
					});
		    	});
		    },
		    function(order, callback) {

		    	Drivers.update({id: req.driver.id}, {active_order: order.id, status: 2}).exec(function(err, drivers){

		    		if (err){
		    			return callback(err);
		    		}

		    		var driver = drivers[0];

		    		var rooms = sails.sockets.rooms();
					sails.sockets.emit(rooms, 'orders_'+order.id,{
						id: order.id,
						status: order.status,
						driver: {
							id: driver.id,
							callsign: driver.callsign,
							lat: driver.lat,
						    lon: driver.lat, 
						    car: driver.lat,
						    color: driver.lat,
						    reg_number: driver.reg_number,
						    region_number: driver.region_number,
						    phone_num: driver.phone_num
						}
					});

		    		callback(null, order);
		    	});
		    }
		], function (err, result) {
		    
		    if (err){
    			return res.badRequest(err);
    		}
    		
    		return res.serialize(result,'driver',200);
		});
	},

	/**
	* @api {put} /orders/:id/status Статус заказа
	* @apiGroup Orders
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiParam {Integer} id ID заказа
	* @apiParam {Integer} status Статус заказа
	* Коды статусов:
	* <ul>
	 * <li>10 - Ожидает исполнения</li>
	 * <li>20 - поиск в первом круге</li>
	 * <li>30 - поиск во втором круге</li>
	 * <li>40 - свободный заказ</li>
	 * <li>50 - водитель откликнулся ( экипаж назначен)</li>
	 * <li>60 - экипаж выехал на заказ (подача авто)</li>
	 * <li>70 - экипаж прибыл </li>
	 * <li>80 - заказ выполняется </li>
	 * <li>90 - поездка окончена. Оплата </li>
	 * <li>100 - заказ закрыт ( оплата произведена )</li>
	 * <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li>
	 * <li>120 - заказ отменен (заказчиком)</li>
	 * <li>130 - заказ отменен (исполнителем)</li>
	 * <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li>
	 * </ul>
	* @apiParam {Integer} [service_id] ID службы
	* @apiVersion 0.1.0
	* @apiDescription Изменить статус заказа (для водителя)
	*/
	status: function(req, res){

		var permitted = -1;
		var criteria = {id: req.param('id')};
		var status = req.param('status');
		if (req.customer){
			permitted = sails.config.cab.order_states.client.indexOf(status);
			criteria.customer = req.customer.id;
		}else if (req.driver){
			criteria.driver = req.driver.id;
			permitted = sails.config.cab.order_states.driver.indexOf(status);
		}

		var params = {status: status};
		

		/*
		if (status==140){
			params['service_id'] = req.param('service_id');
		}
		/*
		if (permitted<0){
			return res.badRequest({msg: 'Передан некорректный статус'});
		}*/

		Orders.update(criteria, {status: status}).exec(function(err, orders){

    		if (err){
    			return res.badRequest(err);
    		}

    		var order = orders[0];
    		var rooms = sails.sockets.rooms();
			
			
				if(req.param('bill')){
			sails.sockets.emit(rooms, 'orders_'+order.id, {
				id: order.id,
				status: order.status,
				bill:req.param('bill'),
			});
			
			
			var transaction_params=new Object();
			transaction_params.customer=order.customer;
			transaction_params.order=order.id;
			transaction_params.value=req.param('bill').inside_price+req.param('bill').outside_price;
			CustomerTransactions.create(transaction_params).exec(function (err, created){

					if (err){
						return res.badRequest(err);
					}
					console.log('Transaction '+created.id+' created');
				});
			
			
			
			} else if(req.param('pay_type')){
			sails.sockets.emit(rooms, 'orders_'+order.id, {
				id: order.id,
				status: order.status,
				pay_type:req.param('pay_type'),
			});
		
			Orders.update({id: order.id}, {paytype:req.param('pay_type')}).exec(function(err, orders){
						if (err){
					return res.badRequest(err);
				}
              	});
				
				if(req.param('pay_type')==3){
					CustomerTransactions.findOne({order: order.id}).exec(function(err, customer_transaction){
							Customers.findOne({id: order.customer}).exec(function(err, target_customer){
					var final_bill=target_customer.bill-customer_transaction.value;
						Customers.update({id: order.customer}, {bill:final_bill}).exec(function(err, orders){
						if (err){
					return res.badRequest(err);
				}
              	});	});});			}
				
				
				
		
	/*	var report_params=new Object();
			//report_params.customer=order.customer;
			//report_params.order=order.id;
			//report_params.driver=order.driver;
			report_params.summ=1;
			report_params.type=true;
				OrderReports.create(report_params).exec(function (err, created){

					if (err){
						console.log('ERROR:'+err);
						return res.badRequest(err);
					}
					console.log('Order report '+created.id+' created');
				});
				
				*/
				
		
			} else {
				
				sails.sockets.emit(rooms, 'orders_'+order.id, {
				id: order.id,
				status: order.status,
				});
			}
			var elasticsearch = require('elasticsearch');
			var client = new elasticsearch.Client({
			  host: 'localhost:9200',
			});

			// Update order to index
			client.update({
			  index: 'movamba',
			  type: 'orders',
			  id: order.id,
			  body: {
			  	doc: {
			  		status: order.status,
			  	}
			  }
			},function (err, response){

				console.log('update index of order #'+order.id);
				if (err){
					return res.badRequest(err);
				}

				return res.serialize(order, 'driver', 200);
			});
    	});
	},


	/**
	* @api {put} /orders/:id/assignto/:did Назначение заказа
	* @apiGroup Orders
	* @apiParam {Integer} id ID заказа
	* @apiParam {Integer} did ID водителя
	* @apiVersion 0.1.0
	* @apiDescription Назначить заказ водителю (для диспетчера)
	*/
	assignTo: function(req, res){

		Orders.findOne({id: req.param('id'), status: 140}).populate('customer').exec(function(err, order){

			if (err){
				return res.badRequest();
			}

			var rooms = sails.sockets.rooms();
			sails.sockets.emit(rooms, 'driver_'+req.param('did'),{
				type: "orders",
				data: order
			});

			setTimeout(function(){

				Orders.update({id: req.param('id'), status: 140}, {status: 40, service_id: null}).exec(function(err, orders){

					if (err){
						res.badRequest(err);
					}

					var order = orders[0];

					console.log(orders);

					if(order==undefined){
						console.log({msg:"Order has taken", code: 404});
						return {msg:"Order has taken", code: 404};
					}

					console.log('Manager lost order, order is free');

					var elasticsearch = require('elasticsearch');
					var client = new elasticsearch.Client({
					  host: 'localhost:9200',
					});

					// Update order to index
					client.update({
					  index: 'movamba',
					  type: 'orders',
					  id: order.id,
					  body: {
					  	doc: {
					  		status: order.status,
					  	}
					  }
					},function (err, response){

						console.log('update index of order #'+order.id);
						if (err){
							console.log(err);
							return err;
						}

						//return res.serialize(order, 'driver', 200);
					});

				});

			},60*1000);

    		return res.ok({msg:'ORDER_ASSIGNED', code: 200});
		});
	},

	/**
	* @api {get} /orders/:id/close Закрыть заказ
	* @apiGroup Orders
	* @apiHeader {String} auth_token Ключ авторизации
	* @apiParam {Integer} time_inside Время в черте города (в секундах)
	* @apiParam {Integer} time_outside Время за городом (в секундах)
	* @apiParam {Integer} price_inside К оплате по городу 
	* @apiParam {Integer} price_outside К оплате за городом 
	* @apiParam {Integer} general_time Общее время 
	* @apiParam {Integer} general_price Всего к оплате 
	* @apiParam {Integer} tariff ID тарифа
	* @apiVersion 0.1.0
	* @apiDescription Закрыть заказ (для водителя)
	* Переподит заказ из статуса 90 (поездка окончена. Оплата ) в 100 (заказ закрыт, оплата произведена )
	*/
	close: function(req, res){

		async.waterfall([
		    function(callback) {

		    	Orders.update({id: req.param('id'), status: 90, driver: req.driver.id}, {status: 100}).exec(function(err, orders){

		    		if (err){
		    			return callback(err);
		    		}

		    		var order = orders[0];

		    		var elasticsearch = require('elasticsearch');
					var client = new elasticsearch.Client({
					  host: 'localhost:9200',
					});

					// Update order to index
					client.update({
					  index: 'movamba',
					  type: 'orders',
					  id: order.id,
					  body: {
					  	doc: {
					  		status: order.status,
					  	}
					  }
					},function (err, response){

						console.log('update index of order #'+order.id);
						if (err){
							console.log(err);
							return err;
						}

						callback(null, order);

						//return res.serialize(order, 'driver', 200);
					});

		    		
		    	});
		    },
		    function(order, callback) {

		    	Drivers.update({id: req.driver.id}, {active_order: null, status: 1}).exec(function(err, driver){

		    		if (err){
		    			return callback(err);
		    		}

		    		callback(null, order);
		    	});
		    },
		    function(order, callback) {

		    	Drivers.update({id: req.driver.id}, {active_order: null, status: 1}).exec(function(err, driver){

		    		if (err){
		    			return callback(err);
		    		}

		    		callback(null, order);
		    	});
		    }
		], function (err, result) {
		    
		    if (err){
    			return res.badRequest(err);
    		}

    		var bill = {
    			time_inside: req.param('time_inside'),
    			time_outside: req.param('time_outside'),
    			price_inside: req.param('price_inside'),
    			price_outside: req.param('price_outside'),
    			general_time: req.param('general_time'),
    			general_price: req.param('general_price'),
    			tariff: req.param('tariff')
    		}

    		var rooms = sails.sockets.rooms();
			sails.sockets.emit(rooms, 'orders_'+result.id,{
				id: result.id,
				status: result.status,
				bill: bill
			});
    		return res.serialize(result,'driver',200);
		});
	},
	
	
	testFly: function(req, res){

		var report_params=new Object();
			//report_params.customer=order.customer;
			//report_params.order=order.id;
			//report_params.driver=order.driver;
			report_params.summ=1;
			report_params.type=true;
				OrderReports.create(report_params).exec(function (err, created){

					if (err){
						console.log('ERROR:'+err);
						return res.badRequest(err);
					}
					console.log('Order report '+created.id+' created');
				});
    		return res.ok({msg:'ORDER_ASSIGNED', code: 200});
		
	}
	
};

