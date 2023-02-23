import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, onAuthStateChanged, getAuth } from 'firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
/* import { auth } from 'firebase/app'; */
import { map, Observable } from 'rxjs';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any;
  logged: boolean = false;

  myLikes?: Observable<Like[]>;

  likeRef: AngularFirestoreCollection<Like>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    public db: AngularFirestore
  ) {
    this.likeRef = db.collection('users');
    if (this.isLoggedIn()) {
      this.myLikes = this.likeRef.doc(this.userEmail()).collection('likes').valueChanges();
    }

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
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

  saveLike(like: Like) {
    return this.likeRef.doc(this.userData.email).collection('likes').doc(String(like.id)).set(Object.assign({}, like));
  }

  unLike(idDoc: string) {
    return this.likeRef.doc(this.userData.email).collection('likes').doc(idDoc).delete();
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
}
