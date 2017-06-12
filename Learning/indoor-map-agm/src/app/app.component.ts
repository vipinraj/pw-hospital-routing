import { Component, OnInit } from '@angular/core';
import { IndoorDataService } from "./indoordata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IndoorDataService]
})

export class AppComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 12.992634899999999;
  lng: number = 77.71721695;
  zoom: number = 20;
  geoJsonObject: Object;

  constructor(private _indoorDataService: IndoorDataService) {}

  getGeoJSON(): void {
    this._indoorDataService.getGeoJson()
      .subscribe(resGeoJsonData => this.geoJsonObject = resGeoJsonData);
  }
  ngOnInit() : void {
    this.getGeoJSON();
  }

  clicked(clickEvent) {
    console.log(clickEvent);
  }

  styleFunc(feature) {
  var level = feature.getProperty('level'); // get level - 0/1
  var color = 'green';
  var visibility = level == 1 ? true : false; 
  return {
    // icon: '/images/door.png', // icon for point geometry(in this case - doors)
    fillColor: color, // set fill color for polygon features
    strokeColor: color, // stroke color for polygons
    strokeWeight: 1,
    visible: visibility // make layer 0 features visible
  };
  }
}
