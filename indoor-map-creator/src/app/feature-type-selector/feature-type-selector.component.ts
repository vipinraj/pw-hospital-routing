import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { Building } from '../models/building.model';
import { Room } from '../models/room.model';
import { Corridor } from '../models/corridor.model';
import { Area } from '../models/area.model';
import { Wall } from '../models/wall.model';
import { Door } from '../models/door.model';
import { Stairs } from '../models/stairs.model';
import { Escalator } from '../models/escalator.model';
import { Elevator } from '../models/elevator.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// This component represent the feature types
// for a perticular geometry.
@Component({
  selector: 'app-feature-type',
  templateUrl: './feature-type-selector.component.html',
  styleUrls: ['./feature-type-selector.component.css']
})
export class FeatureTypeSelectorComponent implements OnInit {
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
      { name: "escalator", label: "Escalator", icon: "network_cell" },
      { name: "elevator", label: "Elevator", icon: "import_export" },
    ]
  };
  constructor(private route: ActivatedRoute, private featureService: FeatureService, private router: Router, public dialog: MdDialog) {
    // get parmeter from url
    route.params.subscribe(params => {
      this.selectedGeometry = params['selectedGeomType'];
      this.selectedGeometryRefid = params['refId'];
    });
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
        feature = new Corridor();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "area":
        feature = new Area();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "wall":
        feature = new Wall();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "door":
        feature = new Door();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "stairs":
        feature = new Stairs();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "escalator":
        feature = new Escalator();
        feature.ref = this.selectedGeometryRefid;
        break;
      case "elevator":
        feature = new Elevator();
        feature.ref = this.selectedGeometryRefid;
        break;
    }
    this.featureService.observableList.subscribe(
      items => {
        console.log(items);
        items.forEach((item) => {
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

  onDeleteFeature() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { message: 'Are you sure you want to delete<br/> this feature permanently ?' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {

        var index: number;
        var selectedItem: any;
        // 
        this.featureService.observableList.subscribe(
          items => {
            items.forEach((item, idx) => {
              if (item.refId == this.selectedGeometryRefid) {
                index = idx;
                selectedItem = item;
              }
            })
          });

        selectedItem.geometry.setMap(null);
        this.featureService.delete(index);
        this.router.navigateByUrl("/");
      }
    });
  }
}

