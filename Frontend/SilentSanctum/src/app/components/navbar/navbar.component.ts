import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService, LocalStorageCache } from '@auth0/auth0-angular';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profileJson: any;
  userProfilePic: any;
  userNickName: any;
  userToken: any;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public backendService: BackendConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      // console.log("profile from subs login:", profile);
      this.backendService.login(profile).subscribe((response) => {
        // console.log('response: ', response);
        this.userToken = response.username;
      });
      this.profileJson = profile;
      this.userProfilePic = profile?.picture;
      this.userNickName = profile?.nickname;
    });
  }

  logoutUser() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
    let logoutParams = {
      loginId: localStorage.getItem('LoginId'),
    };
    this.backendService.logout(logoutParams);
  }
}
