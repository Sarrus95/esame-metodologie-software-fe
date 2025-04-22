import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../log/navbar/navbar.component';
import { UserService } from '../services/user-service.service';

interface BookRequest {
  bookTitle: string;
  author: string;
  type: 'sent' | 'received';
  status: 'pending' | 'accepted';
}

interface Book {
  title: string;
  author: string;
  description: string;
  image: string;
}

interface Interest {
  title: string;
  author: string;
  description: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [FormsModule, CommonModule, NavbarComponent],
})
export class UserProfileComponent implements OnInit {
  username = '';
  phoneNo = '';
  userPhoto =
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png';
  allUserInfo = false;
  books: Book[] = [];
  interests: Interest[] = [];
  currentBook: Book | null = null;
  currentBookIndex: number | null = null;

  currentInterest: Interest | null = null;
  currentInterestIndex: number | null = null;

  requestsSent: BookRequest[] = [];
  requestsReceived: BookRequest[] = [];
  i: number | undefined;
  showModal: boolean = true; // Set this to true to show the modal on page load.

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getInfo().subscribe((userData) => {
      if (userData) {
        this.username = userData.username;
        this.phoneNo = userData.phoneNo;
        this.allUserInfo = Boolean(this.username && this.phoneNo);
        this.showModal = !this.allUserInfo;
      }
    });
    const savedBooks = localStorage.getItem('books');
    const savedInterests = localStorage.getItem('interests');
    const savedRequestsSent = localStorage.getItem('requestsSent');
    const savedRequestsReceived = localStorage.getItem('requestsReceived');

    if (savedBooks) this.books = JSON.parse(savedBooks);
    if (savedInterests) this.interests = JSON.parse(savedInterests);
    if (savedRequestsSent) this.requestsSent = JSON.parse(savedRequestsSent);
    if (savedRequestsReceived)
      this.requestsReceived = JSON.parse(savedRequestsReceived);
  }

  checkAuthentication(userData: any) {
    if (userData.username && userData.phoneNo) {
      this.allUserInfo = true;
      this.showModal = false; // Close modal if user details are entered.
    } else {
      this.showModal = true; // Keep modal open otherwise.
    }
  }

  saveUserInfo() {
    if (this.username && this.phoneNo) {
      this.allUserInfo = true;
      this.showModal = false;
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  addNewBook() {
    this.currentBook = { title: '', author: '', description: '', image: '' };
    this.currentBookIndex = null;
  }

  editBook(index: number) {
    this.currentBook = { ...this.books[index] };
    this.currentBookIndex = index;
  }

  saveBook() {
    if (
      this.currentBook?.title &&
      this.currentBook.author &&
      this.currentBook.description &&
      this.currentBook.image
    ) {
      if (this.currentBookIndex !== null) {
        this.books[this.currentBookIndex] = this.currentBook;
        alert('Libro aggiornato correttamente!');
      } else {
        this.books.push(this.currentBook);
        alert('Nuovo libro aggiunto correttamente!');
      }
      localStorage.setItem('books', JSON.stringify(this.books));
      this.resetForm();
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

  addNewInterest() {
    this.currentInterest = { title: '', author: '', description: '' };
    this.currentInterestIndex = null;
    this.cdr.detectChanges();
  }

  editInterest(index: number) {
    this.currentInterest = { ...this.interests[index] };
    this.currentInterestIndex = index;
  }

  saveInterest() {
    if (
      this.currentInterest?.title &&
      this.currentInterest.author &&
      this.currentInterest.description
    ) {
      if (this.currentInterestIndex !== null) {
        this.interests[this.currentInterestIndex] = this.currentInterest;
        alert('Libro cercato aggiornato correttamente!');
      } else {
        this.interests.push(this.currentInterest);
        alert('Nuovo libro cercato aggiunto correttamente!');
      }
      localStorage.setItem('interests', JSON.stringify(this.interests));
      this.resetInterestForm();
    } else {
      alert('Per favore, compila tutti i campi per salvare.');
    }
  }

  deleteInterest(index: number) {
    this.interests.splice(index, 1);
    localStorage.setItem('interests', JSON.stringify(this.interests));
  }

  resetInterestForm() {
    this.currentInterest = null;
    this.currentInterestIndex = null;
  }

  addRequest(bookTitle: string, author: string, type: 'sent' | 'received') {
    const newRequest: BookRequest = {
      bookTitle,
      author,
      type,
      status: 'pending',
    };
    if (type === 'sent') {
      this.requestsSent.push(newRequest);
      localStorage.setItem('requestsSent', JSON.stringify(this.requestsSent));
    } else if (type === 'received') {
      this.requestsReceived.push(newRequest);
      localStorage.setItem(
        'requestsReceived',
        JSON.stringify(this.requestsReceived)
      );
    }
    alert('Richiesta inviata correttamente!');
  }

  acceptRequest(index: number, type: 'sent' | 'received') {
    if (
      index < 0 ||
      (type === 'sent' && index >= this.requestsSent.length) ||
      (type === 'received' && index >= this.requestsReceived.length)
    ) {
      console.error('Indice non valido.');
      return;
    }
    if (type === 'sent') {
      this.requestsSent[index].status = 'accepted';
      localStorage.setItem('requestsSent', JSON.stringify(this.requestsSent));
    } else if (type === 'received') {
      this.requestsReceived[index].status = 'accepted';
      localStorage.setItem(
        'requestsReceived',
        JSON.stringify(this.requestsReceived)
      );
    }
    console.log('Richiesta accettata correttamente!');
  }
  moveBookUp(index: number): void {
    if (index > 0) {
      const temp = this.books[index];
      this.books[index] = this.books[index - 1];
      this.books[index - 1] = temp;
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  moveBookDown(index: number): void {
    if (index < this.books.length - 1) {
      const temp = this.books[index];
      this.books[index] = this.books[index + 1];
      this.books[index + 1] = temp;
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  moveInterestUp(index: number): void {
    if (index > 0) {
      const temp = this.interests[index];
      this.interests[index] = this.interests[index - 1];
      this.interests[index - 1] = temp;
      localStorage.setItem('interests', JSON.stringify(this.interests));
    }
  }

  moveInterestDown(index: number): void {
    if (index < this.interests.length - 1) {
      const temp = this.interests[index];
      this.interests[index] = this.interests[index + 1];
      this.interests[index + 1] = temp;
      localStorage.setItem('interests', JSON.stringify(this.interests));
    }
  }
}