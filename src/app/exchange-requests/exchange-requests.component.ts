import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exchange-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-requests.component.html',
  styleUrls: ['./exchange-requests.component.css']
})
export class ExchangeRequestsComponent {
  // Le richieste in arrivo e inviate
  receivedRequests = [
    { title: 'Il Custode delle Ombre', from: 'Mario', status: 'In attesa' },
    { title: 'La Spada del Re', from: 'Luca', status: 'Accettata' },
  ];

  sentRequests = [
    { title: 'Cuori in Tempesta', to: 'Giulia', status: 'Rifiutata' },
    { title: 'Odissea Eterna', to: 'Chiara', status: 'In attesa' },
  ];

  // Storico delle operazioni (esempio)
  history = [
    { user: 'Mario', title: 'Il Custode delle Ombre', status: 'Completato', date: '2025-04-12' },
    { user: 'Luca', title: 'La Spada del Re', status: 'Completato', date: '2025-04-10' },
  ];

  // Stato per controllare quale sezione è attiva
  viewMode: 'received' | 'sent' | 'history' = 'received'; // Default: visualizza le richieste ricevute

  // Funzione per cambiare la vista
  changeView(mode: 'received' | 'sent' | 'history') {
    this.viewMode = mode;
  }
}
