'use strict';
var global_slide=-1;
angular.module('myApp.home', ['ngRoute','ngCookies'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'homeview/home.html',
    controller: 'homeCtrl'
  });
}]).directive("setlength", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            
            $(elem).click(function() {
               var temp=JSON.parse($(elem).attr('temp'));
				var searchTerm = temp.cars[0].id,
					index = 0;
				for(var i = 0, len = scope.slides.length; i < len; i++) {
					if (scope.slides[i].id === searchTerm) {
						index = i;
						break;
					}
				}

                $("#temp").slick('slickGoTo',index);
                scope.$apply();
                });
            
        }
    }
}]).directive("disableall", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            
            $(elem).click(function() {
				$('.slick-arrow').toggleClass( "not-active" );
				$('.groups').toggleClass( "not-active" );
				$('.lens').toggleClass( "not-active" );
                $(elem).removeClass('not-active');
                });
        }
    }
}])
	.directive("customTime", ["$interval", function($interval) {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs,ctrl) {
				$('#time').combodate({
					firstItem: 'name',
					minuteStep: 5
				});
				var temp=function() {
					var t=$('#time').combodate('getValue');
					if(t){
						var date=new Date();
						date.setHours(t.split(":")[0]);
						date.setMinutes(t.split(":")[1]);
						scope.order.arrive_time=date;
						ctrl.$setValidity('datetime',true);
						console.log(date.toTimeString());
					}
};

				$('select.minute').change(temp);

				$('select.hour').change(function() {
					var t=$('#time').combodate('getValue');
						$('select.minute').children().each(function( index ) {
							$(this).attr('disabled',false);
						});

					if($('select.hour').val()){

						$('select.minute').children().each(function( index ) {

							var minutes=Number.parseInt($(this).text());
							if(scope.order.arrive_date.getDate()==new Date().getDate() && $('select.hour').val()==new Date().getHours() && minutes<=new Date().getMinutes()+10 )
								$(this).attr('disabled',true);
						});
						var date=new Date();
						date.setHours(t.split(":")[0]);
						date.setMinutes(t.split(":")[1]);
						scope.order.arrive_time=date;
						console.log(date.toTimeString());
					}
				}

				);

				$('select.minute').children().each(function( index ) {
					if(index==0)
						$(this).text('Минуты');
					var minutes=Number.parseInt($(this).text());
					if(scope.order.arrive_date.getHours()==new Date().getHours() && minutes<=new Date().getMinutes()+10 )
					$(this).attr('disabled',true);
				});

				$('select.hour').children().each(function( index ) {
					if(index==0)
						$(this).text('Часы');
					var minutes=Number.parseInt($(this).text());
					if(scope.order.arrive_date.getDate()==new Date().getDate() && minutes<new Date().getHours() )
						$(this).attr('disabled',true);
				});

				scope.$watch('order.arrive_date',function(newValue,oldValue){
					console.log($('#time').combodate('getValue'));
					ctrl.$setValidity('datetime',false);

					$('select.hour').val('');
					$('select.minute').val('');

					$('select.minute').children().each(function( index ) {
						$(this).attr('disabled',false);
					});

					$('select.hour').children().each(function( index ) {
						$(this).attr('disabled',false);
					});

					$('select.minute').children().each(function( index ) {

						var minutes=Number.parseInt($(this).text());
					if(scope.order.arrive_date.getDate()==new Date().getDate() && $('select.hour').val()==new Date().getHours() && minutes<=new Date().getMinutes()+10 )
							$(this).attr('disabled',true);

					});

					$('select.hour').children().each(function( index ) {

						var minutes=Number.parseInt($(this).text());
						if(scope.order.arrive_date.getDate()==new Date().getDate() && minutes<new Date().getHours() )
							$(this).attr('disabled',true);
					});
				});

			}
		}
	}])
