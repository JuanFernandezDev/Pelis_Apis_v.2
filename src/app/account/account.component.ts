import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movies.model';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(public MoviesService: MoviesService, public fireService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    // suscribirse al observable en el método ngOnInit y asignar el resultado a la propiedad del componente
    this.fireService.getLikes()
    this.fireService.getPend()
  }


}
