import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Feature } from "../models/feature.model";
import { Building } from '../models/building.model';
import { Room } from '../models/room.model';
import { Corridor } from '../models/corridor.model';
import { Area } from '../models/area.model';
import { Wall } from '../models/wall.model';
import { Door } from '../models/door.model';
import { Stairs } from '../models/stairs.model';
import { Escalator } from '../models/escalator.model';
import { Elevator } from '../models/elevator.model';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { LevelFilterService } from './level-filter.service';

@Injectable()
export class FeatureService {

    constructor(private levelFilterService: LevelFilterService) {}

    private _list: { refId: string, geomType: string, geometry: any, feature: any }[] = [];
    private _observableList:
    BehaviorSubject<{ refId: string, geomType: string, geometry: any, feature: any }[]> = new BehaviorSubject([]);

    get observableList(): Observable<{ refId: string, geomType: string, geometry: any, feature: any }[]> {
        return this._observableList.asObservable();
    };

    add(feature: { refId: string, geomType: string, geometry: any, feature: any }) {
        this._list.push(feature);
        this._observableList.next(this._list);
    }

    delete(index: number) {
        this._list.splice(index, 1);
        this._observableList.next(this._list);
    }

    // convert features to GeoJSON
    convertToGeoJson(): { geoJson: {}, featureTypes: string[] } {
        var geo = { "type": "FeatureCollection", "features": [] };
        var featureTypes = [];
        console.log(this._list);
        this._list.forEach(function (item) {
            if (item.geometry) {
                featureTypes.push(item.geometry.featureType);
                var feature = {};
                feature['type'] = 'Feature';
                feature['properties'] = item.feature.getProperties();
                geo.features.push(feature);
                feature['geometry'] = { type: null, coordinates: null };
                // get coordinates
                var coordinates;
                switch (item.geomType) {
                    case 'line': {
                        feature['geometry']['type'] = 'LineString';
                        coordinates = [];
                        item.geometry.getPath().forEach(latLong => {
                            coordinates.push([latLong.lng(), latLong.lat()]);
                        });
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                    case 'point': {
                        feature['geometry']['type'] = 'Point';
                        coordinates = [item.geometry.getPosition().lng(), item.geometry.getPosition().lat()];
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                    case 'polygon': {
                        feature['geometry']['type'] = 'Polygon';
                        coordinates = [[]];
                        var firstPoint;
                        item.geometry.getPath().forEach((latLong, i) => {
                            if (i == 0) {
                                firstPoint = [latLong.lng(), latLong.lat()];
                            }
                            coordinates[0].push([latLong.lng(), latLong.lat()]);
                        });
                        coordinates[0].push(firstPoint);
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                }
            }
        });
        return { geoJson: geo, featureTypes: featureTypes };
    }

    geoJsonToFeatureCollection(geoJson, featureTypes) {
        console.log(geoJson);
        var featureList: { refId: string, geomType: string, geometry: any, feature: any }[] = [];
        if (geoJson && geoJson.features) {
            geoJson.features.forEach((featureJson, i) => {

                // get ref id
                var refId: string = featureJson.properties.ref;
                // get geomtype
                var geomType;
                if (featureJson.geometry.type == 'Polygon') {
                    geomType = 'polygon';
                } else if (featureJson.geometry.type == 'LineString') {
                    geomType = 'line';
                } else if (featureJson.geometry.type == 'Point') {
                    geomType = 'point';
                }
                // create feature objects
                var feature;
                switch (featureTypes[i]) {
                    case "building":
                        feature = new Building();
                        break;
                    case "room":
                        feature = new Room();
                        break;
                    case "corridor":
                        feature = new Corridor();
                        break;
                    case "area":
                        feature = new Area();
                        break;
                    case "wall":
                        feature = new Wall();
                        break;
                    case "door":
                        feature = new Door();
                        break;
                    case "stairs":
                        feature = new Stairs();
                        break;
                    case "escalator":
                        feature = new Escalator();
                        break;
                    case "elevator":
                        feature = new Elevator();
                        break;
                }
                // populate control (tag) values
                feature.formControls.forEach(control => {
                    var tag = control.tag;
                    if (featureJson.properties[tag]) {
                        control.value = featureJson.properties[tag];
                        if (control.tag == 'level' || control.tag == 'building') {
                            var level: string = control.value.toString();
                            this.levelFilterService.newLevel = level;
                        }
                    }
                });
                feature.featureJson = featureJson;
                feature.featureType = featureTypes[i];
                featureList.push({ refId: refId, geomType: geomType, feature: feature, geometry: null })
            });
            this._list = featureList;
            this._observableList.next(this._list);
        }
    }

    clearCurrentFeatures() {
        this._list.forEach((item) => {
            console.log('Clearing..');
            item.geometry.setMap(null);
        });
        this._list = [];
        this._observableList.next(this._list);
    }
}
