import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [FormsModule], // Abilitazione di ngModel per il modulo standalone
})
export class UserProfileComponent {
editBook(_t35: any) {
throw new Error('Method not implemented.');
}
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

  // Funzione per impostare l'aggiunta di un nuovo libro
  addNewBook() {
    this.currentBook = { title: '', author: '', description: '', image: '' };
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
      this.currentBook = null; // Resetta il modulo dopo il salvataggio
    } else {
      alert('Per favore, compila tutti i campi prima di salvare.');
    }
  }

  // Elimina libro dalla lista
  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  // Resetta il modulo
  resetForm() {
    this.currentBook = null;
  }
}
