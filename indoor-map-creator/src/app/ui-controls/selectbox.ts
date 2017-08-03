import { BaseControl } from './base-control';

export class SelectBox extends BaseControl<string> {
    controlType = 'select';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

