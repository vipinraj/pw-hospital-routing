import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LevelFilterService {
    private _list: string[] = [];
    private _observableList: BehaviorSubject<string[]> = new BehaviorSubject([]);
    levelList$: Observable<string[]>;

    constructor() {
        this.levelList$ = new Subject<string[]>();
        this.levelList$ = this._observableList.asObservable();
    }

    set newLevel(level: string) {
        this._list.push(level);
        // remove duplicates
        this._list = Array.from(new Set(this._list));
        this._observableList.next(this._list);
    }

}