.directive("showNotifications", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {

            $(elem).click(function() {
               var temp=JSON.parse($(elem).attr('temp'));
				var searchTerm = temp.lens[0].cars[0].id,
					index = 0;
				for(var i = 0, len = scope.slides.length; i < len; i++) {
					if (scope.slides[i].id === searchTerm) {
						index = i;
						break;
					}
				}
               $("#temp").slick('slickGoTo',index);
                scope.$apply();
                });
        }
    }
}]).directive("tempdirective", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {

			$("#temp").on('init', function(event, slick){
				//console.log(slick.slickGoTo);
				if(global_slide>=0)
					slick.slickGoTo(global_slide);
				scope.$apply();
			});
			//	console.log(event);
			//	console.log(slick);
			//	console.log(currentSlide)
			//});

			$("#temp").on('beforeChange', function(event, slick, currentSlide, nextSlide){

				//console.log(currentSlide);
				//if(nextSlide)
				//	console.log(nextSlide);
				if(nextSlide===0)
					global_slide=nextSlide;
				if(nextSlide)
				global_slide=nextSlide;
				$(".groups").children().each(function( index ) {
					var temp=JSON.parse($(this).attr('temp'));
					var searchTerm = scope.slides[nextSlide].id;
					var ar=[];
					for (var j=0;j<temp.lens.length;j++)
						ar=ar.concat(temp.lens[j].cars);
					var length=temp.lens[0].cars.length;
					var flag=false;
					for(var i = 0, len = ar.length; i < len; i++) {
						if (ar[i].id == searchTerm) {
							scope.order.car_group = scope.transport[index];
							scope.order.car_length = scope.order.car_group.lens[index];
							scope.$apply();
							flag=true;
							break;
						}
					}
					if(flag)
					{
						$( this ).addClass( "active" );
					}
					else
					{
						$( this ).removeClass( "active" );
					}
});

				$(".lens").children().each(function( index ) {
					if(!$(this).attr('temp'))return true;
					var temp=JSON.parse($(this).attr('temp'));
					var searchTerm = scope.slides[nextSlide].id;
					var ar=temp.cars;
					var flag=false;
					for(var i = 0, len = ar.length; i < len; i++) {
						if (ar[i].id == searchTerm) {
							flag=true;
							break;
						}
					}
					if(flag)
					{
						$(this).addClass( "active" );
					}
					else
					{
						$(this).removeClass( "active" );
					}
				});
			});
        }
    }
}])
.controller('homeCtrl', ['$route','$scope', '$sce', '$http','$timeout','$cookies','$interval','$compile','$uibModal','$filter','TransService','localStorageService','socketService','Upload',
	function($route,$scope, $sce, $http, $timeout,$cookies,$interval,$compile, $uibModal, $filter, TransService, localStorageService, socketService, Upload) {
	localStorageService.remove('user');
$scope.myStyle="{}";

		localStorage.setItem("attempts", 0);

		$("#clear_to").after().click(function(){
			$scope.order.to=JSON.parse('{"address_components":[{"types":["route"],"long_name":"По моему указанию","short_name":"По моему указанию"}],"geometry":{"location":{"lat":0.01,"lng":0.01}},"formatted_address":"По моему указанию"}');
			$scope.stepforms.first.$setValidity("to", true);
			$scope.stepforms.first.to.$setValidity("place", true);
			$scope.$apply();
		});
		// In order to fix z-index problem with absolutley postioned elements
		$("#navbar_handler").on("hide.bs.collapse", function(){
			$(".navbar").css('z-index',0);
		});
		$("#navbar_handler").on("show.bs.collapse", function(){
			$(".navbar").css('z-index',5);
		});

		$scope.toggle=function()
		{
			console.log('sd');
		}
		$scope.dynamicPopover = {
			content: 'Hello, World!',
			templateUrl: 'myPopoverTemplate.html',
			title: 'Title'
		};

		$scope.placement = {
			options: [
				'top',
				'top-left',
				'top-right',
				'bottom',
				'bottom-left',
				'bottom-right',
				'left',
				'left-top',
				'left-bottom',
				'right',
				'right-top',
				'right-bottom'
			],
			selected: 'top'
		};
    /* preset 15 minutes wait */
	var today =  new Date();
	today.setMinutes(today.getMinutes()+15);
var today_plus=new Date('2011-04-11T00:00:00');
	$scope.stepforms = {err: false}; // forms

	var stored_profile = localStorageService.get('user');
	var stored_order = localStorageService.get('order');

	var order_template = {
		car_group: null,
		car_length: null,
		arrive_date: today,
		arrive_time: today_plus,
		need_loader: false,
		need_boxes: false,
		cartype: 0,
		paytype: 1,
		city: 1,
		for_now: true,
		starttime: today,
		files: []
	}


// 	setInterval(function(){
// $http({
// 			method: 'PUT',
// 			url: 'http://movamba.dev-xelentec.com:1337/api/drivers/position',headers: {
// 					'auth_token': "E24QDREKHKEDOPVPWSLVDXYENWQ4OLV3HTZH4FDQQIMVV4HX3EA4JTQHJU35WDPG5K5354YPCGWE3N3JLOIJ4MLP3U3NVIFO5U4YTJP7P"
// 				},
// 			data: {
// 				lat: Math.random(),
// 				lon:Math.random()}
// 		}).then(function(success){	
// 		});},100);
var levenshtein_distance =function  (a, b) {
      if(a.length == 0) return b.length; 
      if(b.length == 0) return a.length; 
    
      var matrix = [];
    
      // increment along the first column of each row
      var i;
      for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
      }
    
      // increment each column in the first row
      var j;
      for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
      }
    
      // Fill in the rest of the matrix
      for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                             matrix[i-1][j] + 1)); // deletion
          }
        }
      }
    
      return matrix[b.length][a.length];
    }
       //    var temp_bound=new google.maps.LatLngBounds({lat: 55.539474, lng:37.171381},{lat: 56.009478, lng: 38.107295});       
