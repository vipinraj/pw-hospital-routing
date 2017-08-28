/*
 * Component responsible for rendering a single
 * form field (TextBox, TextArea, SelectBox, etc)
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseControl } from '../ui-controls/base-control';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent implements OnInit {
  // input control/field
  @Input() field: BaseControl<any>;
  // parent form
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log(this.form);
  }

  // returns true if the field is valid
  get isValid() {
    // see: https://github.com/angular/angular/issues/11432
    if (this.field.disabled) {
      return true;
    }
    return this.form.controls[this.field.key].valid;
  };
}
