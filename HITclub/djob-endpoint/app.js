var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cluster = require('cluster');
var config = require('./config');
var api = require('./models/api');
var cors = require('cors');
var exphbs  = require('express-handlebars');

//socket_io ={};
var subscriber = require('./libs/subscriber');
if(!cluster.isMaster)
  setTimeout(async function(){await subscriber.startConnect();}, 3000);


//var Customer = require('./models/Customers');
//var Executor = require('./models/Executors');
const jwt = require('jsonwebtoken');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


var mobile_api = require('./routes/mobile/index');
var admin_api = require('./routes/admin/index');
var organization_api = require('./routes/organization/index');
var cron_api = require('./routes/cron/index');
var qiwi_api = require('./routes/qiwi/index');

var app = express();
app.use(cors());

app.engine('handlebars', exphbs({
    //defaultLayout: 'deeplink',
    layoutsDir: path.join(__dirname, 'views')
  }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/deep_link/:find_str',  function (req, res) {
  
    let customer_link = "https://hitclub.page.link/?link=https://www.google.com/&referral="+req.params.find_str+"&apn=app.hitclub.client&ibi=app.hitclub.client";
    let executor_link = "https://hitclub.page.link/?link=https://www.google.com/&referral="+req.params.find_str+"&apn=app.hitclub.client&ibi=app.hitclub.client";
    res.render('deeplink', {layout: false,
        helpers: {customer_link, executor_link }
    }
    );
             
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }});

// view engine setup

//app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(async function (req, res, next) {
  const token = req.headers['x-access-token'];
  const admin_token = req.headers['token'];
  const organization_token = req.headers['organization-token'];
  const lang = req.headers['lang'];
  req.input_user={};
  req.input_user.token=token;

  if(token) {
      jwt.verify(token, config.mobile_jwt_secret ,  async function(err, decoded){
          if(decoded.role=="EXECUTOR") {
              let tmp_user=await api.Executor.findOne({_id: decoded.id});

              if(!tmp_user)
                  return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
          } else if(decoded.role=="CUSTOMER") {
              let tmp_user=await api.Customer.findOne({_id:decoded.id});
              console.log("USER ", tmp_user)
              console.log("DECODED ", decoded)
              if(!tmp_user)
                  return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
          }

          req.input_user.user = decoded;
          console.log("req.input_user app.js ", req.input_user)
          // console.log(decoded)
          next()
      });
  } else if(admin_token) {
      jwt.verify(admin_token, config.admin_jwt_secret ,  async function(err, decoded){
      if(decoded.role == "ADMIN"){
              let tmp_user=await api.Admin.findOne({_id:decoded.id});
              console.log("USER ", tmp_user);
              if(!tmp_user)
                  return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
          }

          req.input_user.user = decoded;
          // console.log(decoded)
          next()
      });
  } else if(organization_token) {
      jwt.verify(organization_token, config.referral_jwt_secret ,  async function(err, decoded){
              /*let tmp_user=await api.Admin.findOne({_id:decoded.id});
              console.log("USER ", tmp_user);
              if(!tmp_user)
                  return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });*/


          req.input_user.user = decoded;
          // console.log(decoded)
          next()
      });
  } else
    next()
});


app.use('/mobile_api', mobile_api);
app.use('/admin_api', admin_api);
app.use('/organization_api', organization_api);
app.use('/cron', cron_api);
app.use('/qiwi', qiwi_api);

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));

app.use('/management', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
