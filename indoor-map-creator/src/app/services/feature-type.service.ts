import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FeatureTypeService {
  // Observable navItem source
  private _featureItemSource = new BehaviorSubject<string>('area');
  // Observable navItem stream
  featureItem$ = this._featureItemSource.asObservable();
  // service command
  changeFeature(string) {
    this._featureItemSource.next(string);
  }
}
