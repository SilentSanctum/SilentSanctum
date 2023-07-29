import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profileJson: any;
  userProfilePic: any;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      // console.log("profile from subs login:", profile);
      this.profileJson = profile;
      console.log('profile json:', this.profileJson);
      this.userProfilePic = profile?.picture;
      console.log("user pic: ", this.userProfilePic);
    });
    // this.userProfilePic = this.profileJson.picture;
    console.log("profile out of scope: ", this.profileJson);
    console.log("user pic: ", this.userProfilePic);
  }

  logoutUser() {}
}
