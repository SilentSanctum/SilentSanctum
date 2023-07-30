import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendConnectionService } from './backend-connection.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private backendService: BackendConnectionService) {}
  private postsSource = new BehaviorSubject([]);
  postsFetched = this.postsSource.asObservable();
  changePosts() {
    const getPostsUserId = localStorage.getItem('LoginId');
    console.log('user id: ', getPostsUserId);
    const getPostsData = {
      loginId: getPostsUserId,
    };
    this.backendService.getAllPosts(getPostsData).subscribe((response) => {
      this.postsSource.next(response);
      console.log('all posts: ', response);
    });
  }
}
