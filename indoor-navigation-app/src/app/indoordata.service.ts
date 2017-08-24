import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class IndoorDataService {

  // location of GeoJSON file in server
  private _url: string = environment.geoJsonUrl;

  constructor(private _http: Http) {}

  // fetch the file and parse the result as JSON
  getGeoJson() {
    return this._http.get(this._url)
      .map((response: Response) => response.json());
  }
}