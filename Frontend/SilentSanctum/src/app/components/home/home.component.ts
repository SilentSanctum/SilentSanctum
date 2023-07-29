import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { User } from '@auth0/auth0-spa-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileJson: any;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public backendService: BackendConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.auth.user$.subscribe(
    //   (profile) =>{
    //     console.log("profile from subs: ", profile);
    //     (this.profileJson = profile);
    //   },
    // );
    // console.log("profile data: ", this.profileJson);
    this.router.navigateByUrl('/posts');
    this.auth.user$.subscribe((profile) => {
      // console.log("profile from subs login:", profile);
      this.profileJson = profile;
      console.log('profile json:', this.profileJson);
      this.backendService.login(profile).subscribe((response) => {
        console.log('response: ', response);
      });
    });
    this.backendService.getAllPosts().subscribe((response) => {
      console.log("all posts: ", response);
    })
  }
}
