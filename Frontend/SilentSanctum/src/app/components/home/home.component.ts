import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { User } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileJson: any;
<<<<<<< HEAD
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public backendService: BackendConnectionService
  ) {}
=======
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public backendService: BackendConnectionService) {}
>>>>>>> e54a4207c96566f02083e6c791d69e04b7ed6f66

  ngOnInit(): void {
    // this.auth.user$.subscribe(
    //   (profile) =>{
    //     console.log("profile from subs: ", profile);
    //     (this.profileJson = profile);
    //   },
    // );
    // console.log("profile data: ", this.profileJson);
<<<<<<< HEAD
    this.auth.user$.subscribe((profile) => {
      // console.log("profile from subs login:", profile);
      this.profileJson = profile;
      console.log('profile json:', this.profileJson);
      this.backendService.login(profile).subscribe((response) => {
        console.log('response: ', response);
      });
    });
=======
    this.auth.user$.subscribe(
      (profile) =>{
        // console.log("profile from subs login:", profile);
        this.profileJson = profile;
        console.log("profile json:", this.profileJson);
        this.backendService.login(profile).subscribe((response)  =>{
          console.log("response: ", response);
        });
      },
    );
>>>>>>> e54a4207c96566f02083e6c791d69e04b7ed6f66
  }
}
