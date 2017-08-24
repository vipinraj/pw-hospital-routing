import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BeaconReferenceService {
    private _list: string[] = [];
    private _observableList:
    BehaviorSubject<string[]> = new BehaviorSubject([]);

    get observableList(): Observable<string[]> {
        return this._observableList.asObservable();
    };

    exists(reference: string) {
        if (this._list.indexOf(reference) > -1) {
            return true;
        } else {
            return false;
        }
    }

    add(reference: string) {
        if (this._list.indexOf(reference) < 0) {
            this._list.push(reference);
            this._observableList.next(this._list);
        }
    }

    delete(reference: string) {
        var index = this._list.indexOf(reference);
        this._list.splice(index, 1);
        this._observableList.next(this._list);
    }

    clearCurrentReference() {
        this._list = [];
        this._observableList.next(this._list);
    }
}
