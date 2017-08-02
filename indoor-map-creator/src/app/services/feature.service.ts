import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Feature } from "../models/feature.model";

@Injectable()
export class FeatureService {
    private _list: Feature[] = [];
    private _observableList: BehaviorSubject<Feature[]> = new BehaviorSubject([]);

    get observableList(): Observable<Feature[]> {
        return this._observableList.asObservable()
    };

    add(feature: Feature) {
        this._list.push(feature);
        this._observableList.next(this._list);
    }

}
