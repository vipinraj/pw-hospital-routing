import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Building extends Feature {
    _formControls: BaseControl<any>[] = [
        new SelectBox({
            key: 'building',
            label: 'Building Type',
            tag: 'building',
            options: [
                { key: 'hospital', value: 'Hospital' },
                { key: 'building', value: 'Building' }
            ],
            value: 'hospital',
            required: true
        }),
        new NumericTextBox({
            key: 'min_level',
            label: 'Minimum Level',
            tag: 'min_level',
            required: true
        }),
        new NumericTextBox({
            key: 'max_level',
            label: 'Maximum Level',
            tag: 'max_level',
            required: true
        }),
        new TextBox({
            key: 'non_existent_levels',
            label: 'Non Existent Levels',
            tag: 'non_existent_levels'
        }),
        new SelectBox({
            key: 'wheelchair',
            label: 'Wheelchair Allowed',
            tag: 'wheelchair',
            options: [
                { key: 'yes', value: 'Yes' },
                { key: 'no', value: 'No' }
            ],
            value: 'yes'
        }),
        new TextBox({
            key: 'wheelchair_description_en',
            label: 'Wheelchair Description',
            tag: 'wheelchair:description:en'
        }),
        new UrlTextBox({
            key: 'website',
            label: 'Website',
            tag: 'website'
        }),
        new TextBox({
            key: 'opening_hours',
            label: 'Opening Hours',
            tag: 'opening_hours'
        })
    ];

    constructor() {
        super();
        super.appendFormControls(this._formControls);
    }
}