import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Il Grande Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'Un classico della letteratura americana.',
      imageUrl: 'path/to/image1.jpg',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      description: 'Distopia e controllo della società.',
      imageUrl: 'path/to/image2.jpg',
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(bookId: number): void {
    this.books = this.books.filter((book) => book.id !== bookId);
  }
}
