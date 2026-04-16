import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [NavbarComponent, RouterOutlet],
})
export class App {

}
