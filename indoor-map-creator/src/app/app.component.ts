import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidePaneComponent } from './side-pane/side-pane.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapApiService } from './services/map-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GoogleMapsAPIWrapper, MapApiService]
})
export class AppComponent {
  mapApi: GoogleMapsAPIWrapper;
  constructor(private _mapApi: GoogleMapsAPIWrapper, private _internalMapApiService: MapApiService) {
    this.mapApi = _mapApi;
    _internalMapApiService.setApi(_mapApi);
  }
}
