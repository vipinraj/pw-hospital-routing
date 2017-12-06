/*
 * This guard ensures that all the
 * required fields of the tag editor
 * form are filled  before the user
 * can switch to another feature or
 * activity.
 */
import { Injectable, Inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FeatureTagEditorComponent } from '../feature-tag-editor/feature-tag-editor.component';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class TagEditorConfirmDeactivateGuard implements CanDeactivate<FeatureTagEditorComponent> {
    constructor(public snackBar: MdSnackBar) {

    }
    canDeactivate(target: FeatureTagEditorComponent) {
        if (!target.isFormValid) {
            this.snackBar.open("Please fill the required details!", "Dismiss", {
                duration: 5000
            });
            return false;
        }
        return true;
    }

}