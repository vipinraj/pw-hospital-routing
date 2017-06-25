var util = require('util');
var bleno = require('bleno');

var BeaconLatlongCharacteristic = require('./beacon-latlong-characteristic');
var UrlCharacteristic = require('./beacon-url-characteristic');
function BeaconService() {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            new BeaconLatlongCharacteristic(),
            new UrlCharacteristic(),
        ]
    });
}

util.inherits(BeaconService, bleno.PrimaryService);

module.exports = BeaconService;
