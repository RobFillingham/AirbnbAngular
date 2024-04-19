import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Places } from '../interfaces/places';
import { PlacesService } from '../services/places.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  array:Places[]=[];

  constructor(public placesService: PlacesService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }

  ngOnInit(){
    this.recuperarDatos();
  }

  recuperarDatos(){
    this.placesService.retornar().subscribe({
      next: this.successRequest.bind(this),
      error:(err)=>{console.log(err)}
    });
  }

  successRequest(data:any):void{
    this.array = data.AirbnbPlaces; //Asignamos la data al array local
  }

}
