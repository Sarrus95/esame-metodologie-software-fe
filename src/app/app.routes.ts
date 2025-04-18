import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookDetailsComponent } from './book-details/book-details.component';


export const routes: Routes = [
  // Definisci le tue rotte qui
  { path: '', component: UserProfileComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export type { Routes };

