import { Component } from '@angular/core';
import { DarkBackService } from '../services/back/dark-back.service';
import { PlacesService } from '../services/places.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  dark : boolean = false;
  background : string = "white";
  color : string = "black";

  constructor(public placesService: PlacesService, public darkBackService: DarkBackService){
    //Primero se ejecuta el constructor, luego el ngOnInit
  }


  ngOnInit(){
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
}
