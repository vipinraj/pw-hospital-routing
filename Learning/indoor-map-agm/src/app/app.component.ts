import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, MapOptions } from "@agm/core/services/google-maps-types";
import { IndoorDataService } from "./indoordata.service";
import { TextEncoder, TextDecoder } from 'text-encoding-shim';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IndoorDataService, GoogleMapsAPIWrapper]
})

export class AppComponent implements OnInit {
  // get a reference to the map dom
  @ViewChild('map') m: ElementRef;
  // title: string = 'Mapping with Angular';
  geoJsonObject: Object;
  private _map: any;
  // default center and zoom
  lat: number = 12.992634899999999;
  lng: number = 77.71721695;
  zoom: number = 28;
  // set map height to maximum
  mapHeight: string = '100%';
  infoBarWidth: string;
  // holds the currently active level/floor
  selectedLevel: any = 0;
  // style for indoor features
  mapFillColor: string = '#FFFFDD';
  mapStrokeColor: string = '#CFA992';
  // Holds the information about currently 
  // selected feature's data.
  selectedFeatureData = { 
                          ref: null, title: null, subtitle: null,
                          description: null, beaconAttached: null,
                          beaconRef: null, website: null,
                          openTime: null, imageUrl: null
                        };

  // to make the select box enable/disable
  isDisabled = false;
  // Options array for select box -
  // contains features in the current layer.
  optionsForSelect: any;
  // Contain an entry for each beacon and the 
  // corresponding marker in the map.
  // Format: "ref:beacon":"marker"
  // Example: {"3": marker1, "2": marker2, ...}
  beaconMarkers = {};
  // The currently active beacon marker (represents
  // users current location)
  activeBeaconMarker;
  pathCovered = [];
  pathPolyLine;
  


  constructor(private _indoorDataService: IndoorDataService, private mapApi: GoogleMapsAPIWrapper, private _chRef: ChangeDetectorRef) { }

  // function to consume IndoorDataService observable
  getGeoJSON(): void {
    this._indoorDataService.getGeoJson()
      .subscribe(resGeoJsonData => this.geoJsonObject = resGeoJsonData);
  }
  // on init lifecycle hook
  // We get the GeoJSON here
  // and initialize map,
  ngOnInit(): void {
    // set the width of infoBar control
    var windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    this.infoBarWidth = (windowWidth / 2) + 'px';
    this.getGeoJSON();
    this.initMap();
  }

