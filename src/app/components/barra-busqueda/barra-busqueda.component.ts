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

  buscarPelis(nombre: string){
    if(nombre != ""){
      this.MoviesService.nombre = nombre
      this.MoviesService.buscarPeli(nombre)
    }else{
      this.MoviesService.nombre = ""
      this.MoviesService.getMovies()   
    } 
  }

  buscarPorGenero(genero: Genre){
    const objectExists = this.gens.some((gen) => gen.id === genero.id);
    if(!objectExists){
      this.gens.push(genero!)
      this.MoviesService.listaGeneros.push(genero.id!)
      this.MoviesService.buscarPeliGenre()
    }else{
      this.borrarGenero(genero)
    }
    
  }
  borrarGenero(genero: Genre){
    let genreToDelete = this.gens.findIndex((gen) => gen.id === genero.id);
      console.log(genreToDelete)
      if (genreToDelete != -1) {
        console.log("Entro")
        this.gens.splice(genreToDelete, 1);
        this.MoviesService.listaGeneros.splice(genreToDelete, 1);
        console.log("se borro" + this.gens)
      } 
  }
  siExiste(genero: Genre){
    const objectExists = this.gens.some((gen) => gen.id === genero.id);
    return objectExists
  }

  borrarTodos(){
    this.gens = []
    this.MoviesService.listaGeneros = []
    this.MoviesService.getMovies()
  }
}
