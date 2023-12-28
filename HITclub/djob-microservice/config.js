module.exports ={
    mongo_host: 'mongodb://secretuserforhitclub:moresecretpassforhitclub@89.111.132.126:27017/dJob?authSource=admin',
    // mongo_host: 'mongodb://localhost:27017/',
    amqp_host: 'amqp://localhost:5672',
    sms_gate:{
        login: 'HITCLUB',
        pass: 'Ggagik203000'
    },
    mobile_jwt_secret:"MOBILE_JWT_SECRET",
    admin_jwt_secret:"ADMIN_JWT_SECRET",
    qiwi: {
        merchant_id: 3299,
        merchant_site: 2001720,
        owner_commission: 5,
        key: '/var/www/ms/privatekey.key',
        cert: '/var/www/ms/xitclub.crt',
        secret: "SQfOldNBBmtRfXLwyogUooOFUDruChlTMsHVSsXjoQXfPsEsnVaaTgenTWJnKyUN"
    }
};
