import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BeaconReferenceService {
    private _list: number[] = [];
    private _observableList:
    BehaviorSubject<number[]> = new BehaviorSubject([]);

    get observableList(): Observable<number[]> {
        return this._observableList.asObservable();
    };

    exists(reference: number) {
        if (this._list.indexOf(reference) > -1) {
            return true;
        } else {
            return false;
        }
    }

    add(reference: number) {
        if (this._list.indexOf(reference) < 0) {
            this._list.push(reference);
            this._observableList.next(this._list);
        }
    }

    delete(reference: number) {
        var index = this._list.indexOf(reference);
        this._list.splice(index, 1);
        this._observableList.next(this._list);
    }

    clearCurrentReference() {
        this._list = [];
        this._observableList.next(this._list);
    }
}
