import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.css']
})
export class SidePaneComponent implements OnInit {
  @Input() mapApi: GoogleMapsAPIWrapper;
  constructor() { }

  ngOnInit() {
  }

}
