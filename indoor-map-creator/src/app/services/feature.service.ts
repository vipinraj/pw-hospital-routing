import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Feature } from "../models/feature.model";

@Injectable()
export class FeatureService {
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
    convertToGeoJson() {
        var geo = { "type": "FeatureCollection", "features": [] };
        console.log(this._list);
        this._list.forEach(function (item) {
            if (item.geometry) {
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
                            coordinates.push([latLong.lat(), latLong.lng()]);
                        });
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                    case 'point': {
                        feature['geometry']['type'] = 'Point';
                        coordinates = [item.geometry.getPosition().lat(), item.geometry.getPosition().lng()];
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                    case 'polygon': {
                        feature['geometry']['type'] = 'Polygon';
                        coordinates = [[]];
                        item.geometry.getPath().forEach(latLong => {
                            coordinates[0].push([latLong.lat(), latLong.lng()]);
                        });
                        feature['geometry']['coordinates'] = coordinates;
                        break;
                    }
                }
            }
        });

        console.log(geo);

        return geo;
    }
}
