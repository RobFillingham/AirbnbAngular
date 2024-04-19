import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  urlAPI:string="https://robertapi.free.beeceptor.com/places";

  constructor(private http: HttpClient) { }

  retornar(){
    return this.http.get(this.urlAPI).pipe(take(1));
  }
}
