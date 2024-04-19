import { Component } from '@angular/core';

@Component({
  selector: 'app-place-display',
  standalone: true,
  imports: [],
  templateUrl: './place-display.component.html',
  styleUrl: './place-display.component.css'
})
export class PlaceDisplayComponent {
  name : string ="";
  img1 : string ="";
  img2 : string ="";
  img3 : string ="";
  img4 : string ="";
  img5 : string ="";
  priceNight : string ="";
  offer : string[] = [];
  description : string ="";
  quickDescription : string ="";
  descriptionTitle : string ="";
  maxGuests : number = 0;
  googleMapsEmbeded : string ="";
  rating : number = 0;

  constructor(){
    const objeto = localStorage.getItem("objeto");
    if(objeto){
      const objetoParseado = JSON.parse(objeto);
      this.name = objetoParseado.name;
      this.img1 = objetoParseado.img1;
      this.img2 = objetoParseado.img2;
      this.img3 = objetoParseado.img3;
      this.img4 = objetoParseado.img4;
      this.img5 = objetoParseado.img5;
      this.priceNight = objetoParseado.priceNight;
      this.offer = objetoParseado.offer;
      this.description = objetoParseado.description;
      this.quickDescription = objetoParseado.quickDescription;
      this.descriptionTitle = objetoParseado.descriptionTitle;
      this.maxGuests = objetoParseado.maxGuests;
      this.googleMapsEmbeded = objetoParseado.googleMapsEmbeded;
      this.rating = objetoParseado.rating;
    }
  }

}

