var Sequelize = require('sequelize');
var connection = require('./connection.js');
var exports = module.exports = {};

var Drivers = connection.sequelize.define('drivers',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
        }
        

    }, {
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });

exports.Drivers = Drivers;