$scope.auto=function()
{
	//console.log($scope.order.from);
	if(!$scope.order || !$scope.order.from.address_components){
		console.log($scope.order.from);
$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.order.from+'&bounds=55.539474,37.171381|56.009478,38.107295&key=AIzaSyBRBl7R3RcoIZJVX70WoVDfB6VNJF4H_54'
            
          ).then(function (data) {
         var user_input=$scope.order.from;
         //console.log(data.data.results);
 for(var i=0;i<data.data.results.length;++i){
var res = {
                        'address_components': [],
                        'geometry':{
                            'location':{
                                'lat':0,
                                'lng':0
                            }
                        },
                        'formatted_address': ''
                    };
 	var result=data.data.results[i];
 	res.address_components=result.address_components;
 	res.geometry.location=result.geometry.location;
 	res.formatted_address=result.formatted_address;
 
 	
var str='';
   	res.address_components.forEach(function(val){

   		if(val.types.indexOf("route")>=0 || val.types.indexOf('street_address')>=0 ||
   		 val.types.indexOf('street_number')>=0){
                            res.address_components.push({
                                types: val.types,
                                long_name: val.long_name,
                                short_name: val.short_name
                            });
                            str+=val.short_name+', ';
                        }
                    });

   	var temp=result.formatted_address.split(',');
   	if(Number.isNaN(Number.parseInt(temp[1])))
   			var temp_string=temp[0];
   		else
   	var temp_string=temp[0]+temp[1];
   	//console.log(temp_string);
   //	console.log(str);
 //$scope.order.from.$setValidity('place', isValid(str, scope.old_value));
if(levenshtein_distance(user_input.toLowerCase(),temp_string.toLowerCase())<5)
{
	res.formatted_address=str;
$scope.order.from=res;
$scope.stepforms.first.$setValidity("from", true);
    $scope.stepforms.first.from.$setValidity("place", true);
}
   // 	if(str!='')
   // res.formatted_address=str;
	//console.log(str);
 	
 }


           });
}};


	$scope.setRating= function(){
		var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'template/workrating.html',
	        controller: 'ratingModalController',
	        backdrop: 'static',
	        windowClass	: 'movamba-modal',
	        resolve: {
	            mtds: function () {
                     return {};
                },
	            params: function () {
	              //  return order;
	              return $scope.order;
	            }
	        }
	    });

	

	    modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem);
        if(selectedItem.claim && selectedItem.claim.length>0){
	$http({
			method: 'POST',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/report',
			data: {
				text: selectedItem.claim}
		}).then(function(success){	
		});}
	$http({
			method: 'POST',
			url: 'http://movamba.dev-xelentec.com:1337/api/drivers/rate',
			data: {
				driver: $scope.order.driver.id,
				rate: selectedItem.rating
			}
		}).then(function(success){
			console.log("Rating sended. reload.");
			$scope.step=1;
			$scope.order.id=null;
			 $route.reload();
		
		});

        
    }, function () {
        console.log('Modal dismissed at: ' + new Date());
    });
	}

	$scope.order = order_template;
	
	$scope.user = {
		is_company: false,
		phone: '',
	};

	if (stored_profile){
		$scope.user = angular.fromJson(stored_profile);

		if (stored_order){

			stored_order = angular.fromJson(stored_order);

			$http({
				method: 'GET',
				url: 'http://movamba.dev-xelentec.com:1337/api/orders/'+stored_order.id,
				headers: {
					'auth_token': $scope.user.token
				}
			})
	    	.then(function(success){

	    		if (success.status!=200){
	    			return;
	    		}
	    		
	    		var order = success.data;
	    		if (order.status==100){
	    			//$scope.setRating();
	    		}else if (order.status>100 && order.status!=140){
	    			closeOrder();
	    		}else {
	    			delete order.customer;
	    			console.log()
		    		delete $scope.order.cartype;
		    		$scope.order = angular.extend(order, $scope.order);
		    		showOrder();
	    		}

	    	}, function(err){

	    		console.log(err);
	    		closeOrder();
	    	});
		}

	}


	$scope.show_slider = true;

	$scope.slider = [];

	$scope.slickConfig = {
	    autoplay: false,
	    draggable: false,
	    infinite: true,
	    swipe:true,
	    method: {}
	};

	TransService('general', function(config){

		$http.get("http://movamba.dev-xelentec.com:1337/api/settings/tariffs").success(
			function(tariffs){	

				for (var tindex in tariffs){

					for(var gindex in config){

						var lengths = config[gindex].lens

						for (var lindex in lengths){

							var cars = lengths[lindex].cars;

							
							
							
							
							for (var cindex in cars){

								if (tariffs[tindex].transport.id == cars[cindex].id){
									cars[cindex]['tariff'] = {
										inside: tariffs[tindex].inside, 
										outside: tariffs[tindex].outside,
										minimal: tariffs[tindex].minimal
									};	 
								}
							}
						}
					}
				}
			});
		$scope.transport = config;

		// var configuaration=[{name:"3 метра", ids:[]},{name:"4 метра", ids:[]},{name:"другое", ids:[]},
		// {name:"тент", ids:[]},{name:"фургон", ids:[]}{name:"бортовой", ids:[]}];
		var configuaration=[{name:"3 метра", ids:[1,2,3,4]},{name:"4 метра", ids:[7,8,10,11]},{name:"другое", ids:[5,12,14,15,16,17,19]},
		{name:"тент", ids:[21,24,27,30]},{name:"фургон", ids:[20,23,26,29]},{name:"бортовой", ids:[22,25,28,31]}];

var categoryById=function(id){
for (var i = 0; i < configuaration.length; i++) {
	if(configuaration[i].ids.some(function (value) { if (value==id) return true; else false; }))
	return configuaration[i].name;
}
};
function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
//console.log(config);

$scope.transport;
var counter=0;
		for (var i = 0; i < $scope.transport.length; i++) {
			var old_lens=$scope.transport[i].lens;
			var new_lens=[];
			//console.log($scope.transport[i].name);
			old_lens.forEach(
				function(elem){

				elem.cars.forEach(
					function(elem2){
				
				var category=categoryById(elem2.id);
				var flag=false;
				for (var i = 0; i < new_lens.length; i++) {
					if(new_lens[i].name==category) {
						new_lens[i].cars.push(elem2);
						flag=true;
					}
				};
				if(!flag){counter++;
				new_lens.push(   {id: counter, name: category, cars: [    elem2 ]     });}
				});

				});
			if(new_lens[0].name=="3 метра" || new_lens[0].name=="4 метра")
			{
				new_lens.sort(compare);
			}
			$scope.transport[i].lens=new_lens;
		};
//console.log($scope.transport);


		$scope.order.car_group = $scope.transport[0];
		$scope.order.car_length = $scope.order.car_group.lens[0];
		$scope.slides = $scope.order.car_length.cars;

		$scope.slides=[];


		$scope.transport.forEach(function(elem){
	elem.lens.forEach(function(elem1){
		elem1.cars.forEach(function(elem2){
$scope.slides.push(elem2);


	});
	});
});

	});


	var closeOrder = function(){
		localStorageService.remove('order');
		localStorageService.remove('user');
	};
