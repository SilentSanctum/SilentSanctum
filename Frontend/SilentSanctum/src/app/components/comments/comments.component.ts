import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public backendService: BackendConnectionService,
    private postService: PostsService
  ) {
    this.commentsService.commentsFetched.subscribe((comments) => {
      this.allComments = comments;
      console.log('Comments fetched: ', this.allComments);
      console.log("comment id: ", this.allComments[0]._id);
    });
  }
  allComments: any = [];
  postId: any;
  newCommentBtnClicked = false;
  newCommentForm!: FormGroup;

  openCommentContainer() {
    this.newCommentBtnClicked = true; //update to false in the comment submit button
  }

  ngOnInit(): void {
    // Extract the post ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId');
    });
    console.log('post id: ', this.postId);

    this.newCommentForm = this.fb.group({
      loginId: localStorage.getItem('LoginId'),
      parentId: this.postId,
      commentContent: ['', Validators.required],
    });
  }

  addComment() {
    const data = this.newCommentForm.value;
    console.log('comment data: ', data);
    this.backendService.addComment(data).subscribe((response) => {
      console.log('comment response:', response);
      // console.log("comment id: ", response.id);
      this.commentsService.getComments(this.postId);
      this.router.navigateByUrl(`/comments/${this.postId}`);
      this.newCommentBtnClicked = false;
      this.commentsService.commentsFetched.subscribe((comments) => {
        this.allComments = comments;
      });
    });
  }
  
  openReplyContainer(commentId: any) {

  }
}
