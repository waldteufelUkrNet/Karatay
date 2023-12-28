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
message.addData('title',"Movamba");
            var sender = new gcm.Sender('AIzaSyAg25WzwgMcqry5rI4UFLgMcZBa47rjR9w');


            var registrationIds = [];
            
               registrationIds.push(token);
            
             sender.sendNoRetry(message, { registrationIds: registrationIds }, callback);

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
