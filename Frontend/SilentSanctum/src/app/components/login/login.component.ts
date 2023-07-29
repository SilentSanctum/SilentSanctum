import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  login() {
    this.auth.loginWithRedirect();
    // this.router.navigateByUrl('\home');
  }
}
