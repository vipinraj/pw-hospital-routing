import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs/Subscription';
import { FeatureTypeService }   from '../services/feature-type.service';

// parent component for side navigation
@Component({
  selector: 'app-side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.css']
})
export class SidePaneComponent implements OnInit {
  @Input() mapApi: GoogleMapsAPIWrapper;
  subscription: Subscription;
  selectedGeometryType: string;
  constructor(private _featureTypeService: FeatureTypeService) { }

  ngOnInit() {
       this.subscription = this._featureTypeService.featureItem$
       .subscribe(item => this.selectedGeometryType = item)
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
