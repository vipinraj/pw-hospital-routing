import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { Building } from '../models/building.model';
import { Room } from '../models/room.model';

// This component represent the feature types
// for a perticular geometry.
@Component({
  selector: 'app-feature-type',
  templateUrl: './feature-type.component.html',
  styleUrls: ['./feature-type.component.css']
})
export class FeatureTypeComponent implements OnInit {
  // type of selected geometry
  selectedGeometry: string;
  selectedGeometryRefid: string;
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
  constructor(private route: ActivatedRoute, private featureService: FeatureService, private router: Router) { 
    // get parmeter from url
    route.params.subscribe(params => { 
      this.selectedGeometry = params['selectedGeomType'];
      this.selectedGeometryRefid = params['refId'];
    });
    console.log(this.selectedGeometry);
    console.log(this.selectedGeometryRefid);
  }

  onChooseFeatureType(featureType) {
    console.log("featureType: " + featureType);
    var feature;
    switch (featureType) {
      case "building":
        feature = new Building();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "room":
        feature = new Room();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "corridor":
        
        break;
      case "area":
        
        break;
      default:
        break;
    }
    this.featureService.observableList.subscribe(
      items => {
        items.forEach((item)=> {
          if (item.refId == this.selectedGeometryRefid) {
            item.geometry.featureType = featureType;
            item.feature = feature;
            console.log('Feature set');
            this.router.navigateByUrl("/edit-tags/" + this.selectedGeometryRefid);
          }
        });
      }
    );
  }

  ngOnInit() {
  }

}

