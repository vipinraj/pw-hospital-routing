import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, MapOptions } from "@agm/core/services/google-maps-types";
import { IndoorDataService } from "./indoordata.service";
import { MapContentComponent } from './map-content/map-content.component'
import {MaterializeDirective} from "angular2-materialize";

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IndoorDataService, GoogleMapsAPIWrapper]
})

export class AppComponent implements OnInit {
  @ViewChild('map') m: ElementRef;
  title: string = 'Mapping with Angular';
  lat: number = 12.992634899999999;
  lng: number = 77.71721695;
  zoom: number = 28;
  public mapHeight: string = '100%';
  geoJsonObject: Object;
  private _map: any;
  selectedLevel: any = 0;
  mapFillColor: string = '#FFFFDD';
  mapStrokeColor: string = '#CFA992';
  selectedFeatureName: string = "";
  selectedFeatureType: string = "";
  selectedFeatureDescription: string = "";
  selectedFeatureRef: string = "";
  // Options array for select box
  // contains features in the current layer
  selectedOption = "";
  isDisabled = false;
  optionsForSelect: any;
  beaconMarkers = {};
  activeBeaconMarker;

  constructor(private _indoorDataService: IndoorDataService, private mapApi: GoogleMapsAPIWrapper, private _chRef: ChangeDetectorRef) { }

  // function to consume IndoorDataService observable
  getGeoJSON(): void {
    this._indoorDataService.getGeoJson()
      .subscribe(resGeoJsonData => this.geoJsonObject = resGeoJsonData);
  }
  // on init lifecycle hook
  // We get the GeoJSON here
  ngOnInit(): void {
    this.getGeoJSON();
    this.initMap();
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
    this.mapApi.createMap(this.m.nativeElement, <MapOptions> {
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: true,
      mapTypeId: 'roadmap',
      mapTypeControlOptions: {
        mapTypeIds: ['hybrid', 'roadmap', 'satellite'],
        position: 3
      },
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: this.zoom
    }).then(() => this.mapApi.getNativeMap().then((map: any) => {
      this._map = map;
      var that = this;
      // add geosjson data
      this._map.data.addGeoJson(this.geoJsonObject);
      
      // find out building and features with beacons
      this._map.data.forEach(feature => {
        if (feature.getProperty('building')) {
          that.selectedFeatureName = feature.getProperty('name');
          that.selectedFeatureDescription = feature.getProperty('note');
          that.selectedFeatureType = feature.getProperty('building');
        }
        if (feature.getProperty('ref:beacon')) {
          this.addBeaconMarker(feature);
        }
      });

      // apply style and show ground (default) floor
      this.switchLevel();
      // set initial style for features
      // and enable layer 0 features only.
      // var selectOptions = [];
      // this._map.data.setStyle(function (feature) {
      //   // get level - 0/1
      //   var level = feature.getProperty('level'); 
      //   var visibility = level == 0 ? true : false;
      //   // If the feature is "building" get its name, type and
      //   // description.
      //   if (feature.getProperty('building')) {
      //     console.log(feature.getProperty('name'));
      //     that.selectedFeatureName = feature.getProperty('name');
      //     that.selectedFeatureDescription = feature.getProperty('note');
      //     that.selectedFeatureType = feature.getProperty('building');
      //   }
      //   // populate "optionsForSelect" with layer 0 features
      //   if (visibility) {
      //     selectOptions.push(
      //       {
      //         value: feature.getProperty('ref'),
      //         name: feature.getProperty('name')
      //       });
      //   }
      //   // Force update view
      //   that._chRef.detectChanges();
      //   // add beacon points
      //   return {
      //     // icon for point geometry(in this case - doors)
      //     icon: '/images/door.png',
      //     // set fill color for polygon features
      //     fillColor: that.mapFillColor,
      //     // stroke color for polygons
      //     strokeColor: that.mapStrokeColor,
      //     strokeWeight: 1,
      //     // make layer 0 features visible
      //     visible: visibility
      //   };
      // });
      // // set options for select box
      // window.setTimeout(()=>{
      //   this.optionsForSelect = selectOptions;
      // },500);
      // console.log(selectOptions);
      // custom control for showing feature properties/tags
      var infoBarControlDiv = document.createElement('div');
      var infoBarControl = document.getElementById('infoBarContainer');
      infoBarControlDiv.appendChild(infoBarControl);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(infoBarControlDiv);

      // custom control for layer switch
      var layerSwitchControlDiv = document.createElement('div');
      var layerSwitchControl = document.getElementById('layerSwitcher');
      layerSwitchControlDiv.appendChild(layerSwitchControl);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(layerSwitchControlDiv);
      // handle feature click events
      map.data.addListener('click', function (event) {
        that.highLightFeature(event.feature, false);
        that.updateInfoBar(event.feature);
        that.selectedOption = event.feature.getProperty('ref');
        // Force update view
        that._chRef.detectChanges();
      });
    }));
  }

  highLightFeature(feature, doPan) {
    this._map.data.revertStyle();
    this._map.data.overrideStyle(feature,
      { strokeWeight: 2, strokeColor: this.mapStrokeColor, fillColor: 'yellow' });
    var center = this.getCenter(feature);
    if (doPan) {
      this._map.panTo(center);
    }
  }

  updateInfoBar(feature) {
    this.selectedFeatureName = feature.getProperty('name');
    this.selectedFeatureDescription = feature.getProperty('note');
    this.selectedFeatureType = feature.getProperty('indoor');
    if (this.selectedFeatureType == 'room') {
      if (feature.getProperty('room')) {
        this.selectedFeatureType += '(' + feature.getProperty('room') + ')';
      }
    }
  }

  levelChangeClick(event) {
    this.selectedLevel = parseInt(event.target.text);
    this.switchLevel();
  }

  scanBtnClick(event) {
    var beaconRef = '1';
    var marker = this.beaconMarkers[beaconRef];
    var selectedFeature = marker.feature;
    var level = selectedFeature.getProperty('level');
    this.selectedLevel = level;

    // change current active beacon icon if any to inactive
    if (this.activeBeaconMarker) {
      var image = 'assets/images/inactive.png';
      marker.setIcon(image);
    }

    this.activeBeaconMarker = marker;
    // change marker icon to active
    var image = 'assets/images/active.png';
    marker.setIcon(image);
    // switch layer if needed
    this.switchLevel();
    // highlight feature attached to beacon
    this.highLightFeature(selectedFeature, true);
  }

  getCenter(feature) {
    // find bound of the feature
    if (feature.getGeometry().getType()==='Polygon') {
        var bounds = new google.maps.LatLngBounds();
        feature.getGeometry().getArray().forEach(function(path){
          path.getArray().forEach(function(latLng){bounds.extend(latLng);})
        });        
        feature.setProperty('bounds',bounds);
        return bounds.getCenter();
    } else {
        return feature.getGeometry().get();
    }
  }

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
    window.setTimeout(()=>{
      this.optionsForSelect = selectOptions;
    },500);
  }
  
  addBeaconMarker(feature) {
    var center = this.getCenter(feature);
    var image = 'assets/images/inactive.png';
    var marker = new google.maps.Marker({
      position: center,
      map: this._map,
      feature: feature,
      icon: image
    });
    var markerObj = {};
    this.beaconMarkers[feature.getProperty('ref:beacon')] = marker;
  }

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
}
