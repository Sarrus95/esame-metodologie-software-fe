import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, userData);
  }

  login(userData: any): Observable<any>{
    return this.http.post(`${this.API_URL}/login`, userData);
  }
}
