import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  constructor(private commentsService: CommentsService) {}
  allComments: any = null;
  ngOnInit() {
    this.commentsService.commentsFetched.subscribe((comments) => {
      this.allComments = comments;
    });
  }
}