$scope.driver_pins=[];
$scope.driverPostionUpdate=function(item){
	console.log(item);

  var center=new google.maps.LatLng(item.lat,item.lon);
	$scope.map.setCenter(center);
for (var i = 0; i < $scope.driver_pins.length; i++) {
	$scope.driver_pins[i].lat=item.lat;
	$scope.driver_pins[i].lon=item.lon;
};


};

	var orderListener = function(order){

         console.log(order);
		if (order.id==$scope.order.id){
$scope.order.status=order.status;
//if(order.for_now==false){
	//$scope.order.status=40;
//order.status=40;	}

			if (order.status==20){
				console.log('Status 20 received');
				var now =  new Date();
				$scope.addCircles();
				$scope.settings.endtime = now.getTime()+$scope.settings.second_circle_time*60*1000;
			}


			if (order.status==30){
				var now =  new Date();
				$scope.settings.endtime = now.getTime()+$scope.settings.second_circle_time*60*1000;
			}
			if (order.status==40){
				var now =  new Date();
				$scope.settings.endtime = now.getTime()+$scope.settings.find_car_time*60*1000;
			}

	if (order.status==110){
				$scope.removeCicrcles();
		}

			if (order.status==60){

$scope.driver_pins.push({image:$scope.getImageById($scope.order.cartype),lat:$scope.order.driver.lat,lon:$scope.order.driver.lon});

 var center = new google.maps.LatLng($scope.order.driver.lat,$scope.order.driver.lon);
 //$scope.map.setCenter(center);
//$scope.map.setZoom(13);
$scope.bounds = new google.maps.LatLngBounds();
// $scope.bounds.extend($scope.driver_pins[0]);
// $scope.bounds.extend($scope.to_pins[0]);
//console.log($scope.order);
var driver_pos = new google.maps.LatLng($scope.order.driver.lat, $scope.order.driver.lon);
var to_pos = new google.maps.LatLng($scope.order.start_lat, $scope.order.start_lon);
//console.log(driver_pos)
//console.log(to_pos);

  $scope.bounds.extend(driver_pos);
  $scope.bounds.extend(to_pos);
 $scope.map.fitBounds($scope.bounds);

socketService.addListener('drivers_'+$scope.order.driver.id, $scope.driverPostionUpdate);

		
			}
if (order.status==40 || order.status==40)
{
	var now =  new Date();
$scope.settings.endtime = now.getTime()+200*1000;
}



			if (order.status==50){
				console.log('Driver');
console.log(order.driver);




				var stored_order = localStorageService.get('order');
				stored_order = angular.fromJson(stored_order);
				stored_order.driver = order.driver;
				var order_serialized = angular.toJson(stored_order, 1);
				localStorageService.set('order', order_serialized);
				$scope.order.driver = order.driver;

			}
			if (order.status==60){
	try{

				 $scope.removeCicrcles();
				}
				catch(err)
				{
					console.log(err);
				}
			}

if (order.status>=90){
	try{

				 socketService.removeListener('drivers_'+$scope.order.driver.id, $scope.driverPostionUpdate);
				 $scope.removeCicrcles();
				}
				catch(err)
				{
					console.log(err);
				}
			}

			if (order.status==100){
				$scope.setRating();
			}
			$scope.order.status = order.status;
		}
	};

	

	var showOrder = function(){

$timeout(showAnimation,1500);

console.log($scope.order);

if($scope.slides && !$scope.order.cartype.name)
{
	$scope.slides.forEach(function(elem){
		if(elem.id==$scope.order.cartype)
			$scope.order.cartype=elem;
	}
		);
}

var from=$scope.order.from;
var to=$scope.order.to;
if($scope.order.from.formatted_address)
	var from=$scope.order.from.formatted_address;
if($scope.order.to.formatted_address)
	var to=$scope.order.to.formatted_address;
var boxes='нет';
var loader='нет';
if($scope.order.need_boxes)
	boxes=' да';
if($scope.order.need_loader)
	loader=' да';

if($scope.order.for_now==false){
	$scope.order.status=40;
}


	

	var today=new Date(); //today is Nov 28, 2010
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
var tomorrow = new Date(+new Date() + 86400000);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
var additional_date=today.toDateString();
var additional_date2=$scope.order.starttime.toDateString();
var additional_d=$filter('date')($scope.order.starttime, 'HH:mm')+ " Сегодня";
if($scope.order.for_now==false)
{
	 additional_d=$filter('date')($scope.order.arrive_time, 'HH:mm');
	if(today.toDateString()==$scope.order.arrive_date.toDateString())
		additional_d=additional_d+ " Сегодня";
	else 
		if(tomorrow.toDateString()==$scope.order.arrive_date.toDateString())
		additional_d=additional_d+ " Завтра";
	else additional_d=additional_d+' '+$filter('date')($scope.order.arrive_date, ' dd.MM');
}
		$scope.orderTooltipHtml = $sce.trustAsHtml(
			'<div class="title">Моя заявка</div>'+
			'<div class="content">'+
				'<div class="form-group">'+
					'<label class="controle-label">Откуда:</label>'+
					'<p>'+from+'</p>'+
				'</div>'+
				'<div class="form-group">'+
					'<label class="controle-label">Куда:</label>'+
					'<p>'+to+'</p>'+
				'</div>'+
				'<div class="form-group">'+
					'<label class="controle-label">Когда:</label>'+
					'<p>'+additional_d+'</p>'+
				'</div>'+
				'<div class="form-group">'+
          '<label class="controle-label">Авто:</label>'+
          '<p>'+$scope.order.cartype.name+' '+$scope.order.car_length.name+' '+$scope.order.car_group.name+' '+'</p>'+
          '<label class="controle-label">Нужен грузчик:</label>'+
          '<p>'+loader+'</p>'+
          '<label class="controle-label">Нужны коробки:</label>'+
          '<p>'+boxes+'</p>'+
        '</div>'+
        '<div class="form-group">'+
          '<label class="controle-label">Тариф:</label>'+
          '<ul>'+
            '<li>МКАД <span>'+$scope.order.cartype.tariff.inside+' р/час</span></li>'+
            '<li>За МКАД <span>'+$scope.order.cartype.tariff.outside+' р/час</span></li>'+
            '<li>Минимальный заказ <span>'+$scope.order.cartype.tariff.minimal+' часа</span></li>'+
          '</ul>'+
        '</div>'+
				'<!--div class="form-group">'+
					'<label class="controle-label">Ваши данные:</label>'+
					'<p>Имя, +7'+'$scope.user.phone'+'</p>'+
				'</div-->'+
			'</div>');


	};

	var editUser = function(){


		$http({
			method: 'PUT',
			url: 'http://movamba.dev-xelentec.com:1337/api/customer/'+$scope.user.id,
			headers: {
				'auth_token': $scope.user.token
			},
			data: {
				phone: $scope.user.phone,
				company_name: $scope.user.company_name,
				is_company: $scope.user.is_comірpany,
				fax: $scope.user.fax
			}
		}).then(function(success){

			$scope.user = angular.extend(success.data, $scope.user);			
			if(localStorageService.isSupported){
				delete $scope.user.code;
				var user_serialized = angular.toJson($scope.user, 1);
				localStorageService.set('user', user_serialized);
			}

			createOrder();
		});
	};

	var getRegionSettings = function(){

		if(!$scope.user.region)
			$scope.user.region=3;
		if(!$scope.user.token)
			var temp_token="";
		else
			temp_token=$scope.user.token;
		$http({
			method: 'GET',
			url: 'http://movamba.dev-xelentec.com:1337/api/regions/'+$scope.user.region,
			headers: {
				auth_token: temp_token
			}
		}).then(function(success){
			$scope.settings = success.data.settings;
		});
	};
	getRegionSettings();

		$scope.templateOrder=function()
		{
		$http({
			method: 'POST',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/create',
			headers: {
				'auth_token': '6AWCAZSKNOZ2SOOVBMGO3YFNPI5SFBQXIZ7UQE5D7E6LK3VKDKVQOOHSZKVCP47FGNVTCCRX3MQ'
			},
			data: JSON.parse('{"from":"Малая Бронная ул., ","start_lat":55.7623895,"start_lon":37.595325499999944,"to":"Малая Грузинская ул., ","finish_lat":55.7670265,"finish_lon":37.57238469999993,"paytype":1,"cartype":27,"for_now":true,"need_boxes":false,"need_loader":false,"starttime":"2015-11-20T12:28:49.467Z"}')
		}).then(function(success){

					delete $scope.order.cartype;
					$scope.order = angular.extend(success.data, $scope.order);
					if(localStorageService.isSupported){
						var user_serialized = angular.toJson($scope.order, 1);
						localStorageService.set('order', user_serialized);
					}
					var now =  new Date();
					$scope.settings.endtime = now.getTime()+$scope.settings.first_circle_time*60*1000;
					showOrder();
			}
		, function(err){

			console.log(err);
		}
		);
	};

	var createOrder = function(){
		var service_array=new Array();
		$http({
			method: 'GET',
			url: 'http://movamba.dev-xelentec.com:1337/api/regions/3/services'
		}).then(function(services){
			console.log(services);
			for (var i = 0; i < services.data.length; i++) {
				service_array[i]=services.data[i].id;
			}
			$http({
			method: 'POST',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/create',
			headers: {
				'auth_token': $scope.user.token
			},
			data: {
				from: $scope.getFrom().formatted_address,
				start_lat: $scope.getFrom().geometry.location.lat,
				start_lon: $scope.getFrom().geometry.location.lng,
				to: $scope.getTo().formatted_address,
				finish_lat: $scope.getTo().geometry.location.lat,
				finish_lon: $scope.getTo().geometry.location.lng,
				additional_phone: $scope.order.additional_phone,
				paytype: $scope.order.paytype,
				cartype: $scope.order.cartype.id,
				for_now: $scope.order.for_now,
				need_boxes: $scope.order.need_boxes,
				need_loader: $scope.order.need_loader,
				starttime: $scope.order.starttime.toJSON(),
				services: service_array
			}
		}).then(function(success){
				socketService.addListener('orders_'+success.data.id, orderListener);
				$http({
					method: 'GET',
					url: 'http://movamba.dev-xelentec.com:1337/api/orders/'+success.data.id,
					headers: {
						'auth_token': $scope.user.token
			}		}).then(function(response){
	    		
	    		$scope.order.status=response.data.status;
				console.log($scope.order.status);
	    	}, function(err){

	    		console.log(err);
	    	});
			
			
			if ($scope.order.files.length>0){
//$scope.doUpload= function(file) {
//
//         var dataUrl = "";
//         // Create an image
//         var img = document.createElement("img");
//         // Create a file reader
//         var reader = new FileReader();
//         // Set the image once loaded into file reader
//         reader.onload = function(e)
//         {
//             img.src = e.target.result;
//
//             var canvas = document.createElement("canvas");
//             //var canvas = $("<canvas>", {"id":"testing"})[0];
//             var ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//
//             // Set Width and Height
//             var MAX_WIDTH = 	960;
//             var MAX_HEIGHT = 12672;
//             var width = img.width;
//             var height = img.height;
//
//             if (width > height) {
//               if (width > MAX_WIDTH) {
//                 height *= MAX_WIDTH / width;
//                 width = MAX_WIDTH;
//               }
//             } else {
//               if (height > MAX_HEIGHT) {
//                 width *= MAX_HEIGHT / height;
//                 height = MAX_HEIGHT;
//               }
//             }
//             canvas.width = width;
//             canvas.height = height;
//             var ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0, width, height);
//
//             dataUrl = canvas.toDataURL("image/png");
// function dataURItoBlob(dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     var byteString;
//     if (dataURI.split(',')[0].indexOf('base64') >= 0)
//         byteString = atob(dataURI.split(',')[1]);
//     else
//         byteString = unescape(dataURI.split(',')[1]);
//
//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//
//     // write the bytes of the string to a typed array
//     var ia = new Uint8Array(byteString.length);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//
//     return new Blob([ia], {type:mimeString});
// }
//
// var blob = dataURItoBlob(dataUrl);
//     $scope.order.files.push(blob);
//
//       }
//
//         reader.readAsDataURL(file);
//       }
//
//		$scope.order.files.forEach(function(elem)
//       {
//		   $scope.doUpload(elem);
//       });
//     $scope.order.files =[];
     $scope.file_downloaded=false;
				for(var i=0; i<$scope.order.files.length;++i)
				{
					Upload.upload({
					url: 'http://movamba.dev-xelentec.com:1337/api/orders/'+success.data.id+'/uploads',
					headers: {
						'auth_token':  $scope.user.token
					},
					data: {
						images: $scope.order.files[i]
					}
				}).then(function(success){

						if(!$scope.file_downloaded)
						{
							$scope.file_downloaded=true;
							$scope.order = angular.extend(success.data, $scope.order);
							if(localStorageService.isSupported){
								var user_serialized = angular.toJson($scope.order, 1);
								localStorageService.set('order', user_serialized);
					}
					var now =  new Date();
					$scope.settings.endtime = now.getTime()+$scope.settings.first_circle_time*60*1000;
					showOrder();}
				});

}

			}else{
				$scope.order = angular.extend(success.data, $scope.order);
				if(localStorageService.isSupported){
					var user_serialized = angular.toJson($scope.order, 1);
					localStorageService.set('order', user_serialized);
				}
				var now =  new Date();
				$scope.settings.endtime = now.getTime()+$scope.settings.first_circle_time*60*1000;
				showOrder();
			}
			

		}, function(err){

			console.log(err);
		});
		
		}, function(err){
			console.log(err);
		});
	};


	var provePhone = function(){
		var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'template/approvephone_.html',
	        controller: 'phoneModalController',
	        backdrop: 'static',
	        windowClass	: 'movamba-modal',
	        resolve: {
	            mtds: function () {

	                return {save: editUser};
	            },
	            params: function () {
	                return $scope.user;
	            }
	        }
	    });

	     modalInstance.result.then(function (selectedItem) {
			 console.log(selectedItem);
			 if(selectedItem=='close')
			 {
				 $route.reload(); return;
			 }
	     	if(selectedItem!='cancel'){
				console.log(selectedItem);
	     	if(selectedItem)
	     	{
				$scope.user.id=selectedItem;
	     }
	    editUser();}
	 })

	}
