import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStuffService {

  constructor( private auth: Auth, private router : Router) { }

  currentUser$ = authState(this.auth);

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password)); //convierte la promesa en un observable
  }

  logout(){
    return from(this.auth.signOut());
  }
}
