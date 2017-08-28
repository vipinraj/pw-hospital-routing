/*
 * Provider of map api for
 * all other components.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Injectable()
export class MapApiService {
  // Observable mapApi source
  public mapApiSource: Subject<GoogleMapsAPIWrapper> = new BehaviorSubject<GoogleMapsAPIWrapper>(null);
  // set map api object
  setApi(mapApi) {
    this.mapApiSource.next(mapApi);
  }
}