  // function to capitalize a string
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  styleFunc(feature) {
    // get level - 0/1
    var level = feature.getProperty('level');
    var color = 'green';
    // only show level one features
    var visibility = level == 1 ? true : false;
    return {
      // icon for point geometry(in this case - doors)
      icon: 'assets/images/door.png',
      // set fill color for polygon features
      fillColor: color,
      // stroke color for polygons
      strokeColor: color,
      strokeWeight: 1,
      // make layer 1 features visible
      visible: visibility
    };
  }
  private initMap() {
    // create a new map instance
    this.mapApi.createMap(this.m.nativeElement, <MapOptions>{
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: 7
      },
      mapTypeControl: true,
      mapTypeId: 'roadmap',
      mapTypeControlOptions: {
        mapTypeIds: ['hybrid', 'roadmap', 'satellite'],
        position: 1
      },
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: this.zoom
    }).then(() => this.mapApi.getNativeMap().then((map: any) => {
      // map holds a reference to the map instance created
      this._map = map;
      var that = this;
      // add geosjson data
      this._map.data.addGeoJson(this.geoJsonObject);
      // find out "building" and "features with beacons"
      this._map.data.forEach(feature => {
        if (feature.getProperty('building')) {
          // Set building as the selected feature
          // on load of the application.
          that.selectedFeatureData = that.extractFeatureData(feature);
        }
        if (feature.getProperty('ref:beacon')) {
          // create a "point" for the beacon
          this.addBeaconMarker(feature);
        }
      });

      // apply style and show ground (default) floor
      this.switchLevel();
      // custom control for showing feature properties/tags
      var infoBarControlDiv = document.createElement('div');
      var infoBarControl = document.getElementById('infoBarContainer');
      infoBarControlDiv.appendChild(infoBarControl);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(infoBarControlDiv);

      // custom control for layer switch
      var layerSwitchControlDiv = document.createElement('div');
      var layerSwitchControl = document.getElementById('layerSwitcher');
      layerSwitchControlDiv.appendChild(layerSwitchControl);
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(layerSwitchControlDiv);
      
      // test beacon control div beaconTester
      var testBeaconControlDiv = document.createElement('div');
      var testBeaconControl = document.getElementById('beaconTester');
      testBeaconControlDiv.appendChild(testBeaconControl);
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(testBeaconControlDiv);

      // handle feature click events
      map.data.addListener('click', function (event) {
        that.highLightFeature(event.feature, false);
        that.updateInfoBar(event.feature);
        // Force update view
        that._chRef.detectChanges();
      });

      // initialize path polyline 
      that.pathPolyLine = new google.maps.Polyline({
          path: that.pathCovered,
          geodesic: true,
          strokeColor: 'gray',
          strokeOpacity: 1.0,
          strokeWeight: 1,
          map: that._map
      });
    }));
  }

  // method to highlight and optionally panTo a feature
  highLightFeature(feature, doPan) {
    this._map.data.revertStyle();
    this._map.data.overrideStyle(feature,
      { strokeWeight: 2, strokeColor: this.mapStrokeColor, fillColor: 'yellow' });
    var center = this.getCenter(feature);
    if (doPan) {
      this._map.panTo(center);
    }
  }

  // update information bar with info from a feature
  updateInfoBar(feature) {
    this.selectedFeatureData = this.extractFeatureData(feature);
  }

  /* 
   * Extract feature informations and convert them
   * into a form which is compatible to be displayed 
   * in info bar. 
   * 
   */
  extractFeatureData(feature) {
    var featureData = { ref: null, title: null, subtitle: null,
                        description: null, beaconAttached:null,
                        beaconRef: null, website: null,
                        openTime: null, imageUrl: null };

    var ref = feature.getProperty('ref');
    var refBeacon = feature.getProperty('ref:beacon');

    featureData.ref = feature.getProperty('ref');
    featureData.title = feature.getProperty('name');
    featureData.description = feature.getProperty('note');

    if (refBeacon) {
      featureData.beaconAttached = true;
      featureData.beaconRef = refBeacon;
    } else {
      featureData.beaconAttached = false;
    }

    var subtitle = [];
    if (feature.getProperty('indoor')) {
      // Manage room, corridor, area, wall
      // Todo: manage stairs, escalators and elevators
      var indoorType;
      indoorType = feature.getProperty('indoor');
      subtitle.push(feature.getProperty('indoor'));
      if (indoorType = 'room') {
        if (feature.getProperty('room')) {
          var roomType = feature.getProperty('room');
          if (['stairs','toilets','toilet'].indexOf(roomType.toLowerCase()) >= 0) {
            subtitle.push('has ' + roomType.toLowerCase());
          } else {
            subtitle.pop();
            subtitle.push(roomType);
          }
        }
        if (feature.getProperty('amenity')) {
          subtitle.unshift(feature.getProperty('amenity'));
        }
      }
      featureData.subtitle = this.capitalizeFirstLetter(subtitle.join(', '));
    } else if (feature.getProperty('door')) {
      var doorType = feature.getProperty('door');
      var subtitle = [];
      if (doorType.toLowerCase() == 'yes') {
        subtitle.push('Door');
      } else {
        subtitle.push(this.capitalizeFirstLetter(doorType) + " door" );
      }
      if (feature.getProperty('entrance')) {
        subtitle.push(feature.getProperty('entrance').toLowerCase());
      }
      if (feature.getProperty('wheelchair')) {
        var wheelchair = feature.getProperty('wheelchair');
        if (wheelchair.toLowerCase() == 'yes') {
          subtitle.push('wheelchair allowed');
        } else if (wheelchair == 'no') {
          subtitle.push('wheelchair not allowed');
        } else {
          subtitle.push('limited wheelchair access');
        }
      }
      featureData.subtitle = subtitle.join(', ');
    } else if (feature.getProperty('building')) {
      var subtitle = [];
      subtitle.push(this.capitalizeFirstLetter(feature.getProperty('building')));
      if (feature.getProperty('wheelchair')) {
        var wheelchair = feature.getProperty('wheelchair');
        if (wheelchair.toLowerCase() == 'yes') {
          subtitle.push('wheelchair allowed');
        } else if (wheelchair == 'no') {
          subtitle.push('wheelchair not allowed');
        } else {
          subtitle.push('limited wheelchair access');
        }
      }
      featureData.subtitle = subtitle.join(', ');
    }

    if (feature.getProperty('website')) {
      featureData.website = feature.getProperty('website');
    }

    if (feature.getProperty('opening_hours')) {
      featureData.openTime = feature.getProperty('opening_hours');
    }

    if (feature.getProperty('image_url')) {
      featureData.imageUrl = feature.getProperty('image_url');
    }

    return featureData;
  }

  // handle for level change button
  levelChangeClick(event) {
    console.log(event.target);
    this.selectedLevel = parseInt(event.target.dataset.value);
    this.switchLevel();
  }

  testScanBtnClick(event) {
    var that = this;
    // scanning success!
    // get beacon identifier
    var beaconRef = (<HTMLInputElement>document.getElementById('beaconRefTxt')).value;;
    // get the marker corresponding to the beacon
    var marker = that.beaconMarkers[beaconRef];
    // get the feature attached to the beacon 
    // and set it as selected feature
    var selectedFeature = marker.feature;
    // get the level of beacon
    var level = selectedFeature.getProperty('level');
    that.selectedLevel = level;

    // change current active beacon icon, if any, to inactive
    if (that.activeBeaconMarker) {
      console.log(that.activeBeaconMarker);
      var image = 'assets/images/inactive.png';
      that.activeBeaconMarker.setIcon(image);
    }

    // update the active beacon with newly discoverd beacon
    that.activeBeaconMarker = marker;
    // change marker icon to active
    var image = 'assets/images/active.png';
    marker.setIcon(image);
    // switch layer if needed
    that.switchLevel();
    // highlight feature attached to beacon
    that.highLightFeature(selectedFeature, true);
    // update infobar
    that.updateInfoBar(selectedFeature);
    // add marker point to path covered
    that.pathCovered.push({lat: marker.getPosition().lat(), lng: marker.getPosition().lng()});
    
    that.pathPolyLine.setPath(that.pathCovered);
  }
  // handle for beacon scan button
  scanBtnClick(event) {
    var that = this;
    // scan for beacons
    this.scanForBeacons(function (error, refBeacon) {
      if (error != null) {
        // scanning failed!
        console.log(error);
      } else {
        // scanning success!
        // get beacon identifier
        var beaconRef = refBeacon;
        // get the marker corresponding to the beacon
        var marker = that.beaconMarkers[beaconRef];
        // get the feature attached to the beacon 
        // and set it as selected feature
        var selectedFeature = marker.feature;
        // get the level of beacon
        var level = selectedFeature.getProperty('level');
        that.selectedLevel = level;

        // change current active beacon icon, if any, to inactive
        if (that.activeBeaconMarker) {
          var image = 'assets/images/inactive.png';
          that.activeBeaconMarker.setIcon(image);
        }

        // update the active beacon with newly discoverd beacon
        that.activeBeaconMarker = marker;
        // change marker icon to active
        var image = 'assets/images/active.png';
        marker.setIcon(image);
        // switch layer if needed
        that.switchLevel();
        // highlight feature attached to beacon
        that.highLightFeature(selectedFeature, true);
        // update infobar
        that.updateInfoBar(selectedFeature);
      }
    });
  }

  // function to get the approximate center of a feature
  // For point: return lat and long
  // For polygon: find bounding box and return it's center
  getCenter(feature) {
    // find bound of the feature
    if (feature.getGeometry().getType() === 'Polygon') {
      var bounds = new google.maps.LatLngBounds();
      feature.getGeometry().getArray().forEach(function (path) {
        path.getArray().forEach(function (latLng) { bounds.extend(latLng); })
      });
      feature.setProperty('bounds', bounds);
      return bounds.getCenter();
    } else {
      // points
      return feature.getGeometry().get();
    }
  }

  // method to switch the level to "this.selectedLevel"
  switchLevel() {
    var that = this;
    var selectOptions = [];
    this._map.data.setStyle(function (feature) {
      var level = feature.getProperty('level'); // get level
      var visibility = level == that.selectedLevel ? true : false;
      // populate "optionsForSelect" with selected levels's features
      if (visibility) {
        selectOptions.push(
          {
            value: feature.getProperty('ref'),
            name: feature.getProperty('name')
          });
      }
      return {
        icon: 'assets/images/door.png',
        fillColor: that.mapFillColor,
        strokeColor: that.mapStrokeColor,
        strokeWeight: 1,
        visible: visibility
      };
    });
    // hide markers which are not part of this level
    for (var key in this.beaconMarkers) {
      if (this.beaconMarkers[key].feature.getProperty('level') == this.selectedLevel) {
        this.beaconMarkers[key].setVisible(true);
      } else {
        this.beaconMarkers[key].setVisible(false);
      }
    }
    // set options for select box
    window.setTimeout(() => {
      this.optionsForSelect = selectOptions;
    }, 500);
  }

  // method to create a marker (sphere/point)
  // for a feature
  addBeaconMarker(feature) {
    // Get center of the feature
    // for placing the point
    var center = this.getCenter(feature);
    var image = 'assets/images/inactive.png';
    // create marker object
    var marker = new google.maps.Marker({
      position: center,
      map: this._map,
      feature: feature,
      icon: image
    });
    var markerObj = {};
    // add marker to collection
    this.beaconMarkers[feature.getProperty('ref:beacon')] = marker;
  }

  // handle for selectbox 'change' event
  selectChanged(event) {
    var featureRef = event.target.value;
    // find the respective feature
    var selectedFeature;
    this._map.data.forEach(feature => {
      if (feature.getProperty('ref') == featureRef) {
        selectedFeature = feature;
      }
    });
    this.selectedLevel = selectedFeature.getProperty('level');
    this.switchLevel(); // not neccessary
    console.log(selectedFeature);
    this.highLightFeature(selectedFeature, true);
    this.updateInfoBar(selectedFeature);
  }

  scanForBeacons(callback) {
    // Filter by custom srervice UID
    let options = { filters: [{ services: ['13333333-3333-3333-3333-333333333337'] }] };
    console.log('Requesting Bluetooth Device...');
    navigator['bluetooth'].requestDevice(options)
      .then(device => {
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
        // connect to device
        return device.gatt.connect();
      })
      .then(server => {
        // Getting location service
        return server.getPrimaryService('13333333-3333-3333-3333-333333333337');
      })
      .then(service => {
        // Getting url Characteristic...
        return service.getCharacteristic('13333333-3333-3333-3333-333333330003');
      })
      .then(characteristic => {
        // Reading the value of url
        return characteristic.readValue();
      })
      .then(value => {
        let decoder = new TextDecoder('utf-8');
        // Convert Array Buffer to readable string.
        var url = new URL(decoder.decode(value));
        // get ref_beacon parameter from url
        var refBeacon = url.searchParams.get('ref_beacon');
        callback(null, refBeacon);
      })
      .catch(error => {
        console.log('Error: ' + error);
        callback(error, null);
      });
  }
}
