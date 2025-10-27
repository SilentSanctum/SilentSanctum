import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileJson: any;

  constructor(
    public auth: AuthService,
    private backendService: BackendConnectionService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(profile => {
      this.profileJson = profile;
      if (profile) {
        this.backendService.login(profile).subscribe(resp => {
          localStorage.setItem('username', resp.username);
          localStorage.setItem('LoginId', resp.loginId);
        });
      } else {
        localStorage.setItem('username', 'Visitor');
        localStorage.setItem('LoginId', 'visitor');
      }
    });
  }
}

