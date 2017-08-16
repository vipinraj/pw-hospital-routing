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
    setTimeout(() => {
      this.dialog.open(LoginDialogComponent, { disableClose: true, width: '300px', height: '160px'});
    }, 500);

  }

}
// https://developers.google.com/identity/sign-in/web/backend-auth
// http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
// https://github.com/milad1367/angular2-google-login/blob/master/docs/index.html
// https://auth0.com/blog/angular-2-authentication/
// https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618