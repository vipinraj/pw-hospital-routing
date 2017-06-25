var util = require('util');
var bleno = require('bleno');

function UrlCharacteristic() {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['read'],
    value: new Buffer("https://localhost:4200?ref_beacon=4"),
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Gets the url.'
      })
    ]
  });
}

util.inherits(UrlCharacteristic, bleno.Characteristic);

module.exports = UrlCharacteristic;
