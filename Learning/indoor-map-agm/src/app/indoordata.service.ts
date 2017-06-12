import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IndoorDataService {

  private _url: string = 'assets/pg.json';

  constructor(private _http: Http) {}

  getGeoJson() {
    return this._http.get(this._url)
      .map((response: Response) => response.json());
  }
}