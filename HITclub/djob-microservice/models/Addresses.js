var mongoose = require('mongoose');
var {decimal2JSON} = require('./baseService');

let AddressesSchema = new mongoose.Schema({
    lat: {type: mongoose.Schema.Types.Decimal128, default: null},
    lon: {type: mongoose.Schema.Types.Decimal128, default: null},
    name: {type: String, default: null},
    flat: {type: String, default: null},
    front: {type: String, default: null},
    code: {type: String, default: null},
    floor: {type: String, default: null},
    type: {type: String, default: "ADDRESS"}, // ADDRESS or OFFICE
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      }
    },
    apartment: {type: String, default: null}
});

AddressesSchema.set('toJSON', {
  transform: (doc, ret) => {
    decimal2JSON(ret);
    return ret;
  }
});

AddressesSchema.index({location: '2dsphere'});


module.exports = {
    model: mongoose.model('Addresses', AddressesSchema),
    schema: AddressesSchema
};
