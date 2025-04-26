import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthComponent } from './log/auth/auth.component';
import { FormRecordComponent } from './log/form-record/form-record.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OffersComponent } from './offers/offers.component';
import { ExchangeRequestsComponent } from './exchange-requests/exchange-requests.component';

import { provideRouter } from '@angular/router';

export const routes: Routes = [
  // Definisci le tue rotte qui
  { path: '', pathMatch: 'full', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: FormRecordComponent },
  { path: 'home', component: OffersComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'exchange', component: ExchangeRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export type { Routes };

export const appRouter = provideRouter(routes);
