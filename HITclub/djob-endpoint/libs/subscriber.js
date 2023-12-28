const amqp = require('amqplib/callback_api');
var config = require('../config');
var process = require('process');
let amqpConn;

var availableKeyList = [];

  var routingKey = "EndpointQueue";

// DEPRECATED ( FOR REMOVE??? )
function awaitServiceResponse(key){

    availableKeyList.push(key);
      console.log("request on worker ",process.pid)
      console.log("availableKeyList",availableKeyList)
    return new Promise(async (response) => {
        amqpConn.createChannel(function(err, ch) {
            if(err){
                ch.close();
                return false;
            }

            ch.on("error", function(err) {
                console.error("[AMQP] channel error", err.message);
            });
            ch.on("close", function() {
                console.log("[AMQP] channel closed");
            });
            ch.prefetch(1);

            ch.assertQueue(routingKey, { durable: true }, function(err, _ok) {
                if(err){
                    ch.close();
                    return false;
                }
                ch.consume(routingKey, function (msg) {
                    let msgData = JSON.parse(msg.content.toString());
                    console.log('msgData', msgData)
                    if(msgData.key && msgData.key === key){
                        ch.ack(msg);
                        ch.close();
                        response(msgData.data);
                    } else {
                        if(!msgData.key || availableKeyList.indexOf(msgData.key) === -1){
                            ch.ack(msg);
                        }
                    }
                }, { noAck: false });
            });
        });
    })
}


async function reciveClusterMessages(){
  process.on('message', (msg) => {
    if (msg.topic && msg.topic === "REQUEST_RESPONSE") {
        msgData=msg.value;
        console.log("GOT MULtiCLUSTER MESSAGE ON PID: ", process.pid)
        if(request_channels[msgData.key]){
          request_channels[msgData.key].res.status(200).json(msgData.data);
          delete request_channels[msgData.key];
          console.log("SENT RESPONSE TO REQUEST ON WORKER ",process.pid)
        }
    }
  });


}

async function startConnect(){
  //console.log(socket_channels)
      let io = await socket_io;

      reciveClusterMessages();
      console.log("CREATING NEW CONNECT TOT RAMMIT_MQ")
        let routingKey = "EndpointQueue";
    amqp.connect(config.amqp_host, function(err, amqpConnect) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(startConnect, 1000);
        }
        amqpConnect.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        amqpConnect.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(startConnect, 1000);
        });

        amqpConn = amqpConnect;

        amqpConn.createChannel(function(err, ch) {
            if(err){
                ch.close();
                return false;
            }

            ch.on("error", function(err) {
                console.error("[AMQP] GLOBAL channel error", err.message);
            });
            ch.on("close", function() {
                console.log("[AMQP] GLOBAL channel closed");
            });
            ch.prefetch(1);

            ch.assertQueue(routingKey, { durable: true }, function(err, _ok) {
                if(err){
                    ch.close();
                      console.error("[AMQP] GLOBAL channel error", err.message);
                }

                ch.consume(routingKey, function (msg) {
                  console.log("request on worker (GLOBAL CHANNEL)",process.pid)
                  console.log("availableKeyList (GLOBAL)",availableKeyList)
                    let msgData = JSON.parse(msg.content.toString());
                  //  console.log('msgData', msgData)

                        // Все полученные сообщения (с экшеном "REQUEST_RESPONSE") с РЕББИТА транслируем через Мастер (кластера) на Веркер по PID
                    console.log('!!!!: ', msgData);
                        if(msgData.action==="request_response" && msgData.worker_pid){
                            process.send({ topic: "REQUEST_RESPONSE", value:msgData, pid:msgData.worker_pid });
                            // закрываем АКК сообщения в любом случае, т.к. он будет делегирован на другой (воможно) процесс
                            ch.ack(msg);
                        }
                        else if(msgData.action==="socket_message" ){
                             console.log("SENT SOME DATA TROUGH SOCKET", msgData )
                            io.to(msgData.target_role+"_"+msgData.target_id).emit(msgData.event,msgData.data);

                            ch.ack(msg);
                        }
                        /*
                        if(!msgData.key || availableKeyList.indexOf(msgData.key) === -1){
                            ch.ack(msg);
                        }*/

                }, { noAck: false });
            });
        });
    });
}


var exports = module.exports = {};
exports.awaitServiceResponse = awaitServiceResponse;
exports.startConnect = startConnect;
