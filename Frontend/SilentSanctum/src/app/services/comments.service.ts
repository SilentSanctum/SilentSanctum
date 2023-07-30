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
    try {
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
            for (let comment_item of response) {
              const getChildCommentsData = {
                loginId: getPostsUserId,
                parentId: comment_item._id,
              };
              this.backendService
                .getAllComments(getChildCommentsData)
                .subscribe((response_child) => {
                  comment_item.children = response_child;
                  this.commentsSource.next(response);
                });
            }
            this.commentsSource.next(response);
            console.log(response);
          });
      }
    } catch (e) {
      this.commentsSource.next([]);
    }
  }
}
