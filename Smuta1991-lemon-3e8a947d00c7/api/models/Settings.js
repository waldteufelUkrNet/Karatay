/**
* Settings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var map = {
    customer: {
        name: {},
        content: {}
    },
    driver: {
        name: {},
        content: {}
    }
};

var cache = {};

module.exports = {

  attributes: {

  	name: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    content: {
      type: 'text'
    },

    getGrpFields: function(grp) {
        return map[grp];
    }
  },

  getValue: function(name, cb) {
    if (cache[name]) {
        return cb(cache[name]);
    }

    Settings.findOne(name, function(err, item){
        if (err) return cb('');
        if (!item) return cb('');
        var value = item.content;
        // if (id == 'address') {
        //     value = JSON.parse(value);
        // }
        cb(value);
    });
  },

  getValues: function(names, cb) {
    Settings.find(names, function(err, items){
        if (err) return cb({});
        if (!items) return cb({});
        var values = {};
        items.forEach(function(item){
          values[item.name] = item.content;
        });
        names.forEach(function(name){
          if (!values[name]) {
            values[name] = '';
          }
        });
        cb(values);
    });
  },

  setValue: function(name, content, cb) {
    if (_.isObject(content)) {
        content = JSON.stringify(content);
    }
    cache[name] = content;
    Settings.findOne(name, function(err, item){
        if (err) return cb(err);
        if (!item) return Settings.create({name: name, content: content}, cb);
        Settings.update(id, {content: content}, cb);
    });
  },

  setValues: function(values, cb) {
    var make = [];

    _.forEach(values, function(val, id){
        make.push(function(_cb){
            Settings.setValue(id, val, _cb);
        });
    });
    async.each(make, function(fn, _cb){
        fn(_cb);
    }, function(err){
        cb(err);
    });
  },

  getAll: function(cb){
    Settings.find().exec(function(err, items){
        var result = {};
        items.forEach(function(item){
            result[item.name] = item.content;
        });
        cb(result);
    });
  }
};

