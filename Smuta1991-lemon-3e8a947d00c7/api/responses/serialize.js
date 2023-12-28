/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.serialize();
 * return res.serialize(data, group);
 * return res.serialize(data, group, code);
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function serialize (data, group, code) {

  code = code || 200;

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(code);

  data = Serializer(group, data, true);
  return res.jsonx(data);
};
