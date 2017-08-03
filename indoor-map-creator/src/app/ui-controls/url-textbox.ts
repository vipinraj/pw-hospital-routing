import { BaseControl } from './base-control';

export class UrlTextBox extends BaseControl<string> {
    controlType = 'url';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
