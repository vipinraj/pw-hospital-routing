import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BeaconReferenceService } from './beacon-reference.service';

@Injectable()
export class CustomValidatorService {

    constructor() { }

    beaconreferenceUniqueValidator(beaconReferenceService: BeaconReferenceService, currentReference: number) {
        return function (control: FormControl): { [s: string]: boolean } {
            if (currentReference != control.value && beaconReferenceService.exists(control.value)) {
                return { nonUniqueReference: true };
            }
        }
    }
}