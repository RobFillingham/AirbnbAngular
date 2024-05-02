import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Places } from '../interfaces/places';
import { PlacesService } from '../services/places.service';
import { DarkBackService } from '../services/back/dark-back.service';
import { CommonModule } from '@angular/common';
import { SecurePipe } from '../secure.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, SecurePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  array:Places[]=[];
  dark : boolean = false;
  background : string = "white";
  color : string = "black";
  url: string = "faiqd9Crpmg?si=AvhGc4-EmHppoD6q";

  constructor(public placesService: PlacesService, public darkBackService: DarkBackService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }

  ngOnInit(){
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
    this.array=this.placesService.places;
    if(this.array.length==0){
      this.placesService.retornar().subscribe({
        next: this.successRequestHome.bind(this),
        error:(err)=>{console.log(err)}
      });
    }else{
      //console.log("Si hay datos en el array, obteniendo directo del servicio");
    }
  }
  
  successRequestHome(data:any):void{
    this.array = data.AirbnbPlaces;
    this.placesService.places = this.array;
  }

  
  
    
}

  


