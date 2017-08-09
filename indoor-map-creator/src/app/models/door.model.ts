import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Door extends Feature {
    _formControls: BaseControl<any>[] = [
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
                { key: 'loadingdock', value: 'Loadingdock' }
            ],
            required: true
        }),
        new SelectBox({
            key: 'entrance',
            label: 'Entrance',
            tag: 'entrance',
            options: [
                { key: 'yes', value: 'Yes' },
                { key: 'main', value: 'Main' },
                { key: 'service', value: 'Service' },
                { key: 'exit', value: 'Exit' },
                { key: 'folding', value: 'Folding' },
                { key: 'emergency', value: 'Emergency' },
                { key: 'staircase', value: 'Staircase' },
                { key: 'home', value: 'Home' }
            ],
            value: 'yes'
        }),
        new SelectBox({
            key: 'wheelchair',
            label: 'Wheelchair',
            tag: 'wheelchair',
            options: [
                { key: 'yes', value: 'Yes' },
                { key: 'no', value: 'No' },
                { key: 'limited', value: 'Limited' }
            ]
        }),
        new NumericTextBox({
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