import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-type',
  templateUrl: './feature-type.component.html',
  styleUrls: ['./feature-type.component.css']
})
export class FeatureTypeComponent implements OnInit {
  @Input("selectedGeometryType") selectedGeometry: string;
  geometryFeatureMapping = {
    'area': [
      { name: "building", label: "Building", icon: "home" },
      { name: "room", label: "Room", icon: "tab_unselected" },
      { name: "corridor", label: "Corridor", icon: "view_stream" },
      { name: "area", label: "Area", icon: "video_label" }
    ],
    'line': [
      { name: "wall", label: "Wall", icon: "" },
    ],
    'point': [
      { name: "door", label: "Door", icon: "" },
      { name: "stairs", label: "Stairs", icon: "" },
      { name: "escalators", label: "Escalators", icon: "" },
      { name: "elevators", label: "Elevators", icon: "" },
    ]
  };
  constructor(private route: ActivatedRoute) { 
    route.params.subscribe(params => { this.selectedGeometry = params['selectedGeomType']; });
  }

  ngOnInit() {
  }

}

