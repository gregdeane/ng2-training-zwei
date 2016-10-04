import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  template: `
    <h1>LOGIN</h1>
    <p>{{ message }}</p>
    <p>
      <button *ngIf="!authService.isLoggedIn"
              (click)="login()">
        Login
      </button>
      <button *ngIf="authService.isLoggedIn"
              (click)="logout()">
        Logout
      </button>
    </p>
  `
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(): void {
    this.message = 'Logging in...';

    this.authService.login().subscribe(() => {
      this.setMessage();

      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl || '/admin';
        this.router.navigate([redirect]);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }
}
