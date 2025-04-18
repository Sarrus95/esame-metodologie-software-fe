import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any; // Contiene il libro attualmente selezionato

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId !== null && books.length > 0) {
      const index = parseInt(bookId, 10);
      if (index >= 0 && index < books.length) {
        this.book = books[index];
      } else {
        alert('Libro non trovato!');
        this.goBack();
      }
    } else {
      alert('Libro non trovato!');
      this.goBack();
    }
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
    this.router.navigate(['']); // Naviga alla root o pagina principale
  }
}
