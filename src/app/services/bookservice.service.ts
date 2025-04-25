import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private API_URL = 'http://localhost:3000/books';
  private loginAuthToken = '';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loginAuthToken = this.localStorage.get('loginAuthToken') || '';
  }

  getBooks(): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.get(`${this.API_URL}/`, { headers });
  }

  getFilteredBooks(filters: any): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    const params: any = {};
    if (filters.genre) params.genre = filters.genre;
    if (filters.condition) params.condition = filters.condition;
    if (filters.language) params.language = filters.language;

    return this.http.get(`${this.API_URL}/`, { headers, params });
  }

  addBook(newBook: any): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.post(`${this.API_URL}/add-book`, newBook, { headers, responseType: "text" });
  }
}