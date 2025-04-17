import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../log/navbar/navbar.component';
import { BookService } from '../services/bookservice.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  viewMode: 'grid' | 'list' = 'grid';
  selectedGenre: string = '';
  selectedAuthor: string = '';
  listBooks: any[] = [];
  filteredBooks: any[] = [];

  // Lista dei generi con le relative icone (solo visuale, non per backend)
  genres = [
    { name: 'Fantasy', icon: '🧙‍♂️' },
    { name: 'Thriller', icon: '🔪' },
    { name: 'Romance', icon: '💖' },
    { name: 'Azione', icon: '💥' },
    { name: 'Avventura', icon: '🗺️' },
    { name: 'Fantascienza', icon: '👽' },
    { name: 'Horror', icon: '👻' },
    { name: 'Epica', icon: '🏛️' },
    { name: 'Classico', icon: '📜' },
    { name: 'Storico', icon: '🏰' },
    { name: 'Biografia', icon: '👤' },
    { name: 'Mistero', icon: '🕵️‍♂️' },
    { name: 'Commedia', icon: '🎭' },
    { name: 'Drammatico', icon: '😢' },
    { name: 'Giallo', icon: '🔍' },
    { name: 'Distopico', icon: '☢️' },
    { name: 'Spirituale', icon: '🧘' },
    { name: 'Avventura urbana', icon: '🌆' },
    { name: 'Saggio', icon: '📘' },
    { name: 'Narrativa contemporanea', icon: '📖' }
  ];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.listBooks = [...data];
      this.filteredBooks = [...data]; // Mostriamo tutto inizialmente
    });
  }

  changeView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  applyFilters() {
    this.filteredBooks = this.listBooks.filter(book => {
      const matchesGenre = this.selectedGenre ? book.genre === this.selectedGenre : true;
      const matchesAuthor = this.selectedAuthor ? book.author.toLowerCase().includes(this.selectedAuthor.toLowerCase()) : true;
      return matchesGenre && matchesAuthor;
    });
  }
}
