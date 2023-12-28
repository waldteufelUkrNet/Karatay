let FCM = require('fcm-node');
var request = require('request');
var apiKey = 'AIzaSyD4to9Q7q1-FAAV0RFUpBr1t2K05nC4Lq4';

const moment = require('moment');
let async_request = require('async-request');

async function getMap(order, executor, transport_type = "LEGS"){
    let start_time = moment();
    console.log("start_time", start_time)
    let resp_obj = {expected_time:0, path:null};


    let URL;
    if(transport_type === "LEGS")
    {
        URL = "https://maps.googleapis.com/maps/api/directions/json?mode=walking&key="+apiKey;
    }
    else //if(transport_type === "CAR")
    {
        console.log("drv mode")
        URL = "https://maps.googleapis.com/maps/api/directions/json?mode=driving&key="+apiKey;
    }
    URL=URL+"&origin="+executor.lat+","+executor.lon+
    "&destination="+order.address.lat+","+order.address.lon;
    console.log("URL ",URL);
    let response = await async_request(URL);
    response = JSON.parse(response.body);
    if(transport_type === "LEGS")
    {
        if(response.routes && response.routes[0] && response.routes[0].legs && response.routes[0].legs[0] && response.routes[0].legs[0].duration)
        {
            resp_obj.expected_time = 1000 * response.routes[0].legs[0].duration.value; //(изначально в секундах, теперь в миллисекунха)
            console.log("EXPECTED TIME(LEGS AUTHO) ",resp_obj.expected_time);
        }
        else {
            let temp_dist = Math.round( distanceInKmBetweenEarthCoordinates(executor.lat, executor.lon, order.address.lat, order.address.lon ));
            console.log("pre EXP TIME MATH");
            resp_obj.expected_time = Math.round(temp_dist*20)*60*1000; // со скоростью 3 км в час (в миллисекунха)
            console.log("EXPECTED TIME(LEGS MANUAL) ",resp_obj.expected_time);
        }
    }
    else if(transport_type === "CAR")
    {

        console.log("GOOGLE MAPS CAR OBJECT ", response.geocoded_waypoints[0].types );

        if(response.routes && response.routes[0] && response.routes[0].legs && response.routes[0].legs[0] && response.routes[0].legs[0].duration)
        {
            resp_obj.expected_time = 1000 * response.routes[0].legs[0].duration.value; //(изначально в секундах, теперь в миллисекунха)
            console.log("EXPECTED TIME(CAR AUTHO) ",resp_obj.expected_time);
        }
        else {
            let temp_dist = Math.round( distanceInKmBetweenEarthCoordinates(executor.lat, executor.lon, order.address.lat, order.address.lon ));
            console.log("pre EXP TIME MATH");
            resp_obj.expected_time = Math.round(temp_dist*60/40)*60*1000; // со скоростью 3 км в час (в миллисекунха)
            console.log("EXPECTED TIME(LEGS MANUAL) ",resp_obj.expected_time);
        }
    }

    if(response.routes && response.routes[0] && response.routes[0].overview_polyline && response.routes[0].overview_polyline.points)
        resp_obj.path = response.routes[0].overview_polyline.points;

    resp_obj.expected_time = resp_obj.expected_time + 10*60*1000; //+ 10 min in milliseconds

    if(resp_obj.expected_time > 2147483646 )
        resp_obj.expected_time = 2147483646;


    var local_duration = moment.duration(moment().diff(start_time));
    var local_seconds = local_duration.asSeconds();
    console.log("google request time ",local_seconds);

    return resp_obj;
}

var rad = function(x) {
    return x * Math.PI / 180;
};


//дистанция в метрах
function getDistance(p1, p2){
    console.log("Coords 1: "+p1.lat+" "+p1.lon)
    console.log("Coords 2: "+p2.lat+" "+p2.lon)
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lon - p1.lon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

async function getAutocomplete(text){


    let URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key="+apiKey;
    URL=URL+"&input="+text;

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };

    var options = {
        url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        method: 'GET',
        headers: headers,
        qs: {
            key: 'AIzaSyD4to9Q7q1-FAAV0RFUpBr1t2K05nC4Lq4',
            input: text,
            location: "47.977895,37.776187",
            types: 'address',
            radius:"1"
        }
    };

    await  request(options, async function (error, response, body) {
        response = JSON.parse(response.body);
        console.log(response)
        return response;
    });



}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}



var exports = module.exports = {};
exports.getMap=getMap;
exports.getAutocomplete=getAutocomplete;
exports.getDistance=getDistance;
