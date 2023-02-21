import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
/* import { auth } from 'firebase/app'; */
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: any;
  
  /* myLikes?: Observable<Like[]>
  
  likeRef: AngularFirestoreCollection<Like> */
  
  /* myLikes?: Observable<Like[]>

  likeRef: AngularFirestoreCollection<Like> */

  constructor(private auth: AngularFireAuth, private router: Router, public db: AngularFirestore) {
    /* this.likeRef = db.collection("users"); 
    if (this.isLoggedIn()) {
      this.myLikes = this.likeRef.doc(this.userEmail()).collection("likes").valueChanges()
    } */
  
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

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== 'null' && user != null) ? true : false;
  }

  userEmail(): string { 
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user.email
    }
    return "";
  }

  newAccount(email: string, pass: string) {
    return this.auth.createUserWithEmailAndPassword(email, pass)
  }

  /* loginGoogle(){
    return this.auth.signInWithPopup(new auth.GoogleAuthProvider())
  } */

  login(email: string, pass:string) {
    return this.auth.signInWithEmailAndPassword(email, pass)
  }

  logOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  /* saveLike(like: Like)  {
    return this.likeRef.doc(this.userData.email).collection("likes").doc(String(like.id)).set(Object.assign({}, like))
  }

  unLike(idDoc: string) {
    return this.likeRef.doc(this.userData.email).collection("likes").doc(idDoc).delete()
  } */

  loginGoogle() {
    const provider = new GoogleAuthProvider();
    const result = this.auth.signInWithPopup(provider);

    this.auth.signInWithPopup(provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    this.router.navigate(['/']);
    console.log(result)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    console.log(result)
  });
  }

  
}
