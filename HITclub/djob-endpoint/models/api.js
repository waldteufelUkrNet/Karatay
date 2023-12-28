var Customer = require('./Customers');
var Executor = require('./Executors');
var Config = require('./Configs');
var Speciality = require('./Speciality');
var SpecialtyGroup = require('./SpecialtiesGroups');
var Admin = require('./Admins');
var mongoose = require('mongoose');

var exports = module.exports = {};

exports.Customer = Customer.model;
exports.Executor = Executor.model;
exports.Config = Config.model;
exports.mongoose = mongoose;
exports.Speciality = Speciality.model;
exports.SpecialtyGroup = SpecialtyGroup.model;
exports.Admin = Admin.model;
