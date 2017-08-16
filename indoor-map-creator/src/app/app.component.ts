import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidePaneComponent } from './side-pane/side-pane.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapApiService } from './services/map-api.service';
import { MdDialog } from '@angular/material';
import { UserAccountComponent } from './user-account/user-account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GoogleMapsAPIWrapper, MapApiService]
})
export class AppComponent {
  mapApi: GoogleMapsAPIWrapper;
  constructor(private _mapApi: GoogleMapsAPIWrapper, private _internalMapApiService: MapApiService, public dialog: MdDialog) {
    this.mapApi = _mapApi;
    _internalMapApiService.setApi(_mapApi);
  }

  onMyAccountClick() {
    this.dialog.open(UserAccountComponent, { disableClose: false, width: '60vw', height: '50vh'});
  }
}
