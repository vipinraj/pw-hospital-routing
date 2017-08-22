import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { FormFieldService } from '../services/form-field.service';
import { LevelFilterService } from '../services/level-filter.service';
import { BeaconReferenceService } from '../services/beacon-reference.service';
import { Building } from '../models/building.model';
import { BaseControl } from '../ui-controls/base-control';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// this component take care of the tag editor form
@Component({
  selector: 'app-feature-tag-editor',
  templateUrl: './feature-tag-editor.component.html',
  styleUrls: ['./feature-tag-editor.component.css'],
  providers: []
})
export class FeatureTagEditorComponent implements OnInit {
  tagForm: FormGroup;
  selectedFeatureRefId: string;
  // selectedFeatureControls: BaseControl<any>[] = [];
  selectedItem: any;
  selectedItemIndex: number;
  featureDeleted: boolean;

  constructor(fb: FormBuilder, private route: ActivatedRoute, private featureService: FeatureService, private ffs: FormFieldService, private levelFilterService: LevelFilterService, private beaconReferenceService: BeaconReferenceService, public dialog: MdDialog, private router: Router) {
    this.featureDeleted = false;
    route.params.subscribe(params => {
      this.selectedFeatureRefId = params['refId'];
      console.log('selectedFeatureRefId: ' + this.selectedFeatureRefId);
      this.featureService.observableList.subscribe(
        items => {
          items.forEach((item, index) => {
            if (item.refId == this.selectedFeatureRefId) {
              // populating the reference textbox
              item.feature.formControls[0].value = this.selectedFeatureRefId;
              console.log(item.feature.formControls[0]);
              this.tagForm = ffs.toFormGroup(item.feature.formControls);
              // this.selectedFeatureControls = item.feature.formControls;
              this.selectedItem = item;
              this.selectedItemIndex = index;
            }
          });
        }
      );
    });
  }

  ngOnInit() {
  }

  get isFormValid() {
    if (this.featureDeleted) {
      return true;
    }
    if (this.tagForm.valid) {
      // save form data
      var formData = this.tagForm.value;
      this.selectedItem.feature.formControls.forEach((control) => {
        if (!control.disabled) {
          control.value = formData[control.key];
          if (control.tag == 'level' || control.tag == 'building') {
            var level: string = formData[control.key].toString();
            this.selectedItem.geometry.level = level;
            this.levelFilterService.newLevel = level;
          }
          if (control.tag == 'ref:beacon') {
            var ref = formData[control.key];
            console.log(ref);
            if (ref) {
              this.beaconReferenceService.add(ref);
            }
          }
        }
      });
      console.log(this.selectedItem.geometry);
      return true;
    }
    return false;
  }

  onSubmit() {

  }

  onDeleteFeature() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent,
      { data: { message: 'Are you sure you want to delete<br/> this feature permanently ?' } }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        // delete feature
        this.featureDeleted = true;
        // delete level if present
        if (this.selectedItem.geometry.level) {
          this.levelFilterService.deleteLevel = this.selectedItem.geometry.level;
        }
        // delete beaconreference
        this.selectedItem.feature.formControls.forEach(control => {
          if (control.tag == 'ref:beacon') {
            var ref = control.value;
            console.log(ref);
            if (ref) {
              this.beaconReferenceService.delete(ref);
            }
          }
        });
        this.selectedItem.geometry.setMap(null);
        this.featureService.delete(this.selectedItemIndex);
        this.router.navigateByUrl("/");
      }
    });
  }
}

// https://angular.io/guide/reactive-forms#nested-formgroups
// https://embed.plnkr.co/?show=preview
// https://angular.io/guide/dynamic-form#bootstrap