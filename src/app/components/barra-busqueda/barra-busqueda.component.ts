import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Genre, Movie } from 'src/app/models/movies.model';
@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  constructor(public MoviesService: MoviesService) { }
  gens: Genre[] = []
  ngOnInit(): void {
    this.MoviesService.listarGeneros()
  }

  //Buscar una peli por su nombre
  buscarPelis(nombre: string) {
    if (nombre != "") {

      this.MoviesService.nombre = nombre
      this.MoviesService.buscarPeli(nombre)
    } else {
      this.MoviesService.buscando = false
      this.MoviesService.nombre = ""
      this.MoviesService.getMovies()
    }

  }

  //Busca por genero añadiendolo a la lista de generos
  buscarPorGenero(genero: Genre) {
    const objectExists = this.gens.some((gen) => gen.id === genero.id);
    if (!objectExists) {
      this.gens.push(genero!)
      this.MoviesService.listaGeneros.push(genero.id!)
      this.MoviesService.getMovies()
    } else {
      this.borrarGenero(genero)
    }

  }

  //Borra un genero de la lista de generos
  borrarGenero(genero: Genre) {
    let genreToDelete = this.gens.findIndex((gen) => gen.id === genero.id);
    console.log(genreToDelete)
    if (genreToDelete != -1) {
      console.log("Entro")
      this.gens.splice(genreToDelete, 1);
      this.MoviesService.listaGeneros.splice(genreToDelete, 1);
      console.log("se borro" + this.MoviesService.listaGeneros)
      this.MoviesService.getMovies()
    }
  }
  siExiste(genero: Genre) {
    const objectExists = this.gens.some((gen) => gen.id === genero.id);
    return objectExists
  }

  // Borra todos los generos de la lista de generos
  borrarTodos() {
    this.gens = []
    this.MoviesService.listaGeneros = []
    this.MoviesService.getMovies()
  }


  //Cambia el filtro para ordenarlo
  cambiarOrden(opcion: number) {

    switch (opcion) {
      case 1:
        this.MoviesService.queryParams.sort_by = "popularity.desc"
        break;
      case 2:
        this.MoviesService.queryParams.sort_by = "primary_release_date.desc"
        break;
      default:
        this.MoviesService.queryParams.sort_by = "popularity.desc"
    }
    this.MoviesService.getMovies()
  }
}
