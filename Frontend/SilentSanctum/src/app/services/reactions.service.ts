import { Injectable } from '@angular/core';
import { BackendConnectionService } from './backend-connection.service';

@Injectable({
  providedIn: 'root',
})
export class ReactionsService {
  constructor(private backendService: BackendConnectionService) {}
  allReactions: any = {};
  getReactions(contentId: any) {
    const loginId = localStorage.getItem('LoginId');
    const getPostsData = {
      loginId: loginId,
      contentId: contentId,
    };
    this.backendService.getReactions(getPostsData).subscribe((res) => {
      this.allReactions[contentId] = res.length;
    });
  }
}
