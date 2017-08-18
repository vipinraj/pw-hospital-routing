import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginActivateGuard } from '../services/LoginActivateGuard'
declare var gapi: any;

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit {

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, private zone: NgZone, private loginActivateGuard: LoginActivateGuard) { }

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
    //  this.zone.run(() => { this.infoProfile.name = profile.getName(),
    //                        this.infoProfile.email = profile.getEmail(),
    //                        console.log(profile)

    //                      })
    localStorage.setItem('isLogined', 'true');
    localStorage.setItem('accountId', profile.getId());
  };
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
}