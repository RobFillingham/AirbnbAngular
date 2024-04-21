import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Places } from '../interfaces/places';
import { PlacesService } from '../services/places.service';
import { DarkBackService } from '../services/back/dark-back.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  array:Places[]=[];
  dark : boolean = false;
  background : string = "white";
  color : string = "black";

  constructor(public placesService: PlacesService, public darkBackService: DarkBackService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }

  ngOnInit(){
    console.log("Se ejecuto el ngOnInit de Home");
    this.recuperarDatosHome();
    this.darkBackService.dark$.subscribe(dark => {
      this.dark = dark;
      if(this.dark){
        this.background = "black";
        this.color = "white";
      }else{
        this.background = "white";
        this.color = "black";
      }
    });
  }

  recuperarDatosHome(){
    console.log("Se ejecuto el recuperarDatos de Home");
    this.array=this.placesService.places;
    if(this.array.length==0){
      console.log("No hay datos en el array, haciendo consulta al servidor API");
      this.placesService.retornar().subscribe({
        next: this.successRequestHome.bind(this),
        error:(err)=>{console.log(err)}
      });
    }else{
      console.log("Si hay datos en el array, obteniendo directo del servicio");
    }
  }
  
  successRequestHome(data:any):void{
    this.array = data.AirbnbPlaces;
    this.placesService.places = this.array;
  }

  
  
    
}

  


