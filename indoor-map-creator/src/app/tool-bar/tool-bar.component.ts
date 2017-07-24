import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Polyline } from "@agm/core/services/google-maps-types";
import { FeatureTypeService }   from '../services/feature-type.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class ToolBarComponent implements OnInit {
  @Input() map:any;
  @Input('mapApi') mapApi: GoogleMapsAPIWrapper;

  private geofences: Polyline[] = [];
  private activeGeofence?: Polyline;
  private _onMapClickListener: any;
  private _onMapDbClickListner: any;
  private currentGeometryType: string = 'area';
  update_timeout = null;

  constructor(private _featureTypeService: FeatureTypeService, private _chRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.map);
    
  }


  private onMapClick = (e): void => {
    var context = this;
    this.update_timeout = setTimeout(function() {
      context.activeGeofence.getPath().push(e.latLng);
      console.log('clicked');
    }, 200);
  }

  private onMapDbClick = (e): void => {
    clearTimeout(this.update_timeout);
    if (this.activeGeofence) {
      this.activeGeofence.getPath().push(e.latLng);
    }
    this._featureTypeService.changeFeature(this.currentGeometryType);
    console.log('Double click');
    document.getElementById('saveBtn').click(); // To do: improve this
  }

  addGeofence() {
    console.log(this.map);
    if (this.activeGeofence == undefined || this.activeGeofence == null) {    
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
      this._onMapDbClickListner = this.map.addListener('dblclick', this.onMapDbClick)
      this.mapApi.createPolygon({ editable: true, draggable: true }).
      then(p => { console.log('polygon creaed');
        this.activeGeofence = p});
      console.log('adding geofence');
    }
  }
  
  saveGeofence() {
    if (this.activeGeofence && this.activeGeofence != null && this.activeGeofence.getPath().length > 0) {
      let path: any = this.activeGeofence.getPath();
      
      //array fore path
      let points: GeofencePoint[] = []; // polygon points
      let index: number = 0;
      
      //get points from path
      path.b.forEach(item => {
        points.push({
          id: index,
          latitude: item.lat(),
          longitude: item.lng()
        });
        index++;
      });
      
      // here you can post arry wherever you want
      
      //for now just save it in memory
      this.geofences.push(this.activeGeofence);
      
      // then you need to dispose used objects
      this.disposeSomeObjects();
    }
  }
  
  private disposeSomeObjects() {
    if (this.activeGeofence) {
        this.activeGeofence.setEditable(false);
        this.activeGeofence.setDraggable(false);
        this.activeGeofence = null;
    }

    if (this._onMapClickListener) {
      this._onMapClickListener.remove();
    }
  }
}
interface GeofencePoint {
  id: number;
  latitude: number;
  longitude: number;
}