function sendMessage(device,token,title,body,callback)
{


 
        if(device=='android') {

        var gcm = require('node-gcm');
        var message = new gcm.Message({
            collapseKey: 'demo',
            priority: 'high',
            contentAvailable: true,
            delayWhileIdle: true,
            timeToLive: 3,


         data: {
            message: 'message1'
        },
        notification: {
            title: "Movamba",
                icon: "ic_launcher",
                body: title
        }
        });
     //   message.addData('message','йцу');
message.addData('message',title);
           // var sender = new gcm.Sender('AIzaSyDPWusQAo2ESeHV3y_hwUjuLyCUtJNpu5I');
 var sender = new gcm.Sender('AIzaSyCIxwkI3NYL05TBscHDl8NyQPwfGQ-6DoA');
console.log ("SERVER KEYAI AIzaSyCIxwkI3NYL05TBscHDl8NyQPwfGQ-6DoA");



            var registrationIds = [];
            console.log("sending driver push",message);

               registrationIds.push(token);
console.log("tokens",registrationIds );
            console.log("push to driver", token);
             sender.sendNoRetry(message, { registrationIds: registrationIds }, function(err, result) {
console.log("perr",err);
console.log("presult",result);
    callback(err, result);
});

        };



if(device=="ios"){
            var path = require('path');
            var apn = require('apn');

var note = new apn.Notification();
note.alert = title;
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "ping.aiff";



var options = {
    production:true,
   // errorCallback: callback,
    cert:require('path').resolve(sails.config.appPath, 'api/services/keys/cert.pem'),
    key:  require('path').resolve(sails.config.appPath, 'api/services/keys/key.pem')

};
var apnsConnection = new apn.Connection(options);


    
    try {
     var   myDevice = new apn.Device(token);

    apnsConnection.pushNotification(note,myDevice);}
    catch(exc)
    {
        console.log(exc);
    }



callback(null,"ok");

};

}


var exports = module.exports = {};
exports.sendMessage=sendMessage;
