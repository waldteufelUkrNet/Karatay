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
  
};
