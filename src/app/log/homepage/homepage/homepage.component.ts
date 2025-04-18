import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {OffersComponent} from '../../../offers/offers.component';

@Component({
  selector: 'app-homepage',
  imports: [
    NavbarComponent,
    OffersComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
