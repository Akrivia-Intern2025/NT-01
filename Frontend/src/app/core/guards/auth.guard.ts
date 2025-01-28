import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  isLoggedIn() {
    const token = sessionStorage.getItem('access_token');
    console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}

