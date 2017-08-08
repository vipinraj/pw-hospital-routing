import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, MapOptions } from "@agm/core/services/google-maps-types";
import { ToolBarComponent } from '../tool-bar/tool-bar.component'
declare var google: any;

// this component shows the map
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  // set css class for this component
  @HostBinding('attr.class') cssClass = 'mapContainer';
  @ViewChild('map') m: ElementRef;
  // reference to side bar toggle control
  @ViewChild('sideBarToggleBtn') sideBarToggleBtn: ElementRef;
  // reference to toolbar container
  @ViewChild('toolbar') toolbar: ElementRef;
  // reference to sidebar 
  @Input('sidenav') sidenav;
  // if side bar opened or not - use this variable for
  // switching the toggle button arrow.
  sideNavOpened = true;
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
        position: 9
      },
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: this.zoom
    }).then(() => this.mapApi.getNativeMap().then((map: any) => {
      // map holds a reference to the map instance created
      this.gMap = map;
      // push drawing tool bar and toggle button to map
      var testBeaconControlDiv = document.createElement('div');
      testBeaconControlDiv.appendChild(this.toolbar.nativeElement);
      this.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(testBeaconControlDiv);
      this.gMap.controls[google.maps.ControlPosition.LEFT_CENTER].push(this.sideBarToggleBtn.nativeElement);
    }));
  }

  // show or hide side pane
  toggleSideNav() {
    this.sidenav.toggle();
    this.sideNavOpened = !this.sideNavOpened;
  }

  ngAfterViewInit() {
  }
}