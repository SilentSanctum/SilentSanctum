import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(
    public backendService: BackendConnectionService,
    private postService: PostsService,
    private commentsService: CommentsService
  ) {}
  allPosts: any = null;
  private updateInterval: any;

  calculateRemainingTime(created: any) {
    const createdTimestamp = Date.parse(created);
    const now = Date.now();
    const expirationTimestamp = createdTimestamp + 24 * 60 * 60 * 1000;
    if (now >= expirationTimestamp) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const timeRemaining = expirationTimestamp - now;
    const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutesRemaining = Math.floor(
      (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
    );
    const secondsRemaining = Math.floor((timeRemaining % (60 * 1000)) / 1000);
    return {
      hours: hoursRemaining,
      minutes: minutesRemaining,
      seconds: secondsRemaining,  
    };
  }

  displayRemainingTime(timeString: any) {
    let rem = this.calculateRemainingTime(timeString);
    // if (rem.hours > 0) {
    //   return String(rem.hours) + ' hrs';
    // } else {
    //   return String(rem.minutes) + ' mins';
    // }
    if (rem.hours > 0) {
      return `${rem.hours} hrs ${rem.minutes} mins ${rem.seconds} secs`;
    } else if (rem.minutes > 0) {
      return `${rem.minutes} mins ${rem.seconds} secs`;
    } 
    else {
      return `${rem.seconds} secs`;
    }
  }

  updateRemainingTime() {
    // const now = new Date();
    this.allPosts.forEach((post: any) => {
      const remainingTime = this.calculateRemainingTime(post.createdAt);
      post.remainingTime = this.displayRemainingTime(remainingTime);
    });
  }

  getComments(commentId: any) {
    this.commentsService.getComments(commentId);
  }

  ngOnInit() {
    this.postService.changePosts();
    this.postService.postsFetched.subscribe((posts) => (this.allPosts = posts));
    this.updateRemainingTime();
    this.updateInterval = setInterval(() => {
      this.updateRemainingTime(); // Update every second (adjust as needed)
    }, 1000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval); // Clear the interval when the component is destroyed
    }
  }
}
