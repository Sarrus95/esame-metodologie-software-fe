import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-exchange-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-requests.component.html',
  styleUrls: ['./exchange-requests.component.css']
})
export class ExchangeRequestsComponent {
  // Le richieste in arrivo e inviate
  receivedRequests: any = [];
  sentRequests: any = [];

  // Storico delle operazioni (esempio)
  storedRequests: any = [];

  // Stato per controllare quale sezione è attiva
  viewMode: 'received' | 'sent' | 'history' = 'received'; // Default: visualizza le richieste ricevute

  constructor(private userService: UserService){
    this.userService.getMyRequests().subscribe({
      next: (response) => {
        console.log(response);
        this.receivedRequests = response.receivedRequests;
        this.sentRequests = response.sentRequests;
        this.storedRequests = response.storedRequests
      },
      error: (err) => console.error("Error Fetching Requests",err)
    })
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
}
