import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DarkBackService } from '../services/back/dark-back.service';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { Reserva } from '../interfaces/reservas';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { FirebaseStuffService } from '../services/firebaseService/firebase-stuff.service';
import { UserDataService } from '../services/firebaseService/user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-reporte-reservaciones',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTabsModule, QRCodeModule, RouterModule, SpinnerComponent],
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
  displayedColumns: string[] = ['Fecha', 'Hora', 'Dias', 'Nombre', 'Telefono', 'Email', 'Direccion', 'PrecioTotal', 'Eliminar'];
  selectedData: string | null=null;

  constructor(public darkBackService: DarkBackService, private firebaseStuff: FirebaseStuffService, public userData: UserDataService, private router: Router){
    const data = localStorage.getItem('data');
    this.reservas = data ? JSON.parse(data) : [];
    console.log(this.reservas, 'reservas');
    this.dividirReservas();
    console.log(this.proximas);
    console.log(this.previas);
  }
  user$ = this.firebaseStuff.currentUser$;
  

  ngOnInit(){
    this.user$.subscribe(user => {
      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'No estás autenticado',
          text: 'Debes iniciar sesión para continuar.',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/login']);
        });
      } else {
        
        this.darkBackService.dark$.subscribe(dark => {
          this.dark = dark;
          this.background = dark ? "black" : "white";
          this.color = dark ? "white" : "black";
        });

        
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

  eliminar(){

  }

  

}

