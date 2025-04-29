import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Location } from '@angular/common';
import { UserService } from '../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { ExchangeRequestService } from '../services/exchange-request.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any; // Contiene il libro attualmente selezionato
  userId: any;
  username: string = '';
  userBooks: any;
  isModalVisible: boolean = false;
  senderBook: any;
  responseMessage: string = '';

  constructor(
    private localStorage: LocalStorageService,
    private location: Location,
    private userService: UserService,
    private exchangeRequest: ExchangeRequestService
  ) {}

  ngOnInit() {
    this.book = JSON.parse(this.localStorage.get('currentBook') || '{}');
    this.userId = this.localStorage.get('userId') || '';
    this.username = this.localStorage.get('username') || '';
    this.userService.getMyBooks().subscribe({
      next: (response) => {
        this.userBooks = response.myBooks.filter;
        this.userBooks = this.userBooks.filter((book: any) => book.status === "In Attesa Di Scambio")
      },
      error: (err) => console.error('Error Fetching Books', err),
    });
  }

  // Funzione per inviare richiesta di scambio
  showExchangeModal() {
    this.isModalVisible = true;
  }

  closeExchangeModal() {
    this.isModalVisible = false;
  }

  sendExchangeRequest() {
    const request = {
      userRef: this.book.ownerId,
      bookRef: this.book._id,
      senderRef: this.userId,
      senderBook: this.senderBook._id,
    };
    console.log(request)
    this.exchangeRequest.sendExchangeRequest(request).subscribe({
      next: (_) => this.responseMessage = "Richiesta Di Scambio Inviata!",
      error: (err) => console.error(err)
    })
  }

  // Funzione per tornare indietro alla lista dei libri
  goBack() {
    this.location.back();
  }
}
