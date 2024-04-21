import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-price-box',
  standalone: true,
  imports: [],
  templateUrl: './price-box.component.html',
  styleUrl: './price-box.component.css'
})
export class PriceBoxComponent {

  @Input() priceNight : number = 0;
  priceNightString : string = "";
  fiveNights : number = 0;
  fiveNightsString : string = "";
  tarifaAirbnb : number = 0;
  tarifaAirbnbString : string = "";
  totalBeforeTax : number = 0;
  totalBeforeTaxString : string = "";

  constructor(){}

  ngOnInit(){
    this.otherValues();
  }

  ngAfterViewInit(){
    this.otherValues();
  }

  otherValues(){
    console.log("otherValues pricebox "+this.priceNight);
    this.fiveNights = this.priceNight * 5;
    this.fiveNightsString = this.fiveNights.toLocaleString();
    this.tarifaAirbnb = this.fiveNights * 0.12;
    this.tarifaAirbnbString = this.tarifaAirbnb.toLocaleString();
    this.totalBeforeTax = this.fiveNights + this.tarifaAirbnb;
    this.totalBeforeTaxString = this.totalBeforeTax.toLocaleString();
    this.priceNightString = this.priceNight.toLocaleString();
  }



}
