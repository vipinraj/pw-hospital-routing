/*
 * This guard ensures that all the
 * required fields of the tag editor
 * form are filled  before the user
 * can switch to another feature or
 * activity.
 */
import { Injectable, Inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FeatureTypeSelectorComponent } from '../feature-type-selector/feature-type-selector.component';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class FeatureTypeSelectorConfirmDeactivateGuard implements CanDeactivate<FeatureTypeSelectorComponent> {
    constructor(public snackBar: MdSnackBar) {

    }
    canDeactivate(target: FeatureTypeSelectorComponent) {
        if (!target.canDeactivate) {
            this.snackBar.open("Please select a feature type!", "Dismiss", {
                duration: 5000
            });
            return false;
        }
        return true;
    }

}