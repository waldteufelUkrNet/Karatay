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

  AcceptedVersions.findOne({os: req.headers['os'], app_version: req.headers['app_version'], type: 'driver'}, function(version_err, found_version){
    if(version_err)
      console.log("version_err ",version_err)
    if(!found_version)
      return res.ok({error: 'UNSUPPORTED_VERSION'});

  	AccessTokens.findOne({token: req.headers['auth_token']}, function(err, found){

      if (err){
        return res.notFound(err);
      }

  		if (found!=undefined){

        Drivers.findOne({id: found.driver}).populate('service').exec(function(err, driver){

          if (err){
            return res.notFound(err);
          }
          
          req.driver = driver;
          return next();
        });
        
  		}else{
  			return res.forbidden('You are not permitted to perform this action.');
  		}
    });
  });
};
