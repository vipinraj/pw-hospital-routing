import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Area extends Feature {
    _formControls: BaseControl<any>[] = [
        new SelectBox({
            key: 'indoor',
            label: 'Indoor type',
            tag: 'indoor',
            options: [
                { key: 'area', value: 'Area' }
            ],
            value: 'area',
            disabled: true,
            required: true
        }),
        new TextBox({
            key: 'level',
            label: 'Level',
            tag: 'level',
            required: true
        })
    ];

    constructor() {
        super();
        super.appendFormControls(this._formControls);
    }
}