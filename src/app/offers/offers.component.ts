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
    { title: 'Libro 1', author: 'Autore 1', genre: 'Fantasy', cover: 'book-cover1.jpg' },
    { title: 'Libro 2', author: 'Autore 2', genre: 'Thriller', cover: 'book-cover2.jpg' },
    { title: 'Libro 3', author: 'Autore 3', genre: 'Romance', cover: 'book-cover3.jpg' },
    // Aggiungi altri libri...
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