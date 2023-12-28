var exports = module.exports = {};
var api = require('../models/api.js');
const jwt = require('jsonwebtoken');
const config = require("../config");
const moment = require('moment');
let redis = require("redis");
const socket_io_redis = require('socket.io-redis');

let io;
let users = [];

async function  getUserSocket (io, user_id, role){
 let list = [];
 for(var id in io.sockets.sockets)
 {
     if(io.sockets.sockets[id].user && io.sockets.sockets[id].user.id===user_id && io.sockets.sockets[id].user.role===role)
     	list.push(io.sockets.sockets[id]);
 }
 return list;

}

const cluster = require('cluster');

exports.initChat = async function(server) {


   var RedisStore = require('socket.io-redis')
        , pub    = redis.createClient()
        , sub    = redis.createClient()
        , client = redis.createClient();

     io = require('socket.io').listen(3003, {
        'store' :new RedisStore({
                redisPub : pub
              , redisSub : sub
              , redisClient : client
        }),
    });

     io.adapter(socket_io_redis({ host: 'localhost', port: 6379 }));
     const io_emitter = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });


     console.log("SOCKETS INIT on worker ${process.pid}")
io.on('connection', (socket) => {

  console.log("conect worker id ",cluster.worker.id);


    socket.on('AUTH', async function(data) {
       console.log("AUTH DATA ",data);
       if(typeof data !== 'object'){
         try{
           console.log("pre data ", typeof data)
           if(typeof data === 'string')
              data = JSON.parse(data);
         }
         catch(e)
          {
            console.log("Cought AUTH error ")
          }
       }
     	if(!data || !data.token )
     		return socket.emit("AUTH", {status:"ERROR", message:"MISSING_INPUT_PARAMS"});

     	let token = data.token;

     console.log("AUTH worker id ",cluster.worker.id);


      jwt.verify(token, config.mobile_jwt_secret ,  async function(err, decoded){
        if (err) {
        console.log("AUTH  TOKEN ERROR ",err);
          return socket.emit("AUTH", {status:"ERROR", message:"INVALID_TOKEN"});
        }


          let old_user_sockets = await getUserSocket(io,  decoded.id , decoded.role);

         io.to(decoded.role+"_"+decoded.id).emit("AUTH_ERROR", {});
            console.log('AUTH ERROR sent')


        io.of('/').in(decoded.role+"_"+decoded.id).clients(async (error, socketIds) => {
          if (error) throw error;


            if(socketIds.length){
              var ctr = 0;
                for(let ci=0; ci<socketIds.length; ci++)
                  if(socketIds[ci])
                    io.of('/').adapter.remoteLeave(socketIds[ci], decoded.role+"_"+decoded.id);
                socket.join(decoded.role+"_"+decoded.id);
            }
            else{
               socket.join(decoded.role+"_"+decoded.id);
            }
            console.log("socket onnected to room")
              console.log("sockets in room "+decoded.role+"_"+decoded.id+" ", socketIds)


              users.push({socket_id: socket.id, user_id: decoded.id })
              socket.user = decoded;

              let user;
              console.log("serch stage")
              if(decoded.role==="CUSTOMER" )
                user = await api.Customer.findOne({ _id: decoded.id });
              if(decoded.role==="EXECUTOR" )
                user = await api.Executor.findOne({ _id: decoded.id });


              if(decoded.role==="EXECUTOR"){
                io.to(decoded.role+"_"+decoded.id).emit("AUTH", {status:"OK", message:"SUCCESS", data:{}});
              }
              else{
                 io.to(decoded.role+"_"+decoded.id).emit("AUTH", {status:"OK", message:"SUCCESS", data:{}});
               }
        });


      });

  });

});

return io;
}

exports.io = io;
