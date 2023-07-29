import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectionService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(profile: any) {
    const body = profile;
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }

  newPost(data: any) {
    return this.http.post<any>(`${this.baseUrl}/new_post`, data);
  }
  
}
