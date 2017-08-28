/* 
  Empty component which cover the sidebar when the user
  is not logined.
  Also, trigger the loginDialog box.
*/
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    // open the google login dialog box
    setTimeout(() => {
      this.dialog.open(LoginDialogComponent, { disableClose: true, width: '300px', height: '160px'});
    }, 500);

  }

}