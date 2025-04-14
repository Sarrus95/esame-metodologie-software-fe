import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  bookTitle: string = 'Il nome della rosa'; // Sostituisci con dati dinamici
  bookAuthor: string = 'Umberto Eco';
  bookDescription: string =
    'Un romanzo investigativo ambientato in un monastero medievale.';
  bookImage: string = 'https://pictures.abebooks.com/isbn/9788845210662-it.jpg'; // Sostituisci con URL reale

  // Metodo per gestire l'invio della richiesta di scambio
  requestExchange() {
    alert('Richiesta di scambio inviata!');
    // Qui puoi implementare la logica per inviare la richiesta di scambio al backend
  }
}
