var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var PayberryRequests = connection.sequelize.define('payberry_requests',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        transaction_date_str: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        account: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        query_type: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        result_code: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        comment: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        transaction_date: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        amount: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        query_url: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        query_result: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        success: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }


    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.PayberryRequests = PayberryRequests;
