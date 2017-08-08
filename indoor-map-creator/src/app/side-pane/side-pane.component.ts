import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs/Subscription';

/*
 * Root component of side pane.
 * Only contains a <router-outlet> wherein
 * the the location search box, feature type
 * selector or feature tag editor will be
 * displayed.
 */

@Component({
  selector: 'app-side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.css']
})
export class SidePaneComponent implements OnInit {
  @Input() mapApi: GoogleMapsAPIWrapper;
  subscription: Subscription;
  selectedGeometryType: string;
  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
