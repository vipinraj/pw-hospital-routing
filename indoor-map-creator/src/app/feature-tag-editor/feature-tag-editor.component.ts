import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureService } from "../services/feature.service";
import { FormFieldService } from '../services/form-field.service'
import { Building } from '../models/building.model';
import { BaseControl } from '../ui-controls/base-control';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

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

  constructor(fb: FormBuilder, private route: ActivatedRoute, private featureService: FeatureService, private ffs: FormFieldService) {
    route.params.subscribe(params => {
      this.selectedFeatureRefId = params['refId'];
      console.log('selectedFeatureRefId: ' + this.selectedFeatureRefId);
      this.featureService.observableList.subscribe(
        items => {
          items.forEach((item) => {
            if (item.refId == this.selectedFeatureRefId) {
              // populating the reference textbox
              item.feature.formControls[0].value = this.selectedFeatureRefId;
              this.tagForm = ffs.toFormGroup(item.feature.formControls);
              // this.selectedFeatureControls = item.feature.formControls;
              this.selectedItem = item;
            }
          });
        }
      );
    });
  }

  ngOnInit() {
  }

  get isFormValid() {
    if (this.tagForm.valid) {
      // save form data
      var formData = this.tagForm.value;
      this.selectedItem.feature.formControls.forEach((control) => {
        control.value = formData[control.key];
        if (control.tag == 'level') {
          this.selectedItem.geometry.level = formData[control.key];
        }
      });
      console.log(this.selectedItem.geometry);
      return true;
    }
    return false;
  }

  onSubmit() {

  }
}

// https://angular.io/guide/reactive-forms#nested-formgroups
// https://embed.plnkr.co/?show=preview
// https://angular.io/guide/dynamic-form#bootstrap