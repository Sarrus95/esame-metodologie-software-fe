import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [FormsModule], // Import necessario per abilitare ngModel
})
export class UserProfileComponent {
  // Informazioni personali
  userName: string = 'Mario Rossi';
  userBio: string = 'Amante della lettura e degli scambi culturali.';
  userPhoto: string =
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png';

  // Lista dei libri posseduti
  books = [
    {
      title: 'Il nome della rosa',
      author: 'Umberto Eco',
      description:
        'Un romanzo investigativo ambientato in un monastero medievale.',
      image: 'https://pictures.abebooks.com/isbn/9788845210662-it.jpg',
    },
    {
      title: '1984',
      author: 'George Orwell',
      description:
        'Un classico distopico che esplora la sorveglianza e il totalitarismo.',
      image:
        'https://m.media-amazon.com/images/I/81cLUm79v5L._AC_UF1000,1000_QL80_.jpg',
    },
  ];

  // Stato per libro attualmente in modifica
  currentBook: any = null;

  // Aggiungi un nuovo libro
  addBook(newBook: {
    title: string;
    author: string;
    description: string;
    image: string;
  }) {
    this.books.push(newBook);
  }

  // Modifica libro esistente
  editBook(book: any) {
    this.currentBook = { ...book }; // Copia del libro da modificare
  }

  // Salva le modifiche
  saveBook() {
    if (this.currentBook.title) {
      const index = this.books.findIndex(
        (book) => book.title === this.currentBook.title
      );
      if (index !== -1) {
        this.books[index] = this.currentBook; // Modifica libro esistente
      } else {
        this.books.push(this.currentBook); // Aggiunta nuovo libro
      }
    }
    this.currentBook = null; // Resetta il modulo dopo il salvataggio
  }

  // Elimina libro
  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  // Reset del modulo
  resetForm() {
    this.currentBook = null;
  }
}