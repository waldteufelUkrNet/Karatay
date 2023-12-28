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

AcceptedVersions.findOne({os: req.headers['os'], app_version: req.headers['app_version'], type: ['driver', 'customer']}, function(version_err, found_version){
  if(version_err)
    console.log("version_err ",version_err)
  if(!found_version)
    return res.ok({error: 'UNSUPPORTED_VERSION'});

  return next();

  });
};
