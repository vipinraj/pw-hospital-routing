import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// This component represent the feature types
// for a perticular geometry.
@Component({
  selector: 'app-feature-type',
  templateUrl: './feature-type.component.html',
  styleUrls: ['./feature-type.component.css']
})
export class FeatureTypeComponent implements OnInit {
  // type of selected geometry
  @Input("selectedGeometryType") selectedGeometry: string;
  geometryFeatureMapping = {
    'area': [
      { name: "building", label: "Building", icon: "home" },
      { name: "room", label: "Room", icon: "tab_unselected" },
      { name: "corridor", label: "Corridor", icon: "view_stream" },
      { name: "area", label: "Area", icon: "video_label" }
    ],
    'line': [
      { name: "wall", label: "Wall", icon: "line_style" },
    ],
    'point': [
      { name: "door", label: "Door", icon: "exit_to_app" },
      { name: "stairs", label: "Stairs", icon: "call_made" },
      { name: "escalators", label: "Escalators", icon: "network_cell" },
      { name: "elevators", label: "Elevators", icon: "import_export" },
    ]
  };
  constructor(private route: ActivatedRoute) { 
    // get parmeter from url
    route.params.subscribe(params => { this.selectedGeometry = params['selectedGeomType']; });
  }

  ngOnInit() {
  }

}

