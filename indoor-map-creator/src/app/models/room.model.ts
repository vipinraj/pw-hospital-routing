import { Feature } from "./feature.model";
import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';
import { SelectBox } from '../ui-controls/selectbox';

export class Room extends Feature {
    _formControls: BaseControl<any>[] = [
        new SelectBox({
            key: 'indoor',
            label: 'Indoor type',
            tag: 'indoor',
            options: [
                { key: 'room', value: 'Room' }
            ],
            value: 'room',
            disabled: true,
            required: true
        }),
        new NumericTextBox({
            key: 'level',
            label: 'Level',
            tag: 'level',
            required: true
        }),
        new SelectBox({
            key: 'amenity',
            label: 'Amenity',
            tag: 'amenity',
            options: [
                { key: 'doctor', value: 'Doctor' },
                { key: 'pharmacy', value: 'Pharmacy' },
                { key: 'clinic', value: 'Clinic' },
                { key: 'dentist', value: 'Dentist' },
                { key: 'gynecologist', value: 'Gynecologist' },
                { key: 'hand surgeon', value: 'Hand surgeon' },
                { key: 'neurologist', value: 'Neurologist' },
                { key: 'oncologist', value: 'Oncologist' },
                { key: 'pediatrician', value: 'Pediatrician' },
                { key: 'psychiatrist', value: 'Psychiatrist' },
                { key: 'plastic surgeon', value: 'Plastic surgeon' },
                { key: 'surgeon', value: 'Surgeon' }
            ],
            value: 'doctor',
            required: true
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