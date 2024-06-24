import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';
import { Firestore,  collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import  User   from '../../interfaces/user';
import { Observable } from 'rxjs';
import { ReservaFB } from '../../interfaces/reservasFB';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStuffService {

  constructor( private auth: Auth, private router : Router, private firestore: Firestore) { }

  currentUser$ = authState(this.auth);

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password)); //convierte la promesa en un observable
  }

  logout(){
    
    return from(this.auth.signOut());
  }

  addUser( user : User){
    const userRef = collection(this.firestore, 'Users');
    return addDoc(userRef, user);
  }

  getUser() : Observable<User[]> {
    const userRef = collection(this.firestore, 'Users');
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]>;
  }

  addReserva( reserva : ReservaFB){
    const reservaRef = collection(this.firestore, 'Reservas');
    return addDoc(reservaRef, reserva);
  }

  getReservas() : Observable<ReservaFB[]> {
    const reservaRef = collection(this.firestore, 'Reservas');
    return collectionData(reservaRef, {idField: 'id'}) as Observable<ReservaFB[]>;
  }

}
