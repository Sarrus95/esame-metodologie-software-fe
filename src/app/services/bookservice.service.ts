import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private API_URL = 'http://localhost:3000/books';
  private authToken = '';

  constructor(private http: HttpClient,private localStorage: LocalStorageService) {
    this.authToken = localStorage.get("authToken") || "";
  }

  getBooks(): Observable<any> {
    const headers = { "Authorization" : this.authToken };
    return this.http.get(`${this.API_URL}/`, { headers });
  }

  getFilteredBooks(filters: any): Observable<any>{
    const params = 
  }
}