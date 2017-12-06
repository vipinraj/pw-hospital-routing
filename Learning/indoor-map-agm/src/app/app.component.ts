import { Component, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import { IndoorDataService } from "./indoordata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IndoorDataService, GoogleMapsAPIWrapper]
})

export class AppComponent implements OnInit {
  @ViewChild('mapControl') mapControl: Component;
  title: string = 'Mapping with Angular';
  lat: number = 12.992634899999999;
  lng: number = 77.71721695;
  zoom: number = 20;
  geoJsonObject: Object;
  map: any;

  constructor(private _indoorDataService: IndoorDataService, private _wrapper:GoogleMapsAPIWrapper, private _zone: NgZone) {
  }

  buildMap() {
    this._wrapper.getNativeMap().then((theMap)=>{
      this.map = theMap;
      console.log(theMap);
    }).catch((e)=>console.log(e));
  }
  // function to consume IndoorDataService observable
  getGeoJSON(): void {
    this._indoorDataService.getGeoJson()
      .subscribe(resGeoJsonData => this.geoJsonObject = resGeoJsonData);
  }
  // on init lifecycle hook
  // We get the GeoJSON here
  ngOnInit() : void {
    this.getGeoJSON();
    this.buildMap();
  }
  clicked(clickEvent) {
    //console.log(clickEvent);
    console.log(this.map);
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
}
