import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LevelFilterService {
    private _list: string[] = [];
    private _observableList: 
    BehaviorSubject<string[]> = new BehaviorSubject([]);

    get observableList(): Observable<string[]> {
        return this._observableList.asObservable();
    };

    add(level: string) {
        this._list.push(level);
        this._observableList.next(this._list);
    }

}
