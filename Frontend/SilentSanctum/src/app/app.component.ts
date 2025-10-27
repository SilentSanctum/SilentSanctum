import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}

