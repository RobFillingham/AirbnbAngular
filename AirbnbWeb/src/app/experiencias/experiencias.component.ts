import { Component } from '@angular/core';
import { ExperienciasService } from '../services/places.service';
import { RouterModule } from '@angular/router';
import { Experiencias } from '../interfaces/experiencias';

@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.css'
})
export class ExperienciasComponent {

  array:Experiencias[]=[];

  constructor(public experienciasService: ExperienciasService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }

ngOnInit(){
    this.recuperarDatos();
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
