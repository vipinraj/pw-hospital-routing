import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseControl } from '../ui-controls/base-control';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent implements OnInit {
  @Input() field: BaseControl<any>;
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }
  
  get isValid() {
    // see: https://github.com/angular/angular/issues/11432
    if (this.field.disabled) {
      return true;
    }
    return this.form.controls[this.field.key].valid;
  };
}