$scope.to_pins=[];
$scope.some_flag=false;
$scope.circles=[];
$scope.inter=null;
var showAnimation=function()
{
	if($scope.some_flag)
	{
		$scope.removeCicrcles();
	}
	$scope.addCircles();

	$scope.some_flag=true;
	$scope.to_pins.push({image:{
	    url: './style/img/marker.png',        
	    size: [47, 97],
		anchor:[25,72]
	  },
		lat:$scope.order.start_lat,
		lon:$scope.order.start_lon
	});

//console.log($scope.order);
// 	console.log($scope.map);	
// $scope.some_flag=true;
// $scope.to_pins.push({image:{
// 	    url: './style/img/marker.png',        
// 	    size: [60, 97], 
// 	    origin: [0,0],
// 	    anchor: [0, 32]
// 	  },lat:$scope.order.start_lat+0.001,lon:$scope.order.start_lon-0.0005});

// var center = new google.maps.LatLng($scope.order.start_lat,$scope.order.start_lon);
// var center1 = new google.maps.LatLng($scope.order.start_lat-0.02,$scope.order.start_lon-0.01);

// $scope.map.setCenter(center1);
// $scope.map.setZoom(14);
// var sizes=[{min:150,max:600},{min:350,max:800},{min:550,max:1000},{min:750,max:1200}];
//       var circles=[];
//       for (var i=0; i<sizes.length;++i)
//        {
//          var circle = new google.maps.Circle({
//             center: center,
//             radius: sizes[i].min,
//             strokeColor: "#E16D65",
//             strokeOpacity: 0,
//             strokeWeight: 3,
//             fillColor: "green",
//             fillOpacity: 1
//         });
//       circles.push(circle);
//        circle.setMap($scope.map);
       
// }
//       $scope.circles=circles;

//        $scope.inter=  setInterval(function() {
//           for (var i=0; i<sizes.length;++i)
//        {
//            var direction = 1;
//         var rMin = sizes[i].min, rMax = sizes[i].max;
     
//             var radius = circles[i].getRadius();
//             if ((radius > rMax) || (radius < rMin)) {
//                 direction *= 1; 
//               circles[i].setRadius(sizes[i].min);
//               circles[i].fillOpacity=1;
//             }else{
//             circles[i].setRadius(radius + direction * 10);
//               circles[i].fillOpacity=0.6;
              
//             }}
//         }, 50);
}
$scope.intervals=[];

$scope.addCircles=function (lat,lon,mes)
{

	var center = new google.maps.LatLng($scope.order.start_lat,$scope.order.start_lon);
 var center1 = new google.maps.LatLng($scope.order.start_lat,$scope.order.start_lon);

$scope.map.setCenter(center1);
$scope.map.setZoom(14);
var sizes=[{min:100,max:1100},{min:100,max:1100},{min:100,max:1100},{min:100,max:1100},{min:100,max:1100},{min:100,max:1100}];
var times=[700,1400,2100,2800,3500];

      var circles=[];
      for (var i=0; i<sizes.length;++i)
       {
         var circle = new google.maps.Circle({
            center: center,
            radius: sizes[i].min,
            strokeColor: "#E16D65",
            strokeOpacity: 0,
            strokeWeight: 3,
            fillColor: 'green',
            fillOpacity: 1
        });
      circles.push(circle);
       circle.setMap($scope.map);
       
}
      $scope.circles=circles;

      function doSetTimeout(i,t) {
  setTimeout(function() {
  	doInterval(i);
   }, t);
}

	function doInterval(i)
	{
		function doSomething() {
			var rMin = sizes[i].min, rMax = sizes[i].max;
			var direction = 1;
            var radius = $scope.circles[i].getRadius();
            if ((radius > rMax) || (radius < rMin)) {
                direction *= 1; 
              $scope.circles[i].setRadius(sizes[i].min);
              $scope.circles[i].fillOpacity=1;
            }
			else
			{
            $scope.circles[i].setRadius(radius + direction * 10);
            $scope.circles[i].setOptions({fillOpacity:1-(($scope.circles[i].getRadius()/11)*0.01)});
            }
}
doSomething();
	$scope.intervals.push($interval(doSomething,38));
}
for (var i=0; i<$scope.circles.length;++i)
       {
       doSetTimeout(i,(i+1)*600);
       }

  

//  for (var i=0; i<$scope.circles.length;++i)
//        {
//        	setTimeout(function(){

// $interval(function() {
//        	//console.log(circles);
//        	// console.log('from '+mes);
//        	  var direction = 1;
        
//          i=0;
//         var rMin = sizes[i].min, rMax = sizes[i].max;
     
//             var radius = $scope.circles[i].getRadius();
//             if ((radius > rMax) || (radius < rMin)) {
//                 direction *= 1; 
//               $scope.circles[i].setRadius(sizes[i].min);
//               $scope.circles[i].fillOpacity=0.8;
//             }else{
//             $scope.circles[i].setRadius(radius + direction * 10);
//               $scope.circles[i].fillOpacity=0.6;
              
//             }}

//         }, 50);

//        	},i*100)
//        }
       // $scope.inter=  $interval(function() {
       // 	//console.log(circles);
       // 	// console.log('from '+mes);
       // 	  var direction = 1;
       //    for (var i=0; i<$scope.circles.length;++i)
       // {
         
       //  var rMin = sizes[i].min, rMax = sizes[i].max;
     
       //      var radius = $scope.circles[i].getRadius();
       //      if ((radius > rMax) || (radius < rMin)) {
       //          direction *= 1; 
       //        $scope.circles[i].setRadius(sizes[i].min);
       //        $scope.circles[i].fillOpacity=0.8;
       //      }else{
       //      $scope.circles[i].setRadius(radius + direction * 10);
       //        $scope.circles[i].fillOpacity=0.6;
              
       //      }}

       //  }, 50);
   //    console.log($scope.inter);
};
$scope.removeCicrcles=function()
{
	for (var i = 0; i < $scope.intervals.length; i++) {
		$interval.cancel($scope.intervals[i]);
	}
	$scope.intervals=[];
	for (var i = 0; i < $scope.circles.length; i++) {
			$scope.circles[i].setMap(null);
			$scope.circles[i]=null;

	};
		$scope.circles=[];
		
};

$scope.showDriver=function()
{
	var x=55.9670265;
	var y=37.79532550;
var center=new google.maps.LatLng(x,y);
$scope.map.setCenter(center);
$scope.map.setZoom(12);
$scope.driver_pins.push({image:{ url: './style/img/marker.png', size: [60, 97], origin: [0,0], anchor: [0, 32]},lat:x,lon:y});
$interval(function () {
	x-=0.0001;
	y-=0.0001;
    center=new google.maps.LatLng(x,y);
	$scope.map.setCenter(center);
for (var i = 0; i < $scope.driver_pins.length; i++) {
	$scope.driver_pins[i].lat=x;
	$scope.driver_pins[i].lon=y;
};
},10);


};
//setTimeout($scope.showDriver,3500);
// $timeout(function(){$scope.addCircles(55.7670265,37.59532550,'red');},2500);
// setTimeout($scope.removeCicrcles,13500);
// $timeout(function(){$scope.addCircles(55.7670265,37.59532550,'yellow');},15600);

// setTimeout(function(){$scope.addCircles(55.7670265,37.69532550);},1500);
// setTimeout(function(){$scope.addCircles(55.7670265,37.79532550);},1500);
// $scope.order.start_lat=55.7670265;
// 	$scope.order.start_lon=37.89532550;
	
//  setTimeout(function(){$scope.to_pins.push({image:{
// 	    url: './style/img/marker.png',        
// 	    size: [60, 97], 
// 	    origin: [0,0],
// 	    anchor: [0, 32]
// 	  },lat:$scope.order.start_lat+0.0015,lon:$scope.order.start_lon-0.0017}); $scope.addCircles(55.7670265,37.89532550);},3500);

