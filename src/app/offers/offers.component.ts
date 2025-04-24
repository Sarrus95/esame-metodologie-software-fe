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
    { name: 'Semi-Nuovo', icon: '✨' },
    { name: 'Discreto', icon: '📚' },
    { name: 'Rovinato', icon: '🛠️' },
  ];

  languages = [
    { name: "Italiano", icon: '🇮🇹​' },
    { name: "Inglese", icon: '🇬🇧​' },
    { name: "Francese", icon: '🇨🇵​' },
    { name: "Tedesco", icon: '🇩🇪​' },
    { name: "Spagnolo", icon: '🇪🇸​' },
  ]

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedGenre = params['genre'] || '';
      this.selectedCondition = params['condition'] || '';
      this.selectedLanguage = params['language'] || '';
      this.applyFilters();
    });

    // Dati di test
    this.listBooks = [
      {
        title: 'Il Signore degli Anelli',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        condition: 'Nuovo',
        coverImg: 'https://via.placeholder.com/150x200?text=LOTR',
      },
      {
        title: '1984',
        author: 'George Orwell',
        genre: 'Distopico',
        condition: 'Discreto',
        coverImg: 'https://via.placeholder.com/150x200?text=1984',
      },
      {
        title: 'Orgoglio e Pregiudizio',
        author: 'Jane Austen',
        genre: 'Classico',
        condition: 'Semi-Nuovo',
        coverImg: 'https://via.placeholder.com/150x200?text=O+P',
      },
      {
        title: 'Dracula',
        author: 'Bram Stoker',
        genre: 'Horror',
        condition: 'Rovinato',
        coverImg: 'https://via.placeholder.com/150x200?text=Dracula',
      },
      {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        condition: 'Nuovo',
        coverImg: 'https://via.placeholder.com/150x200?text=HP',
      },
    ];
    this.filteredBooks = this.listBooks;
    this.bookService.getBooks().subscribe((data) => {
      this.listBooks = [...data];
      if (this.filteredBooks.length === 0) {
        this.filteredBooks = this.listBooks;
      }
    });
  }


  // Cambia la modalità di visualizzazione
  changeView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  // Applicazione dei filtri
  applyFilters() {
    const queryParams = {
      genre: this.selectedGenre || null,
      condition: this.selectedCondition || null,
      language: this.selectedLanguage || null,
    };

    this.router.navigate([], {
      relativeTo: this.route, // Keeps the base URL intact
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Merges with existing query parameters
    });

    const receivedFilters = [this.selectedGenre, this.selectedCondition, this.selectedLanguage];
    if (receivedFilters.some((filter) => filter.length > 0)) {
      const filters = {
        genre: this.selectedGenre,
        condition: this.selectedCondition,
        language: this.selectedLanguage
      }
      this.bookService
        .getFilteredBooks(filters)
        .subscribe((data) => {
          this.filteredBooks = [...data];
        });
    } else {
      this.filteredBooks = this.listBooks;
    }
  }
}