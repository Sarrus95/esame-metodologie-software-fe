import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [FormsModule, CommonModule],
})
export class UserProfileComponent implements OnInit {
  userName: string = 'Mario Rossi';
  userBio: string = 'Amante della lettura e degli scambi culturali.';
  userPhoto: string =
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png';

  books: any[] = []; // Libri posseduti
  interests: any[] = []; // Lista "Interessi-Cercati"
  currentBook: any = null; // Per aggiungere/modificare un libro nella lista posseduta
  currentBookIndex: number | null = null; // Indice del libro in modifica

  constructor(private router: Router) {}

  ngOnInit() {
    const savedBooks = localStorage.getItem('books');
    const savedInterests = localStorage.getItem('interests');

    if (savedBooks) {
      this.books = JSON.parse(savedBooks);
    }
    if (savedInterests) {
      this.interests = JSON.parse(savedInterests);
    }
  }

  // Funzionalità per aggiungere/modificare libri
  addNewBook() {
    this.currentBook = { title: '', author: '', description: '', image: '' };
    this.currentBookIndex = null; // Reset per aggiungere un nuovo libro
  }

  editBook(index: number) {
    this.currentBook = { ...this.books[index] }; // Copia i dati del libro selezionato
    this.currentBookIndex = index; // Salva l'indice del libro da modificare
  }

  saveBook() {
    if (
      this.currentBook.title &&
      this.currentBook.author &&
      this.currentBook.description &&
      this.currentBook.image
    ) {
      if (this.currentBookIndex !== null) {
        // Modifica di un libro esistente
        this.books[this.currentBookIndex] = this.currentBook;
        alert('Libro aggiornato correttamente!');
      } else {
        // Aggiunta di un nuovo libro
        this.books.push(this.currentBook);
        alert('Nuovo libro aggiunto correttamente!');
      }
      localStorage.setItem('books', JSON.stringify(this.books));
      this.currentBook = null; // Reset del form
      this.currentBookIndex = null;
    } else {
      alert('Per favore, compila tutti i campi per salvare.');
    }
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  navigateToDetails(index: number) {
    this.router.navigate(['/book-details', index.toString()]);
  }

  resetForm() {
    this.currentBook = null;
    this.currentBookIndex = null;
  }
}
