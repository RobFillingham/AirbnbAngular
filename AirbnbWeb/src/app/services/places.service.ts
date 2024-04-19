import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Places } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  urlAPI:string="https://robertapi.free.beeceptor.com/places";
  places : Places[] = [];

  constructor(private http: HttpClient) {
    
  
  }
  
  retornar(){
    console.log("Se ejecuto el retornar de PlacesService");
    return this.http.get(this.urlAPI).pipe(take(1));
  }
}
