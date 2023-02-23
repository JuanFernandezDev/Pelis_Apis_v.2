import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, public fireService: FirebaseService) {
  }

  goLogin(event: Event){
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
