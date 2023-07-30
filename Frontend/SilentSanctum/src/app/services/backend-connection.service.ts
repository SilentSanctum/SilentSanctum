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
  logout(profile: any) {
    const body = profile;
    return this.http.post<any>(`${this.baseUrl}/logout`, body);
  }

  newPost(data: any) {
    const body = data;
    return this.http.post<any>(`${this.baseUrl}/new_post`, body);
  }

  getAllPosts(data: any) {
    const body = data;
    return this.http.post<any>(`${this.baseUrl}/posts`, body);
  }

  getAllComments(data: any) {
    const body = data;
    return this.http.post<any>(`${this.baseUrl}/comments`, body);
  }

  addComment(data: any) {
    return this.http.post<any>(`${this.baseUrl}/new_comment`, data);
  }
}
