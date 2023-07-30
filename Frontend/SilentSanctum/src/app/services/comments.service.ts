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
  getComments(parentIdReq: any, authorId: any) {
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
              if (comment_item.author == authorId) {
                comment_item.isOP = true;
              } else {
                comment_item.isOP = false;
              }
              const getChildCommentsData = {
                loginId: getPostsUserId,
                parentId: comment_item._id,
              };
              this.backendService
                .getAllComments(getChildCommentsData)
                .subscribe((response_child) => {
                  for (let child of response_child) {
                    if (child.author == authorId) {
                      child.isOP = true;
                    } else {
                      child.isOP = false;
                    }
                  }
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
