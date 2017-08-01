import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, HostBinding } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Polyline } from "@agm/core/services/google-maps-types";
import { FeatureTypeService }   from '../services/feature-type.service';
import { Router } from '@angular/router';
declare var google: any;

// drawing tools
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class ToolBarComponent implements OnInit {
  @Input() map:any;
  @Input('mapApi') mapApi: GoogleMapsAPIWrapper;
  // poligon
  drawButtonsEnabled = true;
  private featureCollection = [];
  private activePolygon?: Polyline;
  private activePolyLine?: Polyline;
  private activePoint?: any;
  private highLightedFeature: any;
  private _onMapClickListener: any;
  private _onMapRightClickListner: any;
  private currentGeometryType: string = 'none';
  private featureDefaultProperties = { editable: true, draggable: true, strokeWeight: 1 };
  constructor(private _featureTypeService: FeatureTypeService, private _chRef: ChangeDetectorRef, private router: Router ) { 
  }

  ngOnInit() {
  }

  // handle map click
  private onMapClick = (e): void => {
    console.log('clicked');
    // change route navigation
    this.router.navigateByUrl("/select-feature/" + this.currentGeometryType);
    if (this.currentGeometryType == "point") {
      // document.getElementById('saveBtn').click(); // To do: improve this
      // draw marker
      if (!this.activePoint) {
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: this.map,
            icon: '/assets/images/black_dot.png',
            draggable: true
          });
        marker.addListener('click', (e) => {
          this.featureClickHandler(marker);
        });
        this.activePoint = marker;
        this.featureCollection.push(marker);
      }
    } else if (this.currentGeometryType == 'area') {
      this.activePolygon.getPath().push(e.latLng);
    } else if (this.currentGeometryType == 'line') {
      this.activePolyLine.getPath().push(e.latLng);
    }
  }

  // handle map right click
  private onMapRightClick = (e): void => {
    // this._featureTypeService.changeFeature(this.currentGeometryType); -- not needed as using router
    // this.router.navigateByUrl("/select-feature/" + this.currentGeometryType);
    console.log('Right click');
    document.getElementById('saveBtn').click(); // To do: improve this
  }

  // handle draw area button
  onDrawPolygonClick() {
    this.currentGeometryType = 'area';
    this.drawPolygon();
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
  }

  // handle draw line button
  onDrawLineClick() {
    this.currentGeometryType = 'line';
    this.drawPolyline();
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
  }

  // handle draw point button
  onDrawPointClick() {
    this.currentGeometryType = 'point';
    this._onMapClickListener = this.map.addListener('click', this.onMapClick);
    this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick)
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
  }

  onFinishDrawClick() {
    console.log(this.currentGeometryType);
    if (this.currentGeometryType == 'line') {
      this.savePolyline();
    } else if (this.currentGeometryType == 'area') {
      this.savePolygon();
    } else if (this.currentGeometryType == 'point') {
      this.savePoint();
    }
    this.makeFeaturesClickable(true);
    this.drawButtonsEnabled = true;
  }

  featureClickHandler(feature) {
    // unhighlight currently highlighted feature
    if (this.highLightedFeature) {
      if (this.highLightedFeature.hasOwnProperty('editable')) {
        this.highLightedFeature.setEditable(false);
      }
      this.highLightedFeature.setDraggable(false);
    }
    if (feature.hasOwnProperty('editable')) {
      feature.setEditable(true);
    }
    feature.setDraggable(true);
    this.highLightedFeature = feature;
  }

  makeFeaturesClickable(flag) {
    this.featureCollection.forEach((feature) => {
      feature.set('clickable', flag);
    });
  }

  // draw polygon
  drawPolygon() {
    if (this.activePolygon == undefined || this.activePolygon == null) {    
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
      this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick);
      // create a polygon
      this.mapApi.createPolygon(this.featureDefaultProperties).
      then(p => { 
        console.log('polygon created');
        this.activePolygon = p;
        // add click listner for the polygon
        p.addListener('click', (e) => {
          this.featureClickHandler(p);
        });
      });
    }
  }
  
  savePolygon() {
    if (this.activePolygon && this.activePolygon != null && this.activePolygon.getPath().length > 0) {
      let path: any = this.activePolygon.getPath();
      
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
      this.featureCollection.push(this.activePolygon);
      
      // then you need to dispose used objects
      this.disposeSomeObjects();
    }
  }
  
    // draw polygon
  drawPolyline() {
    if (this.activePolygon == undefined || this.activePolygon == null) {    
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
      this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick);
      // create a polyline
      this.mapApi.createPolyline(this.featureDefaultProperties).
      then(p => { 
        console.log('polyline created');
        this.activePolyLine = p
        this.activePolygon = p;
        // add click listner for the polygon
        p.addListener('click', (e) => {
          this.featureClickHandler(p);
        });
      });
    }
  }
  
  savePolyline() {
    if (this.activePolyLine && this.activePolyLine != null && this.activePolyLine.getPath().length > 0) {
      let path: any = this.activePolyLine.getPath();
      
      //array for path
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
      this.featureCollection.push(this.activePolygon);
      
      // then you need to dispose used objects
      this.disposeSomeObjects();
    }
  }

  savePoint() {

    this.disposeSomeObjects();
  }
  private disposeSomeObjects() {
    if (this.activePolygon) {
        this.activePolygon.setEditable(false);
        this.activePolygon.setDraggable(false);
        this.activePolygon = null;
    }
    if (this.activePolyLine) {
        this.activePolyLine.setEditable(false);
        this.activePolyLine.setDraggable(false);
        this.activePolyLine = null;
    }
    if (this.activePoint) {
        this.activePoint.setDraggable(false);
        this.activePoint = null;
    }
    if (this._onMapClickListener) {
      this._onMapClickListener.remove();
    }
    if (this._onMapRightClickListner) {
      this._onMapRightClickListner.remove();
    }
  }
}


// represent a point
interface GeofencePoint {
  id: number;
  latitude: number;
  longitude: number;
}