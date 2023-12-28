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
	if(!req.headers['os'] || !req.headers['app_version'])
	return res.ok({error: 'UNSUPPORTED_VERSION'});

AcceptedVersions.findOne({os: req.headers['os'], app_version: req.headers['app_version'], type: 'customer'}, function(version_err, found_version){
	if(version_err)
		console.log("version_err ",version_err)
	if(!found_version)
	return res.ok({error: 'UNSUPPORTED_VERSION'});

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

	});
};
