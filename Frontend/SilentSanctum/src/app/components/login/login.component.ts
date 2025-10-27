import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  loginWithAuth0() {
    this.auth.loginWithRedirect();
  }
}

