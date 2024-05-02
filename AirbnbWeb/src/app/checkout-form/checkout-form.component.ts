import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriceBoxComponent } from '../price-box/price-box.component';
import { PlacesService } from '../services/places.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Places } from '../interfaces/places';
import Swal from 'sweetalert2';
import { DarkBackService } from '../services/back/dark-back.service';
import { ReservasService } from '../services/reservas.service';
import { Reserva } from '../interfaces/reservas';




@Component({
  selector: 'app-checkout-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, NgxMaterialTimepickerModule, CommonModule, FormsModule, PriceBoxComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})


export class CheckoutFormComponent implements OnInit, AfterViewInit{

  numberOfDays: number = 1;
  days: string = '1 dia';
  nights: string = '1 noche';
  place : Places = {} as Places;
  places : Places[] = [];
  priceNightNumber : number = 0;
  id : number = 0;
  precioxNoche : number = 0;
  precioUnaNoche : number = 0;
  tarifaAirbnb : number = 0;
  impuestos : number = 0;
  total : number = 0;
  registroForm: FormGroup;
  dark : boolean = false;
  background : string = "white";
  color : string = "black";
  hora: string = '12:00 AM';
  fecha: string = '';

  reserva!: Reserva;


  constructor(public placesService: PlacesService, private router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public darkBackService: DarkBackService, private reservasService:ReservasService) { 
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      numeroTelefonico: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.recalculate();
  }

  recalculate() {
    if(this.numberOfDays > 1 || this.numberOfDays == 0){
      this.days = this.numberOfDays + ' dias';
      this.nights = this.numberOfDays + ' noches';

    } else {
      this.days = this.numberOfDays + ' dia';
      this.nights = this.numberOfDays + ' noche';
    }

    this.precioUnaNoche = parseInt(this.place.priceNight.replace(/\D/g, ''), 10);
    this.precioxNoche = this.precioUnaNoche * this.numberOfDays;
    this.tarifaAirbnb = parseFloat((this.precioxNoche * 0.12).toFixed(2));
    this.impuestos = parseFloat((this.precioxNoche * 0.19).toFixed(2));
    this.total = parseFloat((this.precioxNoche + this.tarifaAirbnb + this.impuestos).toFixed(2));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fillPlace(params["id"]);
      this.place = this.placesService.places[params["id"]]; 
      console.log("just got the data from the server - displayplace")
      this.otherValue();
    });
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
    this.recalculate();
    this.reserva=this.reservasService.nuevaReserva();
  }
  
  fillPlace(id: number){
    this.id = id;
    if(this.placesService.places.length==0){
      console.log("Solicitud a servidor placeDisplay");
      this.placesService.retornar().subscribe({
        next: this.successRequest.bind(this),
        error:(err)=>{console.log(err)}
      });
    }else{
      console.log("No se hizo solicitud al servidor, placeDisplay");
      this.place=this.placesService.places[id];
    }

  }

  successRequest(data:any):void{
    this.places = data.AirbnbPlaces;
    this.placesService.places = this.places;
    this.place = this.places[this.id];
    this.priceNightNumber = parseFloat(this.place.priceNight.replace(/[^0-9.-]+/g,""));
  }

  otherValue(){
    this.priceNightNumber = parseFloat(this.place.priceNight.replace(/[^0-9.-]+/g,""));
    console.log("otherValues placedisplay"+this.priceNightNumber );
  }

  confirm(){
    if(this.registroForm.valid){
      Swal.fire({
        icon: 'success',
        title: 'Reserva realizada',
        text: '¡Tu reserva ha sido realizada con éxito!',
        showConfirmButton: false,
        timer: 2000
      });
      this.nuevaReserva();
      this.router.navigate(['/home']);

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '¡Por favor completa todos los campos!',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  nuevaReserva(): void{ 
    this.reserva.fecha=this.registroForm.get('fecha')?.value;
    this.reserva.hora=this.hora;
    this.reserva.dias=this.days;
    this.reserva.nombre=this.registroForm.get('nombreCompleto')?.value;
    this.reserva.telefono=this.registroForm.get('numeroTelefonico')?.value;
    this.reserva.email=this.registroForm.get('correoElectronico')?.value;
    this.reserva.direccion=this.place.name;
    this.reserva.imagen=this.place.img1;
    this.reserva.precioTotal=this.total;
    this.reservasService.agregarReserva(this.reserva);
    this.reserva=this.reservasService.nuevaReserva();
  }

}

