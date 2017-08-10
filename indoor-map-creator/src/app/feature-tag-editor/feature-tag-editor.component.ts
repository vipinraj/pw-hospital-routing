import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { FormFieldService } from '../services/form-field.service';
import { LevelFilterService } from '../services/level-filter.service';
import { Building } from '../models/building.model';
import { BaseControl } from '../ui-controls/base-control';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeleteFeatureDialogComponent } from '../delete-feature-dialog/delete-feature-dialog.component';

// this component take care of the tag editor form
@Component({
  selector: 'app-feature-tag-editor',
  templateUrl: './feature-tag-editor.component.html',
  styleUrls: ['./feature-tag-editor.component.css'],
  providers: [FormFieldService]
})
export class FeatureTagEditorComponent implements OnInit {
  tagForm: FormGroup;
  selectedFeatureRefId: string;
  // selectedFeatureControls: BaseControl<any>[] = [];
  selectedItem: any;
  selectedItemIndex: number;
  featureDeleted: boolean;

  constructor(fb: FormBuilder, private route: ActivatedRoute, private featureService: FeatureService, private ffs: FormFieldService, private levelFilterService: LevelFilterService, public dialog: MdDialog,  private router: Router) {
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
        control.value = formData[control.key];
        if (control.tag == 'level' || control.tag == 'building') {
          var level: string = formData[control.key].toString();
          this.selectedItem.geometry.level = level;
          this.levelFilterService.newLevel = level;
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
    let dialogRef = this.dialog.open(DeleteFeatureDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        // delete feature
        this.featureDeleted = true;
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