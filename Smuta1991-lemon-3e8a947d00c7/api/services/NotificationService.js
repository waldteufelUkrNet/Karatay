function sendSms(type,phone_number,options,callback)
{
	var sms_target_type="NONE";
	
	var http = require('http');
http.post = require('http-post');
	var smsBody={ 
	login:'taxilemon.ltd', 
	psw:'Xe1enteC', 
	mes:'Текст не задан',
	phones:phone_number,
	charset:'utf-8' };
	switch (type) {
  case "REAL_USER_CREATED_ORDER":
   smsBody.mes='РЕАЛЬНЫЙ пользователь создал заказ на сервере! Номер заказа '+options.order_id+", источник:"+options.source ;
   sms_target_type="Admin";
    break;
  case "CAR_NOT_FOUND":
   smsBody.mes='К сожалению, мы не смогли найти авто по Вашей заявке.';
   sms_target_type="Customer";
    break;
  case "DRIVER_ORDER_CANCEL":
   smsBody.mes='Заказ '+options.order_id+' отменен. Movamba ждет вас снова!';
   sms_target_type="Customer";
    break;
	  case "CUSTOMER_ORDER_CANCEL":
   smsBody.mes='К сожалению, заявка, которая выполняется в текущий момент, отменена заказчиком';
   sms_target_type="Driver";
    break;
	  case "CAR_ARRIVED":
   smsBody.mes='Машина по Заказу '+ options.order_id+' подана. Гос.номер '+options.reg_number+', тел.водителя '+options.phone_num+' .';
   sms_target_type="Customer";
    break;
	  case "ORDER_CLOSED":
   smsBody.mes='Заказ '+ options.order_id+' завершен! Сумма заказа составляет '+options.summ+' руб.';
   sms_target_type="Customer";
    break;
  default:
    smsBody.mes='Произошла ошибка, текст не указан =(. Пожалуйста, создайте жалобу на сайте...';
    sms_target_type="NONE";
}

console.log("sms body",smsBody);
 http.post('http://smsc.ru/sys/send.php', smsBody , function(resp){
	 console.log("target",sms_target_type);
callback(null,"Sms sended!");
});
}

function sendCustomerEmail(type,options,callback)
{
	var jwt = require('jwt-simple');
	var jwt_secret = 'TZE2RW8PIOSVBY20XYE8WIZ9BACISYPA7CG7SJAI8SA9E28DZOPP101366C58671NY8YKH10ACMKJLDJMIILLS10F8KL1YX7TDHWCSGEG79PK9O18MVOJ9CLKNMCOLLQ';
	  var request = require("request");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var googleApiKey="AIzaSyDFwWUXD0lG7kcdPOKq_U5NBpdeNOnvjjI";
var fs = require('fs');
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
//var from_email='"Movamba" <movambataxi@gmail.com';
//var transporter = nodemailer.createTransport('smtps://movambataxi%40gmail.com:GbTYC8Dyavs7PQ@smtp.gmail.com');
var from_email='"Movamba" <info@movamba.com';
var transporter = nodemailer.createTransport({direct:true,
    host: 'smtp.yandex.ru',
    port: 465,
    auth: { 
        user: 'nigatif1991@yandex.ru', 
        pass: 'u6xh3hnj' },
    secure: true
});
  var email ="";
	var template_path="index.html";
	var subject="Default subject";
	var inputCfg=options;
		
 var send_data={template_path:template_path, subject:subject,replacements:options};


	   Customers.findOne({id: options.user_id }).exec(function(err_cust, cust) {
	if(err_cust){
	 console.log("err_cust",err_cust);
     callback(err_cust);
	}
	else
	 request("http://b2b.movamba.com/api/user_info/"+cust.id+"/"+cust.token, function(error, response, body) {
  parsedBody = JSON.parse(body);
 
		   if(!err_cust && !parsedBody.error && cust  && cust.is_company )
	async.waterfall([function(inner_cb){
			email=parsedBody.mail;	
			send_data.replacements.name =parsedBody.realname+ " " + parsedBody.surname;
		switch (type) {
	case "COMPANY_BILL_RISE":
  send_data.subject="Movamba: Ваш баланс счета пополнен!";
  send_data.template_path="bill-add.html";
  send_data.replacements.summ=options.summ;
  inner_cb(null, send_data);
				
				
    break;
  case "ORDER_WAITING":
  send_data.subject="Movamba: Водитель найден";
  send_data.template_path="order-waiting.html";
    Orders.findOne({
                id: options.order_id
            })
            .populate('driver')
			.populate('customer')
            .exec(function(err, order) {
				console.log(order);
			send_data.replacements.order_id=order.id;
			send_data.replacements.phone=order.driver.phone_num;
			send_data.replacements.driver_name=order.driver.name;
			send_data.replacements.reg_number=order.driver.reg_number;
			send_data.replacements.startpoint=order.from;
			send_data.replacements.endpoint=order.to;
		
		inner_cb(null, send_data);
				
	});				
    break;
  case "ORDER_CANCEL":
   send_data.subject="Movamba: Заказ отменен";
    send_data.template_path="order-cancel.html";
     Orders.findOne({
                id: options.order_id
            })
			.populate('customer')
            .exec(function(err, order) {
				console.log(order);
			send_data.replacements.order_id=order.id;
		inner_cb(null, send_data);
				
	});				
    break;
  case "ORDER_DONE_COMPANY":
       send_data.subject="Movamba: заказ №"+options.order_id+" завершен!";
    send_data.template_path="order-done.html";
	email=email+", info@movamba.com";
     Orders.findOne({ id: options.order_id}).populate('customer').populate('driver').exec(function(err, order) {
			send_data.replacements.order_id=order.id;
			send_data.replacements.order_startpoint=order.from;
			send_data.replacements.order_endpoint=order.to;
	    send_data.replacements.order_summ=order.inside_price + order.outside_price;
		send_data.replacements.inside_hours = Math.floor( order.inside_time / 60);          
        send_data.replacements.inside_minutes = order.inside_time% 60;
		send_data.replacements.outside_hours = Math.floor( order.outside_time / 60);          
        send_data.replacements.outside_minutes = order.outside_time% 60;
        send_data.replacements.outside_price = order.outside_price;		 
		send_data.replacements.inside_price = order.inside_price;
		send_data.replacements.summ=send_data.replacements.inside_price+send_data.replacements.outside_price ;
		send_data.replacements.driver_name = order.driver.name;
		send_data.replacements.driver_reg_number = order.driver.reg_number;
		send_data.replacements.driver_region_number = order.driver.region_number;
		 async.waterfall([function(super_inner_cb) {
			  Tariffs.findOne({   transport: order.driver.car }).populate('transport').exec(function(err, tariff) {
				  if(err) console.log("transport err", err);
				  send_data.replacements.driver_car_type=tariff.transport.name;
				   send_data.replacements.tariff_inside_price=tariff.inside;
				   send_data.replacements.tariff_outside_price=tariff.outside;
				     send_data.replacements.tariff_minimal=tariff.minimal;
					 
					 if(tariff.givingCar)
					  send_data.replacements.tariff_givingCar=tariff.givingCar;
				     else
					  send_data.replacements.tariff_givingCar= "БЕСПЛАТНО";
				  
				  super_inner_cb(null, tariff);
			  });
	     },
         function(tariff, super_inner_cb) {
			 Ordertracking.find({order_id: order.id}).exec(function(err, track_dots) {
				  send_data.replacements.map="https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=color:0x0000ff|weight:5"; 
				  send_data.replacements.track_starttime=new Date(); 
				  send_data.replacements.track_endtime=new Date(); 
				 if(track_dots.length){
					 send_data.replacements.track_starttime=track_dots[0].createdAt;
					 send_data.replacements.track_starttime=track_dots[track_dots.length-1].createdAt;
					 
				/*	track_dots.forEach(function(one_dot){
						send_data.replacements.map=send_data.replacements.map+"|"+one_dot.lat+","+one_dot.lon;
					});*/
					
					send_data.replacements.full_map_url="http://movamba.com:1337/order_path_details/"+jwt.encode({id:order.id, from:order.from, to:order.to}, jwt_secret);
var dots_arr=[];
                    track_dots.forEach(function(one_dot){
						dots_arr.push({lat:one_dot.lat, lon:one_dot.lon});
					});
                   dots_arr = dots_arr.filter((thing, index, self) => self.findIndex((t) => {return t.lat === thing.lat && t.lon === thing.lon; }) === index);
      
					send_data.replacements.map=send_data.replacements.map+makeDotsUrlString(dots_arr)+
					"&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=truck%257C000099%7C"+track_dots[0].lat+","+track_dots[0].lon+
					"&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=truck%257C009900%7C"+track_dots[track_dots.length-1].lat+","+track_dots[track_dots.length-1].lon;
					
					
					
                /*     dots_arr.forEach(function(one_dot){send_data.replacements.map=send_data.replacements.map+"|"+one_dot.lat+","+one_dot.lon;});
					send_data.replacements.map=send_data.replacements.map+
					"&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=truck%257C000099%7C"+track_dots[0].lat+","+track_dots[0].lon+
					"&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=truck%257C009900%7C"+track_dots[track_dots.length-1].lat+","+track_dots[track_dots.length-1].lon;*/
				 }
				  send_data.replacements.track_starttime= send_data.replacements.track_starttime.getHours() + ":"+send_data.replacements.track_starttime.getMinutes();
				   send_data.replacements.track_endtime= send_data.replacements.track_endtime.getHours() + ":"+send_data.replacements.track_endtime.getMinutes();
				super_inner_cb(null, track_dots);
				});
			}],
			function(err, result){ 
			console.log("replacements",send_data.replacements);
			inner_cb(null, send_data);	
			});
			
	});	
    break;
	  case "CAR_ARRIVED":
       send_data.subject="Ваш заказ № "+options.order_id+" выполняется!";
    send_data.template_path="order-active.html";
     Orders.findOne({
                id: options.order_id
            })
			.populate('customer')
            .exec(function(err, order) {
				console.log(order);
			send_data.replacements.order_id=order.id;
			inner_cb(null, send_data);
				
	});	
    break;
	  case "CUSTOMER_BILL_ADDED":
        send_data.subject="Ваш баланс счета пополнен!";
    send_data.template_path="bill-add.html";
	send_data.replacements.summ=options.summ;

		inner_cb(null, send_data);
				
	
    break;
  default:
  
}		
		
}], function(err, result){	

readHTMLFile(__dirname + '/templates/'+result.template_path, function(err, html) {
    var template = handlebars.compile(html);
  	
    var htmlToSend = template(result.replacements);
    var mailOptions = {
        from: from_email,
        to : email,
        subject : result.subject,
        html : htmlToSend
     };

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('sending error ',error);
            callback(error);
        }
		else{
			console.log('sending response ',response);
		callback(response);}
    });
});
					});
    
	         else {
				 console.log("parsedBody",parsedBody);
				 callback(parsedBody);
			 }
			});	
						});
}
function makeDotsUrlString(dots)
{var dot_len=16,
 max_len=7000,
 result="",
 tmp_array=dots,
 optimal_count=Math.floor( max_len / dot_len);
 console.log('optimal count is', optimal_count);
 var current_len=dots.length ;
  console.log('current_len is', current_len);
 if(current_len<=optimal_count){
	 console.log('nothing to cut =(');
 }else{
	 
	 var iteration_k =  Math.ceil(current_len/optimal_count);//Math.floor( optimal_count / Math.floor(current_len-optimal_count)),
	 i=0,
	 last=dots[dots.length-1];
	 if(iteration_k==1)iteration_k=2;
	  console.log('cutting =) every element ',iteration_k);
	 i=iteration_k-1;
	 while (i < dots.length) {
        if(tmp_array[i]!=dots[dots.length-1])
			delete tmp_array[i];
		  i=i+iteration_k;
	 }
 }
 tmp_array.forEach(function(one_dot){result=result+"|"+one_dot.lat+","+one_dot.lon;});

	 return result;
}
function sendTechEmail(type,options,callback)
{
	  var request = require("request");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


var from_email='"Movamba" <info@movamba.com';
var transporter = nodemailer.createTransport({direct:true,
    host: 'smtp.yandex.ru',
    port: 465,
    auth: { 
        user: 'nigatfi1991', 
        pass: 'u6xh3hnj' },
    secure: true
});
  var email ="";
  var template_path="index.html";
	var subject="Default subject";
	var inputCfg=options;
		
 var send_data={template_path:template_path, subject:subject,replacements:options};


 
		
	async.waterfall([function(inner_cb){
		
			email=options.email;	
			
		switch (type) {
	case "DIRECTOR_REGISTRATION":
  send_data.subject="Вы зарегистрированы на Movamba";
  send_data.template_path="director-registration.html";
  send_data.replacements.fio=options.fio;
  send_data.replacements.login=options.login;
  send_data.replacements.pass=options.pass;
    send_data.replacements.callsign=options.callsign;
  inner_cb(null, send_data);
    break;
	
		case "ORDER_REPORT":
  send_data.subject="Новая жалоба на сервере Movamba (заявка)";
  send_data.template_path="report.html";
  send_data.replacements.pre_text="На сервере появилась новая жалоба на заявку";
  send_data.replacements.target_id=options.target_id;
  send_data.replacements.text=options.text;
  inner_cb(null, send_data);
    break;
	
		case "DRIVER_REPORT":
  send_data.subject="Новая жалоба на сервере Movamba (водитель)";
  send_data.template_path="report.html";
  send_data.replacements.pre_text="На сервере появилась новая жалоба на водителя";
  send_data.replacements.target_id=options.target_id;
  send_data.replacements.text=options.text;
  inner_cb(null, send_data);
    break;
	
		case "NOT_TARGETED_REPORT":
  send_data.subject="Новая жалоба на сервере Movamba (общая)";
  send_data.template_path="report.html";
  send_data.replacements.pre_text="На сервере появилась новая жалоба ";
  send_data.replacements.target_id=options.target_id;
  send_data.replacements.text=options.text;
  inner_cb(null, send_data);
    break;
	
		
		case "CUSTOMER_REPORT":
  send_data.subject="Новая жалоба на сервере Movamba (клиент)";
  send_data.template_path="report.html";
  send_data.replacements.pre_text="На сервере появилась новая жалоба на клиента";
  send_data.replacements.target_id=options.target_id;
  send_data.replacements.text=options.text;
  inner_cb(null, send_data);
    break;
	
	
  case "OPERATOR_REGISTRATION":
   send_data.subject="Вы зарегистрированы на Movamba";
  send_data.template_path="operator-registration.html";
  send_data.replacements.fio=options.fio;
  send_data.replacements.login=options.login;
  send_data.replacements.pass=options.pass;
    send_data.replacements.callsign=options.callsign;
  inner_cb(null, send_data);
				
						
    break;
	  case "REAL_USER_CREATED_ORDER":
   send_data.subject="Новый заказ";
  send_data.template_path="real-order-created.html";
  send_data.replacements.order_id=options.order_id;
  send_data.replacements.source=options.source;
  inner_cb(null, send_data);
				
						
    break;
  case "DRIVER_REGISTRATION":
     send_data.subject="Вы зарегистрированы на Movamba";
  send_data.template_path="driver-registration.html";
  send_data.replacements.fio=options.fio;
  send_data.replacements.login=options.login;
  send_data.replacements.pass=options.pass;
  send_data.replacements.callsign=options.callsign;
 // send_data.replacements.service_callsign=options.service_callsign;
  inner_cb(null, send_data);	
    break;
   default:
  
}		
		
}], function(err, result){	

readHTMLFile(__dirname + '/templates/'+result.template_path, function(err, html) {
    var template = handlebars.compile(html);
  	
    var htmlToSend = template(result.replacements);
    var mailOptions = {
        from: from_email,
        to : email,
        subject : result.subject,
        html : htmlToSend
     };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('sending error ',error);
            callback(error);
        }
		else{
			console.log('sending response ',response);
		callback(response);}
    });
});
	});
    
	        
			
						
}


function sendNewRealOrderNotification(options)
{
	if(!options.source) options.source="Мобильное приложение";
		  Config.findOne({name: 'real_order_notification_tel_num'}).exec(function(err, conf) {
	       sendSms("REAL_USER_CREATED_ORDER", conf.value, options, function(r) {}); 
		}); 

    //    Config.findOne({name: 'real_order_notification_email'}).exec(function(err, conf) {
		//    options.email=conf.value;
	  //      sendTechEmail("REAL_USER_CREATED_ORDER",  options, function(r) {}); 
		// }); 		
}

var exports = module.exports = {};
exports.sendSms=sendSms;
exports.sendCustomerEmail=sendCustomerEmail;
exports.sendTechEmail=sendTechEmail;
exports.sendNewRealOrderNotification=sendNewRealOrderNotification;
