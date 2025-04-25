import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../log/navbar/navbar.component';
import { BookService } from '../services/bookservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  viewMode: 'grid' | 'list' = 'grid'; // Impostiamo la vista iniziale su 'grid'
  selectedGenre: string = '';
  selectedCondition: string = '';
  selectedLanguage: string = '';
  listBooks: any[] = [];
  filteredBooks: any[] = [];
  showAllBooks = true;
  previousFilters: {
    genre: string | null;
    condition: string | null;
    language: string | null;
  } = { genre: null, condition: null, language: null };
  searchQuery: string = '';

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
    { name: 'Narrativa contemporanea', icon: '📖' },
  ];

  // Lista delle condizioni dei libri con relative icone
  conditions = [
    { name: 'Nuovo', icon: '🆕' },
    { name: 'Come Nuovo', icon: '✨' },
    { name: 'Buone Conidizoni', icon: '📚' },
    { name: 'Rovinato', icon: '🛠️' },
  ];

  languages = [
    { name: 'Italiano', icon: '🇮🇹​' },
    { name: 'Inglese', icon: '🇬🇧​' },
    { name: 'Francese', icon: '🇨🇵​' },
    { name: 'Tedesco', icon: '🇩🇪​' },
    { name: 'Spagnolo', icon: '🇪🇸​' },
  ];

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data) => {
      this.listBooks = [...data];
      this.filteredBooks = this.listBooks;
    });

    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.selectedGenre = params['genre'] || '';
        this.selectedCondition = params['condition'] || '';
        this.selectedLanguage = params['language'] || '';
        this.searchQuery = params['search'] || '';

        this.applyFilters();
      }
    });
  }

  // Cambia la modalità di visualizzazione
  changeView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  // Applicazione dei filtri
  applyFilters() {
    const newFilters = {
      genre: this.selectedGenre || null,
      condition: this.selectedCondition || null,
      language: this.selectedLanguage || null,
      search: this.searchQuery || null,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });

    if (JSON.stringify(newFilters) !== JSON.stringify(this.previousFilters)) {
      this.previousFilters = { ...newFilters };
      this.bookService.getFilteredBooks(newFilters).subscribe((data) => {
        this.filteredBooks = [...data];

        if (this.searchQuery.trim()) {
          this.filteredBooks = this.filteredBooks.filter(
            (book) =>
              book.title
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      });
    }
  }
}
