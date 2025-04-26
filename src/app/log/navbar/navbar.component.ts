import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchQuery: string = '';
  userId: string | null = null; // Initialize userId

  constructor(private router: Router) {
    this.userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  }

  updateQueryParams() {
    this.router.navigate(['/home'], {
      queryParams: { search: this.searchQuery },
    });
    this.searchQuery = ''; // Clear search input after navigation
  }
}