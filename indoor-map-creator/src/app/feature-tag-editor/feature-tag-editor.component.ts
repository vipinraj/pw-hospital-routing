import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

// this component take care of the tag editor form
@Component({
  selector: 'app-feature-tag-editor',
  templateUrl: './feature-tag-editor.component.html',
  styleUrls: ['./feature-tag-editor.component.css']
})
export class FeatureTagEditorComponent implements OnInit {
  tagForm: FormGroup;
  constructor(fb: FormBuilder) { }

  ngOnInit() {
  }

}

// https://angular.io/guide/reactive-forms#nested-formgroups
// https://embed.plnkr.co/?show=preview
// https://angular.io/guide/dynamic-form#bootstrap