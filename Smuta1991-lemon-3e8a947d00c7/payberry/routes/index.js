const express = require('express');
const router = express.Router();
const axios = require('axios');
const AxiosLogger = require('axios-logger');
const api = require('../models/api.js');
const moment = require('moment');
const {Op} = require('sequelize')
const getDattimeFromString = (input) => {
  return new Date(input.replace(
    /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
    '$4:$5:$6 $2/$3/$1'
));
}

const formatPhone = (input) => {
  return `+${input.substring(0,1)}(${input.substring(1,4)}) ${input.substring(4,7)}-${input.substring(7,9)}-${input.substring(9)}`
}

const checkPhone = (input) => {
  if(!input)
    return false;

  var thenum = input.replace(/\D/g, ""); // replace all leading non-digits with nothing
  console.log(thenum)
  if(thenum.length !== 11 || thenum[0] !== '7')
    return false;
  
  thenum = formatPhone(thenum);
  console.log('final ',thenum)
  return thenum;
}

// callback api for payberry
router.get('/endpoint', async function(req, res, next) {
  res.set('Content-Type', 'text/xml');
  let {
    TransactionId,
    Amount,
    TransactionDate,
    Account,
    QueryType,
    Comment,
    RevertId,
    RevertDate
  } = req.query;
  let new_request, query_result, fromatted_phone, user_account;
  try{
    
    // tmp Account = service_id
    let old_response = await api.PayberryRequest.findOne({
      where: {
        transaction_id: TransactionId,
        query_type: QueryType || null
      }
    })
    if(old_response){
      res.send(old_response.query_result);
      return;
    }
    


    // let parsedUrl = url.parse(rawUrl);
    // let parsedQs = querystring.parse(parsedUrl.query);

     new_request = await api.PayberryRequest.create({
      transaction_id: TransactionId,
      amount: Amount || null,
      transaction_date_str: TransactionDate || null,
      account: Account || null,
      query_type: QueryType || null,
      comment: Comment || null,
      query_url: req.originalUrl,
      transaction_date: TransactionDate ? getDattimeFromString(TransactionDate) : null
    })
    
    
  //check, pay, cancel
    if(Account){
      fromatted_phone  = checkPhone(Account);
      if(!fromatted_phone){
        query_result = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
         <TransactionId>${TransactionId}</TransactionId>
         <ResultCode>3</ResultCode>
         <Comment></Comment>
        </Response>`
        await new_request.update({query_result})
        return res.send(query_result)
      }

      user_account = await api.Services.findOne({where: {
        telnum: fromatted_phone,
        is_individual_driver: true
      }});

      if(!user_account){
        query_result = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
         <TransactionId>${TransactionId}</TransactionId>
         <ResultCode>21</ResultCode>
         <Comment></Comment>
        </Response>`
        await new_request.update({query_result})
        return res.send(query_result)
      }
    }
    if(QueryType && QueryType === 'check' && user_account){

      query_result = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
       <TransactionId>${TransactionId}</TransactionId>
       <ResultCode>0</ResultCode>
       <Fields>
        <field1 name="service_name">${user_account.name}</field1>
      </Fields>
       <Comment></Comment>
      </Response>`
      await new_request.update({query_result, success:true})
      return res.send(query_result)
    } 
    else
    if(QueryType && QueryType === 'pay' && user_account){

      let summ = parseInt(Math.round(parseFloat(Amount)));
      console.log(summ)
      if(!summ){
        query_result = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
         <TransactionId>${TransactionId}</TransactionId>
         <ResultCode>241</ResultCode>
         <Comment></Comment>
        </Response>`
        await new_request.update({query_result})
        return res.send(query_result)
      }

      await user_account.update({ balance: user_account.balance + summ });
      let ind_driver = await api.Drivers.findOne({where: {
        service_id: user_account.id
      }})
      if(user_account.is_individual_driver  && ind_driver) {

        await api.DriverTransaction.create({ 
          value: summ,
          driver: ind_driver.id
        })
      }

      query_result = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
       <TransactionId>${TransactionId}</TransactionId>
       <TransactionExt>${new_request.id}</TransactionExt>
       <Amount>${Amount}</Amount>
       <ResultCode>0</ResultCode>
       <Comment></Comment>
      </Response>`
      await new_request.update({query_result, success:true})

      return res.send(query_result)
    }
    else
    if(QueryType && QueryType === 'cancel' && user_account){

      query_result = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
       <TransactionId>${TransactionId}</TransactionId>
       <RevertId>${RevertId}</RevertId>
       <TransactionExt>${new_request.id}</TransactionExt>
       <Amount>${Amount}</Amount>
       <ResultCode>22</ResultCode>
       <Comment>:(</Comment>
      </Response>`
      await new_request.update({query_result, success:false})
      return res.send(query_result)
    } 
  }
  catch(e){
    console.log(e)
  }
  if(new_request){
    query_result = `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
      <TransactionId>${TransactionId}</TransactionId>
      <ResultCode>2</ResultCode>
      <Comment></Comment>
      </Response>`
    await new_request.update({query_result, success:false})
    return res.send(query_result)
  }
});


router.get('/pay_day_report', async function(req, res, next) {

  res.set('Content-Type', 'text/xml');

  try{
    let {
      CheckDateBegin,
      CheckDateEnd
    } = req.query;

    // tmp Account = service_id
    let responses = await api.PayberryRequest.findAll({
      where: {
        query_type: "pay",
        success: true,
        transaction_date: {
          [Op.between]: [
            getDattimeFromString(CheckDateBegin),
            getDattimeFromString(CheckDateEnd)
          ]
        }
      }
    })

    let inner_str = "";
    for( let i=0; i<responses.length; i++){
      inner_str += `
      <Payment>
      <TransactionId>${responses[i].transaction_id}</TransactionId>
      <Account>${responses[i].account}</Account>
      <TransactionDate>${responses[i].transaction_date_str}</TransactionDate>
      <Amount>${responses[i].amount}</Amount>
      </Payment>`;
    }


    let resp_text = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
    ${inner_str}
    </Response>`
    
    return res.send(resp_text);
  }
  catch(e){
    console.log(e)
  }
    return res.status(500);
});


module.exports = router;
