import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Room extends Feature {

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
        new TextBox({
            key: 'name',
            label: 'Name'
        }),
        new TextArea({
            key: 'note',
            label: 'Description'
        }),
        new SelectBox({
            key: 'room',
            label: 'Room Type',
            options: [
                { key: 'shop', value: 'Shop' },
                { key: 'restaurant', value: 'Restaurant' },
                { key: 'office', value: 'Office' },
                { key: 'entrance', value: 'Entrance' },
                { key: 'stairs', value: 'Stairs' },
                { key: 'toilets', value: 'Toilets' },
                { key: 'toilet', value: 'Toilet' }
            ]
        }),
        new SelectBox({
            key: 'amenity',
            label: 'Amenity',
            options: [
                { key: 'clinic', value: 'Clinic' },
                { key: 'dentist', value: 'Dentist' },
                { key: 'doctor', value: 'Doctor' }
            ]
        })
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