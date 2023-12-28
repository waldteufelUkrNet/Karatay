var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Services = connection.sequelize.define('services',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        balance: {
            type: Sequelize.INTEGER,
            defaultValue:null
        },
        telnum: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        name: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        is_individual_driver: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
        // individual_driver_id: {
        //     type: Sequelize.INTEGER,
        //     defaultValue: null
        // }

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Services = Services;
