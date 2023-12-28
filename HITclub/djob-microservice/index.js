var mongoose = require('mongoose');
var config = require('./config');
var libs = require('./libs/general');
const amqp = require('amqplib/callback_api');
const api = require('./models/api');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('debug', false);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

var microservice = require('./microservices/index');
global_db_configs = {};

let amqpConn;
function start(){
    amqp.connect(config.amqp_host, async function(err, ch) {
      console.log("CONNECTED FROM index.js")
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        ch.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        ch.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        amqpConn = ch;

        await libs.initGlobalDbConfig();
        runActions();
    });
}

start();

function runActions() {
    amqpConn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });
        ch.prefetch(10);
        ch.assertQueue("MicroservicesQueue", { durable: true }, function(err, _ok) {
            if (closeOnErr(err)) return;
            microservice.setChannel(ch);
            ch.consume("MicroservicesQueue", microservice.start, { noAck: false });
            console.log("Worker is started");
        });
    });
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}
