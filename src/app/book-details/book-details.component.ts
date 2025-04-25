import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any; // Contiene il libro attualmente selezionato
  userId : string = ""

  constructor(
    private localStorage: LocalStorageService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.book = JSON.parse(this.localStorage.get("currentBook") || "{}");
    this.userId = this.localStorage.get("userId") || "";
    console.log(this.userId,this.book)
  }

  // Funzione per inviare richiesta di scambio
  requestExchange() {
    if (this.book) {
      alert(`Richiesta di scambio inviata per il libro: ${this.book.title}`);
    } else {
      alert('Errore: Nessun libro selezionato.');
    }
  }

  // Funzione per tornare indietro alla lista dei libri
  goBack() {
    this.location.back();
  }
}