//  setTimeout($scope.removeCicrcles,8000);
// setTimeout($scope.addCircles,12000);


    var registerUser = function () {

    	$http.get('http://movamba.dev-xelentec.com:1337/api/customer/register', {},{})
	    	.then(function(response){
	    		
	    		$scope.user = angular.extend(response.data, $scope.user);
	    		provePhone();
	    	}, function(err){

	    		console.log(err);
	    	});
    };

     $scope.items = [
			{id: 1, name: 'Я передумал ехать и отменяю заявку совсем'},
			{id: 2, name: 'Я хочу изменить параметры текущей заявки'},
			{id: 3, name: 'Я хочу удалить текущую и создать новую заявку'},
			{id: 0, name: 'Отравить жалобу'}
		];
    $scope.rejectOrder = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'template/rejectorder.html',
            controller: 'rejectModalController',
            backdrop: 'static',
            windowClass	: 'movamba-modal',
            resolve: {
                mtds: function () {
                    return {};
                },
                params: function () {
                    return {name: 'Создать заявку'};
                },items: function () {
                return $scope.items;
            }
            }
        });
         modalInstance.result.then(function (selectedItem) {
        try{
        $scope.selected =JSON.parse(selectedItem);}
        catch(exc)
        {
        	console.log(exc);
        	return;
        }
  	 if($scope.selected.id==0)
     {
     	
     	$http({
			method: 'POST',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/report',
			data: {
				text: $scope.selected.claim}
		}).then(function(success){
		});
     	return;
     }

 if($scope.selected.id==2)
     {
     	$http({
			method: 'PUT',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/'+$scope.order.id+'/cancel',
			headers: {
				auth_token: $scope.user.token
			},
			data: {
				reason: $scope.selected.name}
		}).then(function(success){
			$scope.step=1;
		},function(success){
			$scope.step=1;
		});
		localStorageService.remove('order');
     	$scope.step=1;
		$scope.order.id=null;
		$scope.removeCicrcles();
		$scope.to_pins=[];
			stored_order=null;
			$scope.order = order_template;
     	
     }
	   if($scope.selected.id!=10 && $scope.selected.id!=0 && $scope.selected.id!=2)
        {
      
        		$http({
			method: 'PUT',
			url: 'http://movamba.dev-xelentec.com:1337/api/orders/'+$scope.order.id+'/cancel',
			headers: {
				auth_token: $scope.user.token
			},
			data: {
				reason: $scope.selected.name}
		}).then(function(success){
		//	console.log(success.data);
			//console.log("Canceled");
			$scope.step=1;
			$scope.order.id=null;
			 $route.reload();
			 $scope.removeCicrcles();
			//$scope.settings = success.data.settings;
		},function(success){
		//	console.log(success.data);
			//console.log("Canceled");
			$scope.step=1;
			$scope.order.id=null;
			 $route.reload();
			 $scope.removeCicrcles();
			//$scope.settings = success.data.settings;
		});
	}

        
    }, function () {
        console.log('Modal dismissed at: ' + new Date());
    });
    };

	$scope.step = 1;

	$scope.showOptions = function(show){

		$scope.show_options = show;
	};

	$scope.backStep = function(){
		$scope.step--;
	};

	$scope.nextStep = function(){

		if ($scope.step==1 && $scope.stepforms.first.$valid){
			$scope.stepforms.err = false; $scope.step++;
		}else if($scope.step==2 && $scope.stepforms.second.$valid){
			$scope.stepforms.err = false; $scope.step++;
			window.scrollTo(0, 230);
		}else if($scope.step==3 && $scope.stepforms.third.$valid){
			$scope.stepforms.err = false;
			if (!$scope.user.id){
				registerUser();
			}else if(!stored_profile || $scope.user.phone!= stored_profile.phone){
    			provePhone();
    		}
		}else{
			$scope.stepforms.err = true;
		}

	};
	$scope.getFrom=function()
	{
	if (angular.isObject($scope.order.from) ){
			return $scope.order.from;
			
		}
		else
		{
			return $scope.proxyFrom;
			
		}
	};
	$scope.getTo=function()
	{
		if (angular.isObject($scope.order.to) ){
			return $scope.order.to;
		}
		else
		{
			return $scope.proxyTo;
		}
	};
		$timeout(function() { if (!localStorageService.get('order')){
			$scope.order.to=	JSON.parse('{"address_components":[{"types":["route"],"long_name":"По моему указанию","short_name":"По моему указанию"}],"geometry":{"location":{"lat":0.01,"lng":0.01}},"formatted_address":"По моему указанию"}');
//$scope.order.from=	JSON.parse('{"address_components":[{"types":["route"],"long_name":"По моему указанию","short_name":"По моему указанию"}],"geometry":{"location":{"lat":0.01,"lng":0.01}},"formatted_address":"По моему указанию"}');
}}, 800);

$scope.proxyTo=$scope.order.to;
$scope.watchTo=function()
{
  if (!$scope.order.to) {
	  $scope.stepforms.first.to. $setPristine();
	  $scope.order.to=	JSON.parse('{"address_components":[{"types":["route"],"long_name":"По моему указанию","short_name":"По моему указанию"}],"geometry":{"location":{"lat":0.01,"lng":0.01}},"formatted_address":"По моему указанию"}');
	  $scope.stepforms.first.$setValidity("to", true);
	  $scope.stepforms.first.to.$setValidity("place", true);
      }
  else
      {
	if(!$scope.order.to.address_components){
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.order.to+'&bounds=55.539474,37.171381|56.009478,38.107295&key=AIzaSyBRBl7R3RcoIZJVX70WoVDfB6VNJF4H_54'
		).then(function (data) {
         var user_input=$scope.order.to;
				for(var i=0;i<data.data.results.length;++i){
					var res = {
                        'address_components': [],
                        'geometry':{
                            'location':{
                                'lat':0,
                                'lng':0
                            }
                        },
                        'formatted_address': ''
                    };
 	var result=data.data.results[i];
 	res.address_components=result.address_components;
 	res.geometry.location=result.geometry.location;
 	res.formatted_address=result.formatted_address;
	var str='';
   	res.address_components.forEach(function(val){

   		if(val.types.indexOf("route")>=0 || val.types.indexOf('street_address')>=0 ||
   		 val.types.indexOf('street_number')>=0){
                            res.address_components.push({
                                types: val.types,
                                long_name: val.long_name,
                                short_name: val.short_name
                            });
                            str+=val.short_name+', ';
                        }
                    });

   	var temp=result.formatted_address.split(',');
   	if(Number.isNaN(Number.parseInt(temp[1])))
		var temp_string=temp[0];
	else
   		var temp_string=temp[0]+temp[1];

if(levenshtein_distance(user_input.toLowerCase(),temp_string.toLowerCase())<5)
{
	res.formatted_address=str;
$scope.order.to=res;
$scope.stepforms.first.$setValidity("to", true);
    $scope.stepforms.first.to.$setValidity("place", true);
}

 }


           });

      }

}
};
// $scope.$watch("order.to", function(newValue, oldValue) {
// 	//console.log(!newValue);
// if(newValue!=oldValue){
// 	console.log( $scope.stepforms.first.to.$error);
//   if (!$scope.order.to) {
//   	 //$scope.stepforms.first.to.$rollbackViewValue();
//   	 $scope.stepforms.first.to. $setPristine();
//  $scope.order.to=	JSON.parse('{"address_components":[{"types":["route"],"long_name":"По моему указанию","short_name":"По моему указанию"}],"geometry":{"location":{"lat":0.01,"lng":0.01}},"formatted_address":"По моему указанию"}');
  
//    $scope.stepforms.first.$setValidity("to", true);
//     $scope.stepforms.first.to.$setValidity("place", true);
//       }}
//   });
$scope.validateFiles=function($files)
{
	
	//console.log($files);
	//console.log($scope.order.files);

	

 //Upload.dataUrl($files[0], true).then(function(url){console.log(url);});
 //Upload.dataUrl($files[0], false).then(function(url){console.log(url);});

	// $files.forEach(function(elem){
	// 	//console.log(elem.toJSON());
	// 	console.log(elem.name);
	// })
	//console.log($files);
//$scope.order.files=[];
$files.splice(5,5);


	
}



	$scope.rmFile = function(index){
		$scope.order.files.splice(index,1);
	}

	$scope.changeOrderProperty = function(val, name){
		if (name == 'car_group' || name =='car_length'){

			$scope.show_slider = false;

			if (name == 'car_group'){
				$scope.order.car_length = val.lens[0];
			}else{
				$scope.order.car_length = val;
			}
			$scope.show_slider = true;
		}

		$scope.order[name] = val;


	};

	$scope.changeUserProperty = function(val, name){
		$scope.user[name] = val;
	};

	 var req = {
	  method: 'POST',
	  url: 'http://movamba.dev-xelentec.com:1337/api/drivers/map',
	  data: { top_left_lat: '85',top_left_lon:'-180',btm_right_lat:'-66',btm_right_lon:'140' }
	 };
	
	$scope.carsonmap=[];
		$scope.carsImages=[{
	    url: './style/img/pins/gazel.png',        
	    size: [47, 58]
	  },{
	    url: './style/img/pins/3tones.png',        
	    size: [47, 58]
	  },{
	    url: './style/img/pins/5_and_10.png',        
	    size: [47, 58]
	  },{
	    url: './style/img/pins/eurovan.png',        
	    size: [47, 58]
	  }
	  ,{
	    url: './style/img/pins/20_t.png',        
	    size: [47, 58]
	  },
	  {
	    url: './style/img/pins/long_vehicle.png',        
	    size: [47, 58]
	  }
	  ];
$scope.flag_=false;

$scope.showMarkers = function() {
    for (var key in $scope.map.markers) {
		    $scope.map.markers[key].setMap($scope.map);
    }
  };

  $scope.hideMarkers = function() {
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap(null);
    };
  };
		$scope.loaded=false;
		$scope.cars=[];
		$scope.processRequest=function(){
			$http(req).then(function(data)
		{

			$scope.loaded=true;
			$scope.carsonmap=data.data;
				if($scope.order.status&&$scope.order.status>40&&$scope.order.status<100)
				$scope.carsonmap=[];
			else
			for (var i = $scope.carsonmap.length - 1; i >= 0; i--) {

				if($scope.carsonmap[i].car >=1 && $scope.carsonmap[i].car <=19)
				{
					$scope.carsonmap[i].image=$scope.carsImages[0]; 
					continue;
				}

			if($scope.carsonmap[i].car >=20 && $scope.carsonmap[i].car <=22)
				{
					$scope.carsonmap[i].image=$scope.carsImages[1]; continue;
				}

				if($scope.carsonmap[i].car >=23 && $scope.carsonmap[i].car <=28)
				{
					$scope.carsonmap[i].image=$scope.carsImages[2]; 
					continue;
				}

				if($scope.carsonmap[i].car ==29 )
				{
					$scope.carsonmap[i].image=$scope.carsImages[2]; continue;
				}
				if($scope.carsonmap[i].car >=30 && $scope.carsonmap[i].car <=32 )
				{
					$scope.carsonmap[i].image=$scope.carsImages[4]; continue;
				}
				$scope.carsonmap[i].image=$scope.carsImages[2];
			};

	})};
		$scope.plus=function()
		{
			$scope.map.setZoom($scope.map.getZoom()+1);
		};
		$scope.minus=function()
		{
			$scope.map.setZoom($scope.map.getZoom()-1);
		};
	
	
$interval($scope.processRequest,5000);

	$scope.data = {
		cities: [{id:1,name:'Москва'}],
		services: [{id: 1, name: 'Переезд 1k квартиры'},
		 {id: 2, name: 'Переезд 2k квартиры'},
		 {id: 3, name: 'Переезд 3k квартиры'},
		 {id: 4, name: 'Офисный переезд'},
		 {id: 5, name: 'Дачный переезд'},
		 {id: 6, name: 'Вывоз мусора'}]
	};
$http.get('http://movamba.dev-xelentec.com:1337/api/regions/3', {
            params: {
              auth_token: $scope.user.token,
            }
          }).then(function (res) {
$scope.data.services=[];
			var counter=1;
          	res.data.settings.offerlist.forEach(function(elem){
$scope.data.services.push({id:counter++,name:elem});
          	});

          	//console.log($scope.data.services);
          });

	var cars=["0.1, 0.2","0.03, 0.3","0.3, 0.3","0.3, 0.6","0.2, 0.3","0.1, 0.3"];

	$scope.image = {
	    url: './style/img/car_flag.png',        
	    size: [47, 58], 
	    origin: [0,0],
	    anchor: [0, 32]
	  };
	  $scope.shape = {
	    coords: [1, 1, 1, 20, 18, 20, 18 , 1],
	    type: 'poly'
	  };
$scope.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
  $scope.$on('mapInitialized', function(event, map) {
  	if($scope.mobileAndTabletcheck())
  	map.setOptions({draggable: false});
  } );

$scope.cleanup=function()
{

};
$scope.getImageById=function(id)
{
if(id >=1 && id <=19)
return $scope.carsImages[0]; 
				
if(id >=20 && id <=22)
return $scope.carsImages[1]; 
				
if(id >=23 && id <=28)
return $scope.carsImages[2]; 

if(id ==29 )	
return $scope.carsImages[3]; 

if(id >=30 && id <=32 )
return $scope.carsImages[4];

return $scope.carsImages[2];
			
};
	  

}]);
