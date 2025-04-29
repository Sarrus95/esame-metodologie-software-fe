import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service.service';
import { ExchangeRequestService } from '../services/exchange-request.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-exchange-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-requests.component.html',
  styleUrls: ['./exchange-requests.component.css'],
})
export class ExchangeRequestsComponent {
  // Le richieste in arrivo e inviate
  receivedRequests: any = [];
  sentRequests: any = [];

  // Storico delle operazioni (esempio)
  storedRequests: any = [];

  // Stato per controllare quale sezione è attiva
  viewMode: 'received' | 'sent' | 'history' = 'received'; // Default: visualizza le richieste ricevute

  message: string = '';

  username = '';

  constructor(
    private userService: UserService,
    private exchangeRequestService: ExchangeRequestService,
    private localStorage: LocalStorageService
  ) {
    this.userService.getMyRequests().subscribe({
      next: (response) => {
        this.receivedRequests = response.receivedRequests;
        this.sentRequests = response.sentRequests;
        this.storedRequests = response.storedRequests;
      },
      error: (err) => console.error('Error Fetching Requests', err),
    });
    this.username = this.localStorage.get("username") || "";
  }

  // Funzione per cambiare la vista
  changeView(mode: 'received' | 'sent' | 'history') {
    this.viewMode = mode;
  }

  // Funzione per determinare la classe CSS in base allo stato
  getRequestClass(status: string): string {
    switch (status) {
      case 'Accettata':
        return 'accepted';
      case 'Rifiutata':
        return 'rejected';
      case 'In Corso':
        return 'pending';
      default:
        return '';
    }
  }

  exchangeReuqestHandler(request: any,response: string) {
    this.exchangeRequestService.updateExchangeRequest(request,response).subscribe({
      next: (response) => {
        this.message = response.message;
        alert(this.message);
        this.userService.getMyRequests().subscribe({
          next: (response) => {
            this.receivedRequests = response.receivedRequests;
            this.sentRequests = response.sentRequests;
            this.storedRequests = response.storedRequests;
          },
          error: (err) => console.error('Error Fetching Requests', err),
        });
      },
      error: (err) => console.error(err)
    });
  }
}
