import { BaseControl } from '../ui-controls/base-control';
import { TextBox } from '../ui-controls/textbox';
import { TextArea } from '../ui-controls/textarea';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { UrlTextBox } from '../ui-controls/url-textbox';

export class Feature {
    formControls: BaseControl<any>[] = [
        new TextBox({
            key: 'ref',
            label: 'Reference',
            tag: 'ref',
            disabled: true
        }),
        new TextBox({
            key: 'ref_beacon',
            label: 'Beacon Reference',
            tag: 'ref:beacon',
            isUniqueBeaconRef: true
        }),
        new TextBox({
            key: 'name',
            label: 'Name',
            tag: 'name',
            required: true
        }),
        new TextArea({
            key: 'note',
            label: 'Description',
            tag: 'note'
        }),
        new UrlTextBox({
            key: 'image_url',
            label: 'Image URL',
            tag: 'image_url',
            pattern: 'https?://.+'
        }),
    ];

    appendFormControls(_formControls: BaseControl<any>[]) {
        this.formControls.push(..._formControls);
    }

    constructor() {
    }
    getProperties() {
        var properties = {};
        this.formControls.forEach((control) => {
            if (control['value'] && control['value'].toString().length > 0) {
                properties[control['tag']] = control['value'].toString();
            }
        });
        return properties;
    }
}