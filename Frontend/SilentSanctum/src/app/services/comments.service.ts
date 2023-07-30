import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendConnectionService } from './backend-connection.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private backendService: BackendConnectionService) {}
  private commentsSource = new BehaviorSubject([]);
  commentsFetched = this.commentsSource.asObservable();
  getComments(parentIdReq: any) {
    if (parentIdReq) {
      const getPostsUserId = localStorage.getItem('LoginId');
      console.log('user id: ', getPostsUserId);
      const getCommentsData = {
        loginId: getPostsUserId,
        parentId: parentIdReq,
      };
      this.backendService
        .getAllComments(getCommentsData)
        .subscribe((response) => {
          const getChildCommentsData = {
            loginId: getPostsUserId,
            parentId: response._id,
          };
          this.backendService
            .getAllComments(getChildCommentsData)
            .subscribe((response_child) => {
              response.children = response_child;
              this.commentsSource.next(response);
            });
          console.log('all comments: ', response);
        });
    }
  }
}
