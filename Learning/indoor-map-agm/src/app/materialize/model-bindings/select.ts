import {Component, Input, Output, EventEmitter} from "@angular/core";
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import {Option} from './option';

@Component({
    selector: "materialSelect",
    template: `
                <select [ngModel]="initialValue" (ngModelChange)="change($event)" id="selectExample" materialize="material_select" [materializeSelectOptions]="options">
                  <option value="" disabled selected>Select option ..</option>
                  <option *ngFor="let option of options" [value]="option.value">{{option.name}}</option>
                </select>
            `
})
export class MaterialSelect {
    @Input() initialValue: string;
    @Output() modelChange = new EventEmitter();
    @Input() options: Array<Option>;

    change(newValue) {
      Materialize.toast('child select: '+newValue, 2000)
      this.modelChange.emit(newValue);
    }
}
