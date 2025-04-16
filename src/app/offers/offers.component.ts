import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FormsModule } from '@angular/forms';    // Importa FormsModule
import {NavbarComponent} from '../log/navbar/navbar.component';
import { BookService } from '../services/bookservice.service';

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
  listBooks: any[] = [];
  filteredBooks: any[] = [];  // All'inizio mostriamo tutti i libri

  constructor(private bookService: BookService){}

  ngOnInit(){
    this.bookService.getBooks().subscribe((data) => {
      this.listBooks = [...data];
    })
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