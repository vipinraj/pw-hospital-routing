import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Building extends Feature {
    building: string; // == hospital
    min_level: number;
    max_level: number;
    non_existent_levels: string;
    wheelchair: string;
    wheelchair_description_en: string;
    website: string;
    formControls: BaseControl<any>[] = [
        new TextBox({
            key: 'ref',
            label: 'Reference',
            disabled: true
        }),
        new NumericTextBox({
            key: 'ref_beacon',
            label: 'Beacon Reference',
        }),
        new TextArea({
            key: 'note',
            label: 'Description'
        }),
        new SelectBox({
            key: 'building',
            label: 'Building Type',
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
            required: true
        }),
        new NumericTextBox({
            key: 'max_level',
            label: 'Maximum Level',
            required: true
        }),
        new TextBox({
            key: 'non_existent_levels',
            label: 'Non Existent Levels',
        }),
        new SelectBox({
            key: 'wheelchair',
            label: 'Wheelchair Allowed',
            options: [
                { key: 'yes', value: 'Yes' },
                { key: 'no', value: 'No' }
            ],
            value: 'yes'
        }),
        new TextBox({
            key: 'wheelchair_description_en',
            label: 'Wheelchair Description',
        }),
        new UrlTextBox({
            key: 'website',
            label: 'Website'
        }),
    ];
    // formControls = {
    //     "ref": 1,
    //     "ref_beacon": "",
    //     "note": "",
    //     "name": "",
    //     "building": "",
    //     "min_level": "",
    //     "max_level": "",
    //     "non_existent_levels": "",
    //     "wheelchair": "",
    //     "wheelchair_description_en": "",
    //     "website": ""
    // };
    constructor() {
        super();
    }
}