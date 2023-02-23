import { Component, HostListener, Input, Renderer2 } from '@angular/core';
import { Movie } from 'src/app/models/movies.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Like } from 'src/app/models/like.model';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  constructor(private renderer: Renderer2, public fireService: FirebaseService, public MoviesService: MoviesService) { }
  @Input() item!: Movie; // decorate the property with @Input()


  darFormato(fecha: any) {
    let date = new Date(fecha); //Con estas 3 lineas formateamos la fecha para que salga "01-ene-2022"
    let options: any = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    };
    let newDateFormat = new Intl.DateTimeFormat('es-ES', options).format(date);
    return newDateFormat;
  }

  listaVisible = true;

  toggleList() {
    this.listaVisible = !this.listaVisible;
    document.removeEventListener('click', this.cerrarLista);
    setTimeout(() => {
      document.addEventListener('click', this.cerrarLista);
    });
  }

  cerrarLista = () => {
    this.listaVisible = true;
  };

  like() {
    if (this.item.liked === true) {
      this.disliked();
    } else {

      let like = new Like();
      like.name = this.item.title;
      like.id = this.item.id;
      like.like = true;

      this.fireService.saveLike(like).then((success) => {
        console.log(success);
        this.item.liked = true;
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  disliked() {
    this.fireService.unLike(String(this.item.id!)).then((success) => {
      this.item.liked = undefined;
    }).catch((err) => {
      console.log(err);
    });
  }
}
