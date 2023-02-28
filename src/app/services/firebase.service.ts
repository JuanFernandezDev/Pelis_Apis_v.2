import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, onAuthStateChanged, getAuth } from 'firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, firstValueFrom } from 'rxjs';
import { Movie } from '../models/movies.model';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any;
  logged: boolean = false;

  likes?: Movie[]
  pend?: Movie[]

  myLikes!: Observable<Movie[]>;
  pendientes!: Observable<Movie[]>;
  movieRef: AngularFirestoreCollection<Movie>;

  constructor(private auth: AngularFireAuth, private router: Router, public db: AngularFirestore) {
    this.movieRef = db.collection('users');
    if (this.isLoggedIn()) {
      this.myLikes = this.movieRef.doc(this.userEmail()).collection('likes').valueChanges();
      this.pendientes = this.movieRef.doc(this.userEmail()).collection('pendientes').valueChanges();
    }

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.logged = true;
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  ngOnInit(): void {
    console.log('Entro');
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.userData = user;
        console.log('Usuario logueado', this.userData.email);
        this.logged = true;
      } else {
        this.userData = '';
        console.log('No hay usuario logueado');
      }
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' && user != null ? true : false;
  }

  userEmail(): string {
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user.email;
    }
    return '';
  }
  errorRegistro = false;
  newAccount(email: string, pass: string) {
    this.auth.createUserWithEmailAndPassword(email, pass).then(() => {
      this.router.navigate(['/login']);
      console.log('User created');
      this.errorRegistro = false;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.message;
      this.errorRegistro = true;
      console.log(errorCode);
    });
  }
  errorLogin = false;
  login(email: string, pass: string) {
    this.logged = true;

    this.auth.signInWithEmailAndPassword(email, pass).then((result) => {
      this.router.navigate(['/']);
      console.log(result.user?.email);
      this.errorLogin = false;
      this.userData = result.user;

    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        console.log('El usuario no se encuentra registrado.');
        //El error sigue saliendo por consola
        this.errorLogin = true;
      } else {
        console.log(error.message);
      }
    });
  }

  logOut() {
    this.auth.signOut().then(() => {
      // El usuario ha cerrado sesión correctamente
      this.logged = false;
      this.userData = undefined;
      console.log('Usuario deslogueado ' + this.userData);
    }).catch((error) => {
      console.log(error);
    });
  }



  loginGoogle() {
    this.logged = true;
    const provider = new GoogleAuthProvider();
    this.auth.signInWithPopup(provider).then((result) => {
      // The signed-in user info.
      this.userData = result.user;
      this.router.navigate(['']);
      console.log(result);
    }).catch((error) => {
      // Handle Errors here.
      console.log(error.message);
    });


  }

  saveLike(item: Movie) {
    if (item.pending == false || item.pending == undefined) {
      return this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).set(Object.assign({}, item));
    } else {
      this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).update({ liked: true });
      return this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).set(Object.assign({}, item));
    }
  }

  unLike(item: Movie) {
    if (item.pending == false || item.pending == undefined) {
      return this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).delete();
    } else {
      this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).update({ liked: false });
      return this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).delete();
    }
  }

  guardarPendiente(item: Movie) {
    console.log(item)
    if (item.liked == false || item.liked == undefined) {
      return this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).set(Object.assign({}, item));
    } else {
      this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).update({ pending: true });
      return this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).set(Object.assign({}, item));
    }

  }
  quitarPendiente(item: Movie) {
    if (item.liked == false || item.liked == undefined) {
      return this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).delete();
    } else {
      this.movieRef.doc(this.userData.email).collection('likes').doc(String(item.id)).update({ pending: false });
      return this.movieRef.doc(this.userData.email).collection('pendientes').doc(String(item.id)).delete();
    }

  }

  async getLikes() {
    this.likes = await firstValueFrom(this.myLikes)
    //console.log(this.likes);
  }

  async getPend() {
    this.pend = await firstValueFrom(this.pendientes)
    //console.log(this.pend);
  }


  actualizarListas() {
    this.getPend()
    this.getLikes()
  }
}
