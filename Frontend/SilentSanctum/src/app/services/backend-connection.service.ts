import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendConnectionService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(profile: any) {
    const body = profile;
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }

  newPost(data: any) {
    const body = data;
    console.log(body);
    return this.http.post<any>(`${this.baseUrl}/new_post`, body);
  }

  getAllPosts() {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getAllComments() {
    return this.http.get<any[]>(`${this.baseUrl}/comments`);
  }

  addComment(data: any) {
    return this.http.post<any>(`${this.baseUrl}/new_comment`, data);
  }
}
