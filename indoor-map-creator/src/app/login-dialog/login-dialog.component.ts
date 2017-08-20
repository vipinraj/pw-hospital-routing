import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginActivateGuard } from '../services/LoginActivateGuard'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserAccountComponent } from '../user-account/user-account.component';
declare var gapi: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit {

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, private zone: NgZone, private loginActivateGuard: LoginActivateGuard, private http: Http, public dialog: MdDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    gapi.signin2.render('my-signin2', {
      'onsuccess': param => this.onSignIn(param),
      'scope': 'profile email',
      'theme': 'light'
    });
    console.log(gapi);
  }
  onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    console.log("Token: " + googleUser.getAuthResponse().id_token);
    //  this.zone.run(() => { this.infoProfile.name = profile.getName(),
    //                        this.infoProfile.email = profile.getEmail(),
    //                        console.log(profile)

    //                      })
    localStorage.setItem('isLogined', 'true');
    localStorage.setItem('accountId', profile.getId());
    this.getOrCreateUser(googleUser.getAuthResponse().id_token);
  };

  getOrCreateUser(token) {
    // get the user from server
    this.http.request('http://localhost:3000/users?token=' + token)
      .subscribe((res: Response) => {
        var user = res.json();
        if (user) {
          console.log(user);
          this.zone.run(() => {
            this.dialogRef.close();
            // open project dialog
            this.dialog.open(UserAccountComponent, { disableClose: false, width: '60vw', height: '57vh' });
          });
        } else {
          // create user (for new users)
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          this.http.post('http://localhost:3000/users', {
            token: token
          }, options).subscribe((res: Response) => {
            var user = res.json();
            console.log(user);
            this.zone.run(() => {
              this.dialogRef.close();
              // open project dialog
              this.dialog.open(UserAccountComponent, { disableClose: false, width: '60vw', height: '57vh' });
            });
          });
        }
      });

  }

  updateUserSevice(user) {
    // create user object
    // get projects from server
    // create project objects
    // set
  }

  // signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut();
  // }
}