import { Component } from '@angular/core';
import { ExperienciasService } from '../services/places.service';
import { RouterModule } from '@angular/router';
import { Experiencias } from '../interfaces/experiencias';
import { DarkBackService } from '../services/back/dark-back.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.css'
})
export class ExperienciasComponent {

  array:Experiencias[]=[];
  dark : boolean = false;
  background : string = "white";
  color : string = "black";

  constructor(public experienciasService: ExperienciasService, public darkBackService: DarkBackService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }

ngOnInit(){
    this.recuperarDatos();
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

   recuperarDatos(){
     this.experienciasService.retornar().subscribe({
       next: this.successRequest.bind(this),
       error:(err)=>{console.log(err)}
     });
   }

   successRequest(data:any):void{
     this.array = data.expereincesAirbnb; //Asignamos la data al array local
   }
}
