var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var DriverTransaction = connection.sequelize.define('individual_driver_transactions',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: Sequelize.DOUBLE,
            defaultValue:null
        },
        driver: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        payment_type: {
            type: Sequelize.STRING,
            defaultValue: 'Payberry'
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'payberry'
        },
        
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.DataTypes.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.DataTypes.NOW
        }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.DriverTransaction = DriverTransaction;
