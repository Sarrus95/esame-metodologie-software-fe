import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRequestService {
  private API_URL = 'http://localhost:3000/requests';
  private loginAuthToken = '';
  private phoneNo = '';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loginAuthToken = this.localStorage.get('loginAuthToken') || '';
    this.phoneNo = this.localStorage.get('phoneNo') || '';
  }

  sendExchangeRequest(request: any): Observable<any> {
    const headers = { Authorization: this.loginAuthToken };
    return this.http.post(`${this.API_URL}/send-request`, request, { headers });
  }

  updateExchangeRequest(request: any,response: string): Observable<any> {
    const headers = { Authorization: this.loginAuthToken, requestResponse: response, phoneNo: this.phoneNo };
    return this.http.patch(`${this.API_URL},/send-request`, request, {
      headers,
    });
  }
}