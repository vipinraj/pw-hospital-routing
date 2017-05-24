var util = require('util');
var bleno = require('bleno');

var BeaconLatlongCharacteristic = require('./beacon-latlong-characteristic');

function BeaconService(pizza) {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new BeaconLatlongCharacteristic(pizza),
        ]
    });
}

util.inherits(BeaconService, bleno.PrimaryService);

module.exports = BeaconService;
