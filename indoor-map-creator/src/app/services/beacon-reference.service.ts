/* 
  This service keep track of the beacon reference
  numbers added for features so that no two 
  features have the same number.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BeaconReferenceService {
    // registry of added beacon reference numbers
    private _list: number[] = [];
    private _observableList:
    BehaviorSubject<number[]> = new BehaviorSubject([]);

    get observableList(): Observable<number[]> {
        return this._observableList.asObservable();
    };

    // Return true if the beacon reference number 
    // is already used by another feature.
    exists(reference: number) {
        if (this._list.indexOf(reference) > -1) {
            return true;
        } else {
            return false;
        }
    }

    // add a new beacon reference number to registry
    add(reference: number) {
        if (this._list.indexOf(reference) < 0) {
            this._list.push(reference);
            this._observableList.next(this._list);
        }
    }

    // Delete a beacon reference number (on deleting
    // a feature or on changing the number of an
    // existing feature)
    delete(reference: number) {
        var index = this._list.indexOf(reference);
        this._list.splice(index, 1);
        this._observableList.next(this._list);
    }

    // clear the entire registry
    clearCurrentReference() {
        this._list = [];
        this._observableList.next(this._list);
    }
}
