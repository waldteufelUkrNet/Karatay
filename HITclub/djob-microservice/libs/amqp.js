var config = require('../config');
const amqp = require('amqplib/callback_api');

var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

function start(){
    amqp.connect(config.amqp_host, function(err, conn) {
      console.log("CONNECTED FROM amqp.js")
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });

        amqpConn = conn;
        startPublisher();
    });
}

function startPublisher() {
    amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
            var m = offlinePubQueue.shift();
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
}

function publish(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

function sendSocketMessage(event, role, id, data) {
    publish("", "EndpointQueue",
        new Buffer(
            JSON.stringify(
                {
                    action:"socket_message",
                    event:event,
                    target_role:role,
                    target_id:id,
                    data: data
                }
            )
        )
    );
}


function sendMSTask(task) {
    publish("", "MicroservicesQueue",
        new Buffer(
            JSON.stringify(
              task
                /*{
                    action:"socket_message",
                    event:event,
                    target_role:role,
                    target_id:id,
                    data: data
                }*/
            )
        )
    );
}

start();

var exports = module.exports = {};
exports.publish = publish;
exports.sendSocketMessage = sendSocketMessage;
exports.sendMSTask = sendMSTask;
