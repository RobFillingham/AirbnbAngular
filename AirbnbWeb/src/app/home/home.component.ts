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
    console.log("Se ejecuto el ngOnInit de Home");
    this.recuperarDatos();
  }

  recuperarDatos(){
    console.log("Se ejecuto el recuperarDatos de Home");
    this.array=this.placesService.places;
    if(this.array.length==0){
      console.log("No hay datos en el array, haciendo consulta al servidor API");
      this.placesService.retornar().subscribe({
        next: this.successRequest.bind(this),
        error:(err)=>{console.log(err)}
      });
    }else{
      console.log("Si hay datos en el array, obteniendo directo del servicio");
    }
  }
  
  successRequest(data:any):void{
    this.array = data.AirbnbPlaces;
    this.placesService.places = this.array;
  }
  
    
}

  


