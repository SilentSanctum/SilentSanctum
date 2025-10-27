import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
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
  created: any;
  remainingTimeValue: any;
  remainingTimeParticular: any;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public backendService: BackendConnectionService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  logoutUser() {
    // ✅ Déconnecte Auth0 proprement et redirige vers /login
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin + '/login' },
    });

    // ✅ Appelle ton backend pour nettoyer la session serveur
    const logoutParams = {
      loginId: localStorage.getItem('LoginId'),
    };
    this.backendService.logout(logoutParams);

    // ✅ Nettoie aussi côté client
    localStorage.removeItem('LoginId');
    this.userToken = null;
    this.userNickName = null;
    this.userProfilePic = null;
  }

  calculateRemainingTime(created: any) {
    const createdTimestamp = Date.parse(created);
    const now = Date.now();
    const expirationTimestamp = createdTimestamp + 24 * 60 * 60 * 1000;

    if (now >= expirationTimestamp) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const timeRemaining = expirationTimestamp - now;
    const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutesRemaining = Math.floor(
      (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
    );
    const secondsRemaining = Math.floor((timeRemaining % (60 * 1000)) / 1000);

    return { hours: hoursRemaining, minutes: minutesRemaining, seconds: secondsRemaining };
  }

  updateRemainingTime(createdTime: any) {
    const remainingTimeObject = this.calculateRemainingTime(createdTime);
    if (remainingTimeObject.hours > 0) {
      this.remainingTimeValue = remainingTimeObject.hours;
      this.remainingTimeParticular = 'hrs';
    } else if (remainingTimeObject.minutes > 0) {
      this.remainingTimeValue = remainingTimeObject.minutes;
      this.remainingTimeParticular = 'mins';
    } else {
      this.remainingTimeValue = remainingTimeObject.seconds;
      this.remainingTimeParticular = 'secs';
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      if (profile) {
        this.backendService.login(profile).subscribe((response) => {
          this.userToken = response.username;
          this.created = response.created;
          setInterval(() => {
            this.updateRemainingTime(response.created);
          }, 1000);
        });

        this.profileJson = profile;
        this.userProfilePic = profile.picture;
        this.userNickName = profile.nickname;
      }
      this.cdRef.detectChanges();
    });
  }
}

