import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, HostBinding } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Polyline } from "@agm/core/services/google-maps-types";
import { FeatureTypeService }   from '../services/feature-type.service';
import { Router } from '@angular/router';

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
  private currentGeometryType: string = 'none';

  constructor(private _featureTypeService: FeatureTypeService, private _chRef: ChangeDetectorRef, private router: Router ) { }

  ngOnInit() {
    console.log(this.map);
    
  }


  private onMapClick = (e): void => {
    var context = this;
    context.activeGeofence.getPath().push(e.latLng);
    console.log('clicked');
  }

  private onMapRightClick = (e): void => {
    // clearTimeout(this.update_timeout);
    if (this.activeGeofence) {
      this.activeGeofence.getPath().push(e.latLng);
    }
    // this._featureTypeService.changeFeature(this.currentGeometryType); -- not needed as using router
    // this.router.navigateByUrl("/select-feature/" + this.currentGeometryType);
    setTimeout(() => {
      this.router.navigateByUrl("/select-feature/" + this.currentGeometryType);
    }, 110);
    console.log('Right click');
    document.getElementById('saveBtn').click(); // To do: improve this
  }

  onDrawPolygonClick() {
    this.currentGeometryType = 'area';
    this.addGeofence();
  }

  onDrawLineClick() {
    this.currentGeometryType = 'line';
    this.addGeofence();
  }

  onDrawPointClick() {
    
  }

  addGeofence() {
    if (this.activeGeofence == undefined || this.activeGeofence == null) {    
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
      this._onMapDbClickListner = this.map.addListener('rightclick', this.onMapRightClick)
      this.mapApi.createPolygon({ editable: true, draggable: true }).
      then(p => { console.log('polygon created');
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