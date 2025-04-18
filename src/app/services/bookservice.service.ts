import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(private http: HttpClient) { }

}

  getBooks(): Observable<any> {
    const headers = { "Authorization" : this.authToken };
    return this.http.get(`${this.API_URL}/`, { headers });
  }
}