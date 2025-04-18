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
  receivedRequests = [
    { title: 'Il Custode delle Ombre', from: 'Mario', status: 'In attesa' },
    { title: 'La Spada del Re', from: 'Luca', status: 'Accettata' },
  ];

  sentRequests = [
    { title: 'Cuori in Tempesta', to: 'Giulia', status: 'Rifiutata' },
    { title: 'Odissea Eterna', to: 'Chiara', status: 'In attesa' },
  ];
}
