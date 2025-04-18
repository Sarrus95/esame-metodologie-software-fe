import { Injectable } from '@angular/core';
import { ExchangeRequest } from '../models/exchange-request.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRequestService {
  private requests: ExchangeRequest[] = [];

  getRequests(): ExchangeRequest[] {
    return this.requests;
  }

  sendRequest(request: ExchangeRequest): void {
    this.requests.push(request);
  }

  updateRequestStatus(
    requestId: number,
    status: 'Accettata' | 'Rifiutata'
  ): void {
    const request = this.requests.find((r) => r.id === requestId);
    if (request) {
      request.status = status;
    }
  }
}
