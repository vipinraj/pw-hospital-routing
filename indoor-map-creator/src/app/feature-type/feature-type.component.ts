import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-type',
  templateUrl: './feature-type.component.html',
  styleUrls: ['./feature-type.component.css']
})
export class FeatureTypeComponent implements OnInit {
  @Input("selectedGeometryType") selectedGeometry: string;
  geometryFeatureMapping = {
    'area': [
      { name: "building", label: "Building", icon: "" },
      { name: "room", label: "Room", icon: "" },
      { name: "corridor", label: "Corridor", icon: "" },
      { name: "area", label: "Area", icon: "" }
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
  constructor() { }

  ngOnInit() {
  }

}

