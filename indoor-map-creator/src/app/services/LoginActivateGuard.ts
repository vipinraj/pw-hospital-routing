import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SearchPlacesComponent } from '../search-places/search-places.component';
import { Router } from '@angular/router';

@Injectable()
export class LoginActivateGuard implements CanActivate {
    constructor(private router: Router) {

    }
    canActivate() {
        this.router.navigate(['login']);
        return false;
    }

}