import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidePaneComponent } from './side-pane/side-pane.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { FeatureTypeService }   from './services/feature-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GoogleMapsAPIWrapper, FeatureTypeService]
})
export class AppComponent {
  mapApi: GoogleMapsAPIWrapper;
  constructor(private _mapApi: GoogleMapsAPIWrapper ) {
    this.mapApi = _mapApi;
  }
}
