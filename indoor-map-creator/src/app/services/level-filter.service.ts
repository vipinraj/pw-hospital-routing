/* 
 * Service that maintain a set 
 * of current levels (floors).
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LevelFilterService {
    // registry of levels
    private _list: string[] = [];
    private _observableList: BehaviorSubject<string[]> = new BehaviorSubject([]);
    levelList$: Observable<string[]>;
    levelCount = {};

    constructor() {
        this.levelList$ = new Subject<string[]>();
        this.levelList$ = this._observableList.asObservable();
    }

    // delete a level from registry
    set deleteLevel(level: string) {
        this.levelCount[level] -= 1;
        if (this.levelCount[level] == 0) {
            var i = this._list.indexOf(level);
            this._list.splice(i, 1);
            this._observableList.next(this._list);
            delete this.levelCount[level];
        }
    }

    // add a level to registry
    set newLevel(level: string) {
        if (this.levelCount[level]) {
            this.levelCount[level] += 1;
        } else {
            this.levelCount[level] = 1;
        }
        this._list.push(level);
        // remove duplicates
        this._list = Array.from(new Set(this._list));
        this._observableList.next(this._list);
    }
    
    // clear the registry
    clearCurrentLevels() {
        this._list = [];
        this._observableList.next(this._list);
    }
}
