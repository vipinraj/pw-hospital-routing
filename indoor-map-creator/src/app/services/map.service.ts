import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
    map: any;
    constructor() {

    }

    getMap() {
        return this.map;
    }
}
