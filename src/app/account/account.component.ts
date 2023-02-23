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
  likes?: Movie[]
  pend?: Movie[]
  constructor(public MoviesService: MoviesService, public fireService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    // suscribirse al observable en el método ngOnInit y asignar el resultado a la propiedad del componente
    this.getLikes()
    this.getPend()
  }

  async getLikes() {
    this.likes = await firstValueFrom(this.fireService.myLikes)
    console.log(this.likes);
  }

  async getPend() {
    this.pend = await firstValueFrom(this.fireService.pendientes)
    console.log(this.likes);
  }
}
