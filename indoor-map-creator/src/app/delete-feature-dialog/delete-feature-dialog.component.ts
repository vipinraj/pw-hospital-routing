import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-feature-dialog',
  templateUrl: './delete-feature-dialog.component.html',
  styleUrls: ['./delete-feature-dialog.component.css']
})
export class DeleteFeatureDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<DeleteFeatureDialogComponent>) { }

  ngOnInit() {
  }

}
