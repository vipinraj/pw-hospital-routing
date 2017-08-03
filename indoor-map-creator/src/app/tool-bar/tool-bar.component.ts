import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef,
  ViewChild, ElementRef, AfterContentInit, HostBinding, NgZone
} from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Polyline } from "@agm/core/services/google-maps-types";
import { FeatureTypeService } from '../services/feature-type.service';
import { Router } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { Feature } from '../models/feature.model';
import { Building } from '../models/building.model';
import { UUID } from 'angular2-uuid';
declare var google: any;

// drawing tools
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  providers: [GoogleMapsAPIWrapper]
})
export class ToolBarComponent implements OnInit {
  @Input() map: any;
  @Input('mapApi') mapApi: GoogleMapsAPIWrapper;
  // poligon
  drawButtonsEnabled = true;
  private featureCollection = [];
  private activePolygon?: any;
  private activePolyLine?: Polyline;
  private activePoint?: any;
  private highLightedFeature: any;
  private isDrawingMode = false;
  private _onMapClickListener: any;
  private _onMapRightClickListner: any;
  private currentGeometryType: string = 'none';
  private featureOptionsOnDrawing = { editable: true, draggable: true, strokeWeight: 2, strokeColor: "black" };
  private featureOptionsOnHihglighted = { editable: true, draggable: true, strokeWeight: 2, strokeColor: "red" };
  private featureOptionsOnNotHighlighted = { editable: false, draggable: false, strokeWeight: 2, strokeColor: "black" };
  constructor(private _featureTypeService: FeatureTypeService, private _chRef: ChangeDetectorRef, private router: Router, private zone: NgZone, private featureService: FeatureService) {

  }

  ngOnInit() {
    var building = new Building();
    building.name = 'building 1';
    building.note = "dsd";
    building.wheelchair = 'yes';
    var building2 = new Building();
    building2.name = 'building 1';
    building2.note = "dsd";
    building2.wheelchair = 'yes';
    // this.featureService.add(building);
    // this.featureService.add(building2);
    setTimeout(() => {
      this.featureService.observableList.subscribe(
        item => {
          console.log(item);
        }
      );
    }, 1000 * 20);
  }

  // handle map click
  private onMapClick = (e): void => {
    console.log('clicked');
    if (this.isDrawingMode) {
      if (this.currentGeometryType == "point") {
        this.drawPoint(e);
      } else if (this.currentGeometryType == 'area') {
        this.activePolygon.getPath().push(e.latLng);
      } else if (this.currentGeometryType == 'line') {
        this.activePolyLine.getPath().push(e.latLng);
      }
    } else {
      this.clearHighlighting();
      // Map events runs out of the Angular 2 zone.
      // Therefore it is neccessary to use the NgZone.run()
      // See: https://goo.gl/MzcPwQ
      this.zone.run(() => {
        this.router.navigateByUrl("/");
      });
    }
  }

  // handle map right click
  private onMapRightClick = (e): void => {
    console.log('Right click');
    this.finishDrawing();
  }

  // handle draw area button
  onDrawPolygonClick() {
    if (!this._onMapClickListener) {
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
    }
    this.currentGeometryType = 'area';
    this.isDrawingMode = true;
    this.drawPolygon();
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
    this.clearHighlighting();
  }

  // handle draw line button
  onDrawLineClick() {
    if (!this._onMapClickListener) {
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
    }
    this.currentGeometryType = 'line';
    this.isDrawingMode = true;
    this.drawPolyline();
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
    this.clearHighlighting();
  }

  // handle draw point button
  onDrawPointClick() {
    if (!this._onMapClickListener) {
      this._onMapClickListener = this.map.addListener('click', this.onMapClick);
    }
    this.currentGeometryType = 'point';
    this.isDrawingMode = true;
    this._onMapClickListener = this.map.addListener('click', this.onMapClick);
    this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick)
    this.makeFeaturesClickable(false);
    this.drawButtonsEnabled = false;
    this.clearHighlighting();
  }

  finishDrawing() {
    var saveResult = true;
    var refId;
    if (this.currentGeometryType == 'line') {
      saveResult = this.savePolyline();
    } else if (this.currentGeometryType == 'area') {
      refId = this.activePolygon.refId;
      saveResult = this.savePolygon();
    } else if (this.currentGeometryType == 'point') {
      saveResult = this.savePoint();
    }
    if (saveResult) {
      this.isDrawingMode = false;
      this.zone.run(() => {
        // change route navigation
        this.router.navigateByUrl("/select-feature/" + this.currentGeometryType + "/" + refId );
      });
      this.makeFeaturesClickable(true);
      this.drawButtonsEnabled = true;
    }
  }

  featureClickHandler(feature, geomType) {
    this.highlightFeature(feature);
    this.highLightedFeature = feature;
    var refId = feature.refId;
    if (feature.hasOwnProperty('featureType') && feature.featureType != null) {
      this.zone.run(() => {
        this.router.navigateByUrl("/edit-tags/" + refId);
      });
    } else {
      this.zone.run(() => {
        this.router.navigateByUrl("/select-feature/" + geomType + "/" + refId );
      });
    }
  }

  clearHighlighting() {
    if (this.highLightedFeature) {
      this.highLightedFeature.setOptions(this.featureOptionsOnNotHighlighted);
      this.highLightedFeature.set('icon', '/assets/images/point.png'); //for points
    }
  }

  highlightFeature(feature) {
    feature.setOptions(this.featureOptionsOnHihglighted);
    feature.set('icon', '/assets/images/point-highlighted.png'); //for points
  }

  makeFeaturesClickable(flag) {
    this.featureCollection.forEach((item) => {
      item.feature.set('clickable', flag);
    });
  }

  // draw polygon
  drawPolygon() {
    if (this.activePolygon == undefined || this.activePolygon == null) {
      this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick);
      // create a polygon
      this.mapApi.createPolygon(this.featureOptionsOnDrawing).
        then(p => {
          console.log('polygon created');
          this.activePolygon = p;
          this.activePolygon.refId = UUID.UUID();
          // add click listner for the polygon
          p.addListener('click', (e) => {
            this.clearHighlighting();
            this.featureClickHandler(p, 'area');
          });
        });
    }
  }

  savePolygon() {
    if (this.activePolygon && this.activePolygon != null && this.activePolygon.getPath().length > 2) {
      console.log(this.activePolygon.getPath());
      // let path: any = this.activePolygon.getPath();
      // //array fore path
      // let points: GeofencePoint[] = []; // polygon points
      // let index: number = 0;
      // //get points from path
      // path.b.forEach(item => {
      //   points.push({
      //     id: index,
      //     latitude: item.lat(),
      //     longitude: item.lng()
      //   });
      //   index++;
      // });
      this.featureCollection.push({ refId: UUID.UUID(), feature: this.activePolygon });
      this.featureService.add({ 
                                refId: this.activePolygon.refId, geomType: 'polygon',
                                geometry: this.activePolygon, feature: null
                              });
      // then you need to dispose used objects
      this.disposeSomeObjects();
      return true;
    }
    return false;
  }

  // draw polygon
  drawPolyline() {
    if (this.activePolyLine == undefined || this.activePolyLine == null) {
      this._onMapRightClickListner = this.map.addListener('rightclick', this.onMapRightClick);
      // create a polyline
      this.mapApi.createPolyline(this.featureOptionsOnDrawing).
        then(p => {
          console.log('polyline created');
          this.activePolyLine = p
          // add click listner for the polygon
          p.addListener('click', (e) => {
            this.clearHighlighting();
            this.featureClickHandler(p, 'line');
          });
        });
    }
  }

  savePolyline() {
    if (this.activePolyLine && this.activePolyLine != null && this.activePolyLine.getPath().length > 1) {
      let path: any = this.activePolyLine.getPath();

      // //array for path
      // let points: GeofencePoint[] = []; // polygon points
      // let index: number = 0;

      // //get points from path
      // path.b.forEach(item => {
      //   points.push({
      //     id: index,
      //     latitude: item.lat(),
      //     longitude: item.lng()
      //   });
      //   index++;
      // });
      //for now just save it in memory
      this.featureCollection.push({ refId: UUID.UUID(), feature: this.activePolyLine });
      // then you need to dispose used objects
      this.disposeSomeObjects();
      return true;
    }
    return false;
  }

  drawPoint(e) {
    // draw marker
    if (!this.activePoint) {
      var marker = new google.maps.Marker({
        position: e.latLng,
        map: this.map,
        icon: '/assets/images/point-highlighted.png',
        draggable: true
      });
      marker.addListener('click', (e) => {
        this.clearHighlighting();
        this.featureClickHandler(marker, 'point');
      });
      this.activePoint = marker;
    }
  }

  savePoint() {
    if (this.activePoint) {
      this.featureCollection.push({ refId: UUID.UUID(), feature: this.activePoint });
      this.disposeSomeObjects();
      return true;
    } else {
      return false;
    }
  }
  private disposeSomeObjects() {
    if (this.activePolygon) {
      this.highLightedFeature = this.activePolygon;
      this.highLightedFeature.setOptions(this.featureOptionsOnHihglighted);
      this.activePolygon = null;
    }
    if (this.activePolyLine) {
      this.highLightedFeature = this.activePolyLine;
      this.highLightedFeature.setOptions(this.featureOptionsOnHihglighted);
      this.activePolyLine = null;
    }
    if (this.activePoint) {
      this.highLightedFeature = this.activePoint;
      this.highLightedFeature.setOptions(this.featureOptionsOnHihglighted);
      this.highLightedFeature.set('icon', '/assets/images/point.png');
      this.activePoint = null;
    }
    // if (this._onMapClickListener) {
    //   this._onMapClickListener.remove();
    // }
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