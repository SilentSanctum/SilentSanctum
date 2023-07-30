import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BackendConnectionService } from 'src/app/services/backend-connection.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public backendService: BackendConnectionService,
    private router: Router,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    console.log('user id: ', localStorage.getItem('LoginId'));
    this.postForm = this.fb.group({
      loginId: localStorage.getItem('LoginId'),
      postContent: ['', Validators.required], // You can add more validators if needed
      topic: ['', Validators.required],
    });
  }

  submitPost() {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
      console.log('post form data: ', postData);
      this.backendService.newPost(postData).subscribe((response) => {
        console.log('response from new post: ', response);
        this.postService.changePosts();
      });
      this.router.navigateByUrl('/posts');
    }
  }
}
