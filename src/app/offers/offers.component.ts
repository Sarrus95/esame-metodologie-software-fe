import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FormsModule } from '@angular/forms';    // Importa FormsModule
import {NavbarComponent} from '../log/navbar/navbar.component';

@Component({
  selector: 'app-offers',
  imports: [CommonModule, FormsModule,NavbarComponent],  // Aggiungi CommonModule e FormsModule
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  viewMode: 'grid' | 'list' = 'grid';  // Impostiamo la vista iniziale su 'grid'
  selectedGenre: string = '';
  selectedAuthor: string = '';
  
  books = [
    { title: 'Il Custode delle Ombre', author: 'Luca Bianchi', genre: 'Fantasy', cover: 'book-cover1.jpg' },
    { title: 'Oltre il Confine', author: 'Giulia Rossi', genre: 'Thriller', cover: 'book-cover2.jpg' },
    { title: 'Cuori in Tempesta', author: 'Francesca Greco', genre: 'Romance', cover: 'book-cover3.jpg' },
    { title: 'La Spada del Re', author: 'Marco Gallo', genre: 'Fantasy', cover: 'book-cover4.jpg' },
    { title: 'La Verità Nascosta', author: 'Elena Neri', genre: 'Thriller', cover: 'book-cover5.jpg' },
    { title: 'Sotto il Sole di Parigi', author: 'Sara Conti', genre: 'Romance', cover: 'book-cover6.jpg' },
    { title: 'I Guardiani del Tempo', author: 'Davide Serra', genre: 'Fantascienza', cover: 'book-cover7.jpg' },
    { title: 'Nel Bosco Oscuro', author: 'Chiara De Luca', genre: 'Horror', cover: 'book-cover8.jpg' },
    { title: 'Odissea Eterna', author: 'Andrea Vitale', genre: 'Epica', cover: 'book-cover9.jpg' },
    { title: 'Il Viaggiatore di Stelle', author: 'Marta Bruno', genre: 'Fantascienza', cover: 'book-cover10.jpg' },
    { title: 'Rivelazioni', author: 'Tommaso Riva', genre: 'Thriller', cover: 'book-cover11.jpg' },
    { title: 'Anime a Contrasto', author: 'Lucia Ferri', genre: 'Romance', cover: 'book-cover12.jpg' },
    { title: 'Il Demone dell’Est', author: 'Gianni Morandi', genre: 'Horror', cover: 'book-cover13.jpg' },
    { title: 'Le Cronache di Arkan', author: 'Claudia Neri', genre: 'Fantasy', cover: 'book-cover14.jpg' },
    { title: 'L’Inganno', author: 'Paolo Marchetti', genre: 'Thriller', cover: 'book-cover15.jpg' },
    { title: 'La Biblioteca Perduta', author: 'Alessandra Bini', genre: 'Avventura', cover: 'book-cover16.jpg' },
    { title: 'Fuga nel Tempo', author: 'Fabio Caruso', genre: 'Fantascienza', cover: 'book-cover17.jpg' },
    { title: 'Il Cuore del Deserto', author: 'Valentina Serra', genre: 'Romance', cover: 'book-cover18.jpg' },
    { title: 'I Ribelli del Nord', author: 'Giorgio Lupi', genre: 'Azione', cover: 'book-cover19.jpg' },
    { title: 'Il Segreto di Lys', author: 'Serena Vitale', genre: 'Fantasy', cover: 'book-cover20.jpg' }
  ];  

  filteredBooks = [...this.books];  // All'inizio mostriamo tutti i libri

  changeView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(book => {
      const matchesGenre = this.selectedGenre ? book.genre === this.selectedGenre : true;
      const matchesAuthor = this.selectedAuthor ? book.author.toLowerCase().includes(this.selectedAuthor.toLowerCase()) : true;
      return matchesGenre && matchesAuthor;
    });
  }
}