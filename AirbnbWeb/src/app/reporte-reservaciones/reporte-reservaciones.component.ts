import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DarkBackService } from '../services/back/dark-back.service';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { Reserva } from '../interfaces/reservas';


@Component({
  selector: 'app-reporte-reservaciones',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTabsModule],
  templateUrl: './reporte-reservaciones.component.html',
  styleUrl: './reporte-reservaciones.component.css'
})
export class ReporteReservacionesComponent {
  reservas: Reserva[];
  previas: Reserva[] = [];
  proximas: Reserva[] = [];
  dark : boolean = false;
  background : string = "white";
  color : string = "black";
  displayedColumns: string[] = ['Fecha', 'Hora', 'Dias', 'Nombre', 'Telefono', 'Email', 'Direccion', 'PrecioTotal'];

  constructor(public darkBackService: DarkBackService){
    const data = localStorage.getItem('data');
    this.reservas = data ? JSON.parse(data) : [];
    console.log(this.reservas);
    this.dividirReservas();
    console.log(this.proximas);
    console.log(this.previas);
  }
  

  ngOnInit(){
    this.darkBackService.dark$.subscribe((dark: boolean) => {
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

  dividirReservas(){
    this.reservas.forEach(reserva => {
      if(new Date(reserva.fecha) >= new Date()){
        this.proximas.push(reserva);
      }else{
        this.previas.push(reserva);
      }
    });
  }

  

}

