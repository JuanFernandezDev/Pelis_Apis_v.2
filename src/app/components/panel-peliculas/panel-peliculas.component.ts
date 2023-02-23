import { Component, HostListener } from '@angular/core';


import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movies.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-panel-peliculas',
  templateUrl: './panel-peliculas.component.html',
  styleUrls: ['./panel-peliculas.component.css']
})
export class PanelPeliculasComponent {

  constructor(public MoviesService: MoviesService, public fireService: FirebaseService) { }


  ngOnInit(): void {
    this.MoviesService.getMovies()

    this.fireService.myLikes?.subscribe((likes) => {
      console.log(likes)
      likes.forEach((like) => {
        let posicion = this.MoviesService.allMovies.findIndex(m => m.id === like.id)
        this.MoviesService.allMovies[posicion]!.liked = like.like
      })
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body, html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.masMovies()
    }
  }
  masMovies() {
    this.MoviesService.masMovies()
  }



}
