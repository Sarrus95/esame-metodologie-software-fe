import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookOfInterestService {
  private API_URL = 'http://localhost:3000/interests';
  private loginAuthToken = '';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loginAuthToken = this.localStorage.get('loginAuthToken') || '';
  }

  addBookOfInterest(newBookOfInterest: any): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.post(`${this.API_URL}/add-interest`, newBookOfInterest, {
      headers,
      responseType: 'text',
    });
  }
}
