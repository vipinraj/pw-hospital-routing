import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  projects = [
    {
      name: 'Project 1',
      center: '27.999, 96.332',
      zoom: '28'
    },
    {
      name: 'Project 2',
      center: '27.999, 96.332',
      zoom: '28'
    }
  ];
  constructor(public dialogRef: MdDialogRef<UserAccountComponent>,) { }

  ngOnInit() {
  }

}

