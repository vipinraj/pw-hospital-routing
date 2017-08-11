import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Corridor extends Feature {
    _formControls: BaseControl<any>[] = [
        new SelectBox({
            key: 'indoor',
            label: 'Indoor type',
            tag: 'indoor',
            options: [
                { key: 'corridor', value: 'Corridor' }
            ],
            value: 'corridor',
            disabled: true,
            required: true
        }),
        new TextBox({
            key: 'level',
            label: 'Level',
            tag: 'level',
            required: true
        }),
        new SelectBox({
            key: 'door',
            label: 'Door',
            tag: 'door',
            options: [
                { key: 'yes', value: 'Yes' },
                { key: 'hinged', value: 'Hinged' },
                { key: 'sliding', value: 'Aliding' },
                { key: 'revolving', value: 'Revolving' },
                { key: 'folding', value: 'Folding' },
                { key: 'trapdoor', value: 'Trapdoor' },
                { key: 'overhead', value: 'Overhead' },
                { key: 'loadingdock', value: 'Loadingdock' },
                { key: 'no', value: 'No' },
            ]
        })
    ];

    constructor() {
        super();
        super.appendFormControls(this._formControls);
    }
}