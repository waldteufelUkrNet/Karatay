/**
 * customerLogged
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  var token = req.headers['auth_token'];

  if (token){
  	Customers.findOne({token: token}).populate('region').exec(function(err, found){

  		if (found!=undefined){
        req.customer = found;
  			return next();
  		}else{
  			return res.forbidden('You are not permitted to perform this action.');
  		}
  	});
  }else{
  	// User is not allowed
	// (default res.forbidden() behavior can be overridden in `config/403.js`)
	return res.forbidden('You are not permitted to perform this action.');
  }
};
