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
  selectedFeatureControls: BaseControl<any>[] = [];
  constructor(fb: FormBuilder, private route: ActivatedRoute, private featureService: FeatureService, private ffs: FormFieldService) {
    route.params.subscribe(params => {
      this.selectedFeatureRefId = params['refId'];
      console.log('selectedFeatureRefId: ' + this.selectedFeatureRefId);
      this.featureService.observableList.subscribe(
        items => {
          items.forEach((item) => {
            if (item.refId == this.selectedFeatureRefId) {
              var building = item.feature;
              // populating the reference textbox
              item.feature.formControls[0].value = this.selectedFeatureRefId;
              this.tagForm = ffs.toFormGroup(item.feature.formControls);
              this.selectedFeatureControls = item.feature.formControls;
              console.log(this.tagForm);
            }
          });
        }
      );
    });
  }

  ngOnInit() {
  }

}

// https://angular.io/guide/reactive-forms#nested-formgroups
// https://embed.plnkr.co/?show=preview
// https://angular.io/guide/dynamic-form#bootstrap