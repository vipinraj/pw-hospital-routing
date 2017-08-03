import { BaseControl } from './base-control';

export class NumericTextBox extends BaseControl<number> {
    controlType = 'number';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
