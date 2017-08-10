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
}
