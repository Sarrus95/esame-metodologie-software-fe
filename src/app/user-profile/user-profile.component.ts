import { Component, OnInit } from '@angular/core';
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
  // Informazioni personali
  userName: string = 'Mario Rossi';
  userBio: string = 'Amante della lettura e degli scambi culturali.';
  userPhoto: string =
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png';

  // Lista dei libri
  books: any[] = [];

  // Stato per libro attualmente in modifica
  currentBook: any = null;

  // Recupera i libri dal localStorage all'avvio
  ngOnInit() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      this.books = JSON.parse(savedBooks); // Recupera la lista di libri salvata
    }
  }

  // Imposta l'aggiunta di un nuovo libro
  addNewBook() {
    this.currentBook = { title: '', author: '', description: '', image: '' };
  }

  // Modifica un libro esistente
  editBook(index: number) {
    this.currentBook = { ...this.books[index] }; // Clona l'oggetto del libro da modificare
  }

  // Salva le modifiche (aggiunta o modifica libro)
  saveBook() {
    if (
      this.currentBook.title &&
      this.currentBook.author &&
      this.currentBook.description &&
      this.currentBook.image
    ) {
      const index = this.books.findIndex(
        (book) => book.title === this.currentBook.title
      );
      if (index !== -1) {
        this.books[index] = this.currentBook; // Modifica libro esistente
        alert('Libro aggiornato correttamente!');
      } else {
        this.books.push(this.currentBook); // Aggiunta nuovo libro
        alert('Nuovo libro aggiunto correttamente!');
      }
      localStorage.setItem('books', JSON.stringify(this.books)); // Salva la lista aggiornata nel localStorage
      this.currentBook = null; // Resetta il modulo dopo il salvataggio
    } else {
      alert('Per favore, compila tutti i campi prima di salvare.');
    }
  }

  // Elimina un libro dalla lista
  deleteBook(index: number) {
    this.books.splice(index, 1); // Rimuove il libro dalla lista
    localStorage.setItem('books', JSON.stringify(this.books)); // Aggiorna il localStorage
  }

  // Resetta il modulo
  resetForm() {
    this.currentBook = null;
  }
}
