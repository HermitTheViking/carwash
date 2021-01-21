import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    constructor(private authservice: AuthenticationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>().pipe(map( u => this.authservice.isLoggedIn));
    }
}
