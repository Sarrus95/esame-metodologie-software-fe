import { Routes } from '@angular/router';
import {AuthComponent} from './log/auth/auth.component';
import {FormRecordComponent} from './log/form-record/form-record.component';
import {HomepageComponent} from './log/homepage/homepage/homepage.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {OffersComponent} from './offers/offers.component';
import { ExchangeRequestsComponent } from './exchange-requests/exchange-requests.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: AuthComponent},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: FormRecordComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'profilo', component: UserProfileComponent },
  {path: 'offerte', component: OffersComponent},
  {path: "scambio", component: ExchangeRequestsComponent}

];
