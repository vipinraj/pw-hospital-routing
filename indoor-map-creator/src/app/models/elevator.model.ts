import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Elevator extends Feature {
    _formControls: BaseControl<any>[] = [
        new SelectBox({
            key: 'highway',
            label: 'Highway',
            tag: 'highway',
            options: [
                { key: 'elevator', value: 'Elevator' }
            ],
            value: 'elevator',
            required: true,
            disabled: true
        }),
        new SelectBox({
            key: 'indoor',
            label: 'Indoor type',
            tag: 'indoor',
            options: [
                { key: 'room', value: 'Room' },
                { key: 'area', value: 'Area' }
            ],
            required: true
        }),
        new TextBox({
            key: 'level',
            label: 'Level',
            tag: 'level',
            required: true
        }),
        new TextBox({
            key: 'repeat_on',
            label: 'Repeat on',
            tag: 'repeat_on'
        }),
    ];

    constructor() {
        super();
        super.appendFormControls(this._formControls);
    }
}