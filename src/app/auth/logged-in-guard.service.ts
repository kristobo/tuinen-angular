import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router) {

  }

  // Prevent showing pages to not logged in users.
  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}