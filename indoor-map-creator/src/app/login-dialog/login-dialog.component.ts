/* 
  Component to show the google login dialog box
*/
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginActivateGuard } from '../services/LoginActivateGuard'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserAccountComponent } from '../user-account/user-account.component';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
declare var gapi: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit {
  token: any;
  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, private zone: NgZone, private loginActivateGuard: LoginActivateGuard, private http: Http, public dialog: MdDialog, private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // render the google signin button
    gapi.signin2.render('my-signin2', {
      'onsuccess': param => this.onSignIn(param),
      'scope': 'profile email',
      'theme': 'light'
    });
  }

  // function to run after signin
  onSignIn(googleUser) {
    // perform operations after client side login
    this.userService.signIn(googleUser, (err, isSuccess) => {
      if (isSuccess) {
        this.zone.run(() => {
          this.dialogRef.close();
          // open project dialog
          this.dialog.open(UserAccountComponent, { disableClose: true, width: '60vw', height: 'auto' });
        });
      }
    });
  };
}