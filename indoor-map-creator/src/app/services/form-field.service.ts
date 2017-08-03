import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseControl } from '../ui-controls/base-control';

@Injectable()
export class FormFieldService {
    constructor() { }

    toFormGroup(controls: BaseControl<any>[]) {
        let group: any = {};

        controls.forEach(item => {
            group[item.key] = item.required ?
                new FormControl({ value: item.value || '', disabled: item.disabled ? true : false }, Validators.required)
                : new FormControl({ value: item.value, disabled: item.disabled ? true : false } || '');
        });
        return new FormGroup(group);
    }
}