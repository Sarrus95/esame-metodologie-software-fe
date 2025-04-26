import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../log/navbar/navbar.component';
import { UserService } from '../services/user-service.service';
import { LocalStorageService } from '../services/local-storage.service';
import { BookService } from '../services/bookservice.service';
import { BookOfInterestService } from '../services/book-of-interest.service';
import { Router } from '@angular/router';
import { ExchangeRequestsComponent } from "../exchange-requests/exchange-requests.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    ExchangeRequestsComponent
],
})
export class UserProfileComponent implements OnInit {
requestsReceived: any;
requestsSent: any;
moveBookDown(_t13: number) {
throw new Error('Method not implemented.');
}
moveBookUp(_t13: number) {
throw new Error('Method not implemented.');
}
deleteBook(_t13: number) {
throw new Error('Method not implemented.');
}
editBook(_t13: number) {
throw new Error('Method not implemented.');
}
  showModal: boolean = true;
  username = '';
  phoneNo = '';
  userPhoto =
    'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png';
  newBookForm: FormGroup;
  showNewBookForm: boolean = false;
  myBooks: any;
  newBookOfInterestForm: FormGroup;
  showNewBookOfInterestForm: boolean = false;
  booksOfInterest: any;
  currentBook: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private userService: UserService,
    private bookService: BookService,
    private bookOfInterestService: BookOfInterestService
  ) {
    this.newBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      coverImg: [''],
      printYear: [
        null,
        [
          Validators.required,
          Validators.min(1500),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      printCompany: ['', Validators.required],
      genre: ['', Validators.required],
      language: ['', Validators.required],
      condition: ['', Validators.required],
      description: [''],
    });
    this.newBookOfInterestForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      printYear: [null, [Validators.min(1500), Validators.max(Date.now())]],
      printCompany: [''],
      language: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.username = this.localStorage.get('username') || '';
    this.phoneNo = this.localStorage.get('phoneNo') || '';
    if (this.username && this.phoneNo) {
      this.showModal = false;
      this.loadMyBooks();
    } else {
      this.showModal = true;
    }
  }

  loadMyBooks() {
    this.userService.getMyBooks().subscribe({
      next: (response) => {
        this.myBooks = response.myBooks;
      },
      error: (err) => console.error('Error fetching books:', err),
    });
    this.userService.getMyBooksOfInterest().subscribe({
      next: (response) => {
        this.booksOfInterest = response.booksOfInterest;
      },
      error: (err) => console.error('Error fetching books', err),
    });
  }

  saveUserInfo() {
    if (this.username && this.phoneNo) {
      const userData = {
        username: this.username,
        phoneNo: this.phoneNo,
      };
      this.userService.updateInfo(userData).subscribe({
        next: (_) => {
          this.showModal = false;
          this.localStorage.set('username', userData.username);
          this.localStorage.set('phoneNo', userData.phoneNo);
        },
      });
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }

  addNewBook() {
    this.showNewBookForm = true;
    this.newBookForm.reset();
  }

  saveBook() {
    if (this.newBookForm.valid) {
      const newBook = {
        ...this.newBookForm.value,
        ownerId: this.localStorage.get('userId'),
      };
      this.bookService.addBook(newBook).subscribe({
        next: (_) => {
          this.showNewBookForm = false;
          this.loadMyBooks();
        },
      });
    } else {
      alert('Per favore, compila tutti i campi obbligatori.');
    }
  }

  addNewBookOfInterest() {
    this.showNewBookOfInterestForm = true;
    this.newBookOfInterestForm.reset();
  }

  saveBookOfInterest() {
    if (this.newBookOfInterestForm.valid) {
      const newBookOfInterest = {
        ...this.newBookOfInterestForm.value,
        userRef: this.localStorage.get('userId'),
      };
      console.log(newBookOfInterest);
      this.bookOfInterestService
        .addBookOfInterest(newBookOfInterest)
        .subscribe({
          next: (_) => {
            this.showNewBookOfInterestForm = false;
            this.loadMyBooks();
          },
        });
    } else {
      alert('Per favore, compila tutti i campi obbligatori.');
    }
  }

  resetForm(form: FormGroup, type: 'book' | 'interest') {
    form.reset();
    if (type == 'book') {
      this.showNewBookForm = false;
    } else {
      this.showNewBookOfInterestForm = false;
    }
  }

  showBookDetails(book: any) {
    this.localStorage.set('currentBook', JSON.stringify(book));
    this.router.navigate(['book-details', book._id]);
  }
}