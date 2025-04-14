import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa il modulo di routing
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Importa il modulo di routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
