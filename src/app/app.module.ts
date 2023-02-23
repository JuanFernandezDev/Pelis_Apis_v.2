import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieComponent } from './components/movie/movie.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { PanelPeliculasComponent } from './components/panel-peliculas/panel-peliculas.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FirebaseApp } from '@angular/fire/compat';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AccountComponent } from './account/account.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    NavbarComponent,
    MovieComponent,
    FooterComponent,
    BarraBusquedaComponent,
    PanelPeliculasComponent,
    LoginComponent,
    RegistroComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: PERSISTENCE, useValue: 'session' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
