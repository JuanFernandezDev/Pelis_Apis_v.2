import { Component } from '@angular/core';


import { MoviesService } from 'src/app/services/movies.service';
import { Movie} from 'src/app/models/movies.model';


@Component({
  selector: 'app-panel-peliculas',
  templateUrl: './panel-peliculas.component.html',
  styleUrls: ['./panel-peliculas.component.css']
})
export class PanelPeliculasComponent {
  
  constructor(public MoviesService: MoviesService) { }
  allMovies: Movie[] = []

  ngOnInit(): void {
    this.MoviesService.getMovies()
  } 

  masMovies(){
    this.MoviesService.masMovies()
  }
}
