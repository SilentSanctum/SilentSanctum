import { Component } from '@angular/core';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  constructor(public backendService: BackendConnectionService) {}
  allPosts: any = null;

  calculateRemainingTime(created: any) {
    const createdTimestamp = Date.parse(created);
    const now = Date.now();
    const expirationTimestamp = createdTimestamp + 24 * 60 * 60 * 1000;
    if (now >= expirationTimestamp) {
      return {
        hours: 0,
        minutes: 0,
      };
    }

    const timeRemaining = expirationTimestamp - now;
    const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutesRemaining = Math.floor(
      (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
    );
    return {
      hours: hoursRemaining,
      minutes: minutesRemaining,
    };
  }

  displayRemainingTime(timeString: any) {
    let rem = this.calculateRemainingTime(timeString);
    if (rem.hours == 0) {
      return String(rem.hours) + ' hrs';
    } else {
      return String(rem.minutes) + ' mins';
    }
  }
  ngOnInit() {
    const getPostsUserId = localStorage.getItem('LoginId');
    console.log('user id: ', getPostsUserId);
    const getPostsData = {
      loginId: getPostsUserId,
    };
    this.backendService.getAllPosts(getPostsData).subscribe((response) => {
      this.allPosts = response;
      console.log('all posts: ', response);
    });
  }
}
