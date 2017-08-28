/*
 * Component to show a confirmation dialog with 
 * Yes/No buttons for various operations.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    console.log(data);
   }

  ngOnInit() {
  }

}
