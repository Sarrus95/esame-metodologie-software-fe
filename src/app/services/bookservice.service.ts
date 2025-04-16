import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private API_URL = 'http://localhost:3000/books';
  private authToken = '4fe9245c-4466-4b1e-bea2-9195429abb52';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    const headers = { "Authorization" : this.authToken };
    return this.http.get(`${this.API_URL}/`, { headers });
  }
}