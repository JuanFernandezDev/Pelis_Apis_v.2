import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movies.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  @Input() item!: Movie // decorate the property with @Input()

  darFormato(fecha : any){
    let date = new Date(fecha); //Con estas 3 lineas formateamos la fecha para que salga "01-ene-2022"
            let options: any = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' };
            let newDateFormat = new Intl.DateTimeFormat('es-ES', options).format(date);
    return newDateFormat
  }
}
