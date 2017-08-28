/*
 * Dialog to create a new project.
 */
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { FormFieldService } from '../services/form-field.service';
import { TextBox } from '../ui-controls/textbox';
import { NumericTextBox } from '../ui-controls/numeric-textbox';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {
  tagForm: FormGroup;
  formControls = [
    new TextBox({
      key: 'name',
      label: 'Name',
      required: true
    }),
    new TextBox({
      key: 'center_latitude',
      label: 'Center Latitude'
    }),
    new TextBox({
      key: 'center_longitude',
      label: 'Center Longitude'
    }),
    new NumericTextBox({
      key: 'zoom_level',
      label: 'Zoom Level'
    }),
  ];
  constructor(public dialogRef: MdDialogRef<CreateProjectDialogComponent>, private ffs: FormFieldService, private userService: UserService) {
    this.tagForm = ffs.toFormGroup(this.formControls);
   }

  ngOnInit() {
  }

  // Create the project and save to database
  onSubmit() {
    console.log(this.tagForm.value);
    // create project object
    var newProject = new Project({
      name: <string> this.tagForm.value.name,
      centerLat: this.tagForm.value.center_latitude,
      centerLong: this.tagForm.value.center_longitude,
      zoomLevel: this.tagForm.value.zoom_level
    });
    console.log(newProject);
    this.userService.createProject(newProject);
    this.dialogRef.close();
  }
}
