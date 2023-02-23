import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieResponse, GenreResponse } from '../models/movies.model';
import { Movie, Genre, Query } from '../models/movies.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  buscando = false
  nombre: string = ""
  pagina = 1
  url = "https://api.themoviedb.org/3/discover/movie/"
  apiKey = "6a98bac66a8fa62e25bcf3b221294b7f"

  queryParams: Query = new Query()

  allMovies: Movie[] = []
  generos: Genre[] = []
  listaGeneros: number[] = []
  constructor(private http: HttpClient, public fireService: FirebaseService) { }

  peliculas: Movie[] = []

  getMovies() {
    this.queryParams.page = 1
    if (this.listaGeneros.length != 0) {
      this.queryParams.with_genres = this.listaGeneros.join(',')
    } else {
      delete this.queryParams.with_genres
    }

    this.http.get<MovieResponse>("https://api.themoviedb.org/3/discover/movie/", { params: JSON.parse(JSON.stringify(this.queryParams)) }).subscribe(
      {
        next: (data: MovieResponse) => {
          this.allMovies = data.results!
          this.actualizar()
        }, error: (err) => {
          console.log(err)
        }
      }
    )
  }

  masMovies() {
    this.queryParams.page++
    this.pagina++


    this.http.get<MovieResponse>("https://api.themoviedb.org/3/discover/movie/", { params: JSON.parse(JSON.stringify(this.queryParams)) }).subscribe(
      {
        next: (data: MovieResponse) => {
          this.allMovies = this.allMovies.concat(data.results!)
        }, error: (err) => {
          console.log(err)
        }
      }
    )
    this.actualizar()
  }

  buscarPeli(peli: string) {
    this.buscando = true
    this.queryParams.page = 1
    this.queryParams.query = peli

    this.http.get<MovieResponse>("https://api.themoviedb.org/3/search/movie?", { params: JSON.parse(JSON.stringify(this.queryParams)) }).subscribe(
      {
        next: (data: MovieResponse) => {
          this.allMovies = data.results!
          this.actualizar()
        }, error: (err) => {
          console.log(err)
        }
      }

    )
  }

  listarGeneros() {
    let queryGeneros = {
      api_key: "6a98bac66a8fa62e25bcf3b221294b7f",
      language: "es-ES",
    }
    this.http.get<GenreResponse>("https://api.themoviedb.org/3/genre/movie/list?", { params: queryGeneros }).subscribe(
      {
        next: (data: GenreResponse) => {
          this.generos = data.genres!
        }, error: (err) => {
          console.log(err)
        }
      }

    )
  }

  actualizar() {
    this.fireService.myLikes?.subscribe((likes) => {
      likes.forEach((like) => {
        let posicion = this.allMovies.findIndex(m => m.id === like.id)
        if (posicion != -1) {
          this.allMovies[posicion]!.liked = like.liked
        }
      })
    })

    this.fireService.pendientes?.subscribe((pendient) => {
      pendient.forEach((pend) => {
        let posicion = this.allMovies.findIndex(m => m.id === pend.id)
        if (posicion != -1) {
          this.allMovies[posicion]!.pending = pend.liked
        }
      })
    })
  }

}