import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, MapOptions } from "@agm/core/services/google-maps-types";
import { ToolBarComponent } from '../tool-bar/tool-bar.component'
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @HostBinding('attr.class') cssClass = 'mapContainer';
  @ViewChild('map') m: ElementRef;
  @ViewChild('sideBarToggleBtn') sideBarToggleBtn: ElementRef;
  @ViewChild('toolbar') toolbar: ElementRef;
  @Input('sidenav') sidenav;
  gMap: any;
  @Input('mapApi') mapApi: GoogleMapsAPIWrapper;
  // default center and zoom
  lat: number = 12.992634899999999;
  lng: number = 77.71721695;
  zoom: number = 28;
  
  constructor() { 
  }

  ngOnInit() {
    this.initMap();
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
      this.gMap = map;
      var testBeaconControlDiv = document.createElement('div');
      testBeaconControlDiv.appendChild(this.toolbar.nativeElement);
      this.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(testBeaconControlDiv);
      this.gMap.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.sideBarToggleBtn.nativeElement);
    }));
  }

  ngAfterViewInit() {
    console.log(this.toolbar);
  }
}