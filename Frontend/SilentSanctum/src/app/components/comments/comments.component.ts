import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  constructor(private commentsService: CommentsService) {
    this.commentsService.commentsFetched.subscribe((comments) => {
      this.allComments = comments;
      console.log('Comments fetched: ', this.allComments);
    });
  }
  allComments: any = [];
  newCommentBtnClicked = false;

  openCommentContainer() {
    this.newCommentBtnClicked = true; //update to false in the comment submit button
  }

  addComment() {
    this.newCommentBtnClicked = false;
  }
}
