import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:3000/users';
  private loginAuthToken = '';
  private userId = '';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loginAuthToken = this.localStorage.get('loginAuthToken') || '';
    this.userId = this.localStorage.get('userId') || '';
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, userData).pipe(
      tap((response: any) => {
        this.localStorage.set('loginAuthToken', response.loginAuthToken);
        this.localStorage.set('userId', response.userId);
        this.localStorage.set('username', response.username);
        this.localStorage.set('phoneNo', response.phoneNo);
        this.loginAuthToken = response.loginAuthToken;
        this.userId = response.userId;
      })
    );
  }

  updateInfo(userData: any): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.patch(`${this.API_URL}/${this.userId}`, userData, {
      headers,
    });
  }

  getMyBooks(): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.get(`${this.API_URL}/${this.userId}/my-books`, {
      headers,
    });
  }

  getMyBooksOfInterest(): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.get(`${this.API_URL}/${this.userId}/my-interests`, {
      headers,
    });
  }

  getMyRequests(): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.get(`${this.API_URL}/${this.userId}/my-requests`, {
      headers,
    });
  }
}
