const config      = require('../nigatif/config'),
      express     = require('express'),
      router      = express.Router(),
      mysql       = require('mysql'),
      SibApiV3Sdk = require('sib-api-v3-sdk'),
      nigatif     = require('../nigatif');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

router.get('/', function(req, res, next) {
  res.render('sendinbluetest', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
////////////////////////////////////////////////////////////////////////////////

  let body = {
    phone: '+179011234567',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'CUSTOM'
  };

  nigatif.handler({ body: JSON.stringify(body) }, {}, cb);

  function cb(err,result) {

    let emailOptions = {
      messageSubject : 'Заявка № ' + result.data.id,
      messageNumber  : result.data.id,
      messageDate    : result.data.time,
      clientName     : 'Вася Пупкін',
      clientPhone    : body.phone,
      messageText    : body.text,
      staticFilesSrc : 'http://wtwt.pp.ua/temp/',
    };

    let connection = mysql.createConnection(config.mysql);
    connection.connect();

    connection.query('SELECT email FROM keyboard_feedback_emails', (err, adminsEmails) => {
      if (err) throw new Error('DATABASE ERROR, query: SELECT email FROM keyboard_feedback_emails');
      if (adminsEmails) {
        res.status(200).render('feedback.pug', emailOptions, function(err, html){
          if (err) throw err;
          // res.send(html);
          new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
            {
              'subject'     : emailOptions.messageSubject,
              'sender'      : {'email': 'server@zhabka.ua', 'name': 'Жабка (повідомлення від сервера)'},
              'to'          : adminsEmails,
              'htmlContent' : html
            }
          )
          .then(res => {
            // do something if ok
            console.log(res);
          })
          .catch(err => console.error(err));
        });
      }
    });
  }
////////////////////////////////////////////////////////////////////////////////
});

module.exports = router;