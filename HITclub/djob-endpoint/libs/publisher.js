const publisher = require('amqplib/callback_api');
var config = require('../config');
var cluster = require('cluster');
var libs = require('./general');

var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

function start(){
    publisher.connect(config.amqp_host, function(err, conn) {
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

function publish(content) {
    let exchange = '';
    let routingKey = 'MicroservicesQueue';
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

function sendTask(action, req, res, data ){
    let uniqKey = libs.randomKey(32);

  request_channels[uniqKey]={res};
    console.log("req.input_user publisher ", req.input_user);
  let body_tmp = {
      action,
      user: req.input_user.user,
      worker_pid: 0,
      key: uniqKey,
      data
  };
  if(cluster.worker)
    body_tmp.worker_pid= cluster.worker.id;
  publish(
      new Buffer(
          JSON.stringify(
              body_tmp
          )
      )
  );
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}
start();


var exports = module.exports = {};
exports.publish = publish;
exports.sendTask = sendTask;
