import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const appRoutes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: '', redirectTo: 'user-profile', pathMatch: 'full' }, // Rotta di default
];
