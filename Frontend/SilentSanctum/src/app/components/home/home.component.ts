import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Faux profil pour test
  profileJson = {
    name: 'Test User',
    email: 'test@example.com'
  };

  constructor(private router: Router) {}

  goToPosts() {
    this.router.navigate(['/posts']);
  }
}

