var util = require('util');
var bleno = require('bleno');

function LatLongCharacteristic() {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330002',
    properties: ['read'],
    value: new Buffer("12.972442:77.580643"),
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Gets the lat and long.'
      })
    ]
  });
}

util.inherits(LatLongCharacteristic, bleno.Characteristic);

module.exports = LatLongCharacteristic;
