import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  // callback method
  // return an Observable or a Promise or a boolean
  // it tells our routes whether or not it is allowed to access the routes trying to be accessed
  // | => union type means we can return any of these 3 values
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn())
      return true;

    // if the user is not logged in
    this.alertify.error("You need to login to access this fuckin' area!");

    // Redirect the user to the home page.
    this.router.navigate(['/home']);

    return false;
  }
}
