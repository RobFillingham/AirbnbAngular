import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { DarkBackService } from '../services/back/dark-back.service';
import { FirebaseStuffService } from '../services/firebaseService/firebase-stuff.service';
import { UserDataService } from '../services/firebaseService/user-data.service';
import { CommonModule } from '@angular/common';
import  User   from '../interfaces/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
    dark : boolean = false;
    background : string = "white";
    color : string = "black";
    url: string = "faiqd9Crpmg?si=AvhGc4-EmHppoD6q";
    user$ = this.firebaseStuff.currentUser$;
    averageDuration: number = 0;
    monthlyRevenue: number = 0;
    frequentClients: { userID: string; count: number; }[] = [];
    appointmentsByDayOfWeek: { day: string; count: number; }[] = [];

    constructor(public darkBackService: DarkBackService, private firebaseStuff : FirebaseStuffService, public userData: UserDataService ){
      //Primero se ejecuta el constructor, luego el ngOnInit
    }
  
    ngOnInit(): void {
      // Consultas
      this.getAverageAppointmentDuration();
      this.getMonthlyRevenue();
      this.getFrequentClients();
      this.getAppointmentsByDayOfWeek();

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
  

    getAverageAppointmentDuration() {
      this.firebaseStuff.getAverageAppointmentDuration().subscribe(duration => {
        this.averageDuration = duration;
      });
    }

    getMonthlyRevenue() {
      this.firebaseStuff.getMonthlyRevenue().subscribe(revenue => {
        this.monthlyRevenue = revenue;
      });
    }

    getFrequentClients() {
      this.firebaseStuff.getFrequentClients().subscribe(clients => {
        this.frequentClients = clients;
      });
    }

    getAppointmentsByDayOfWeek() {
      this.firebaseStuff.getAppointmentsByDayOfWeek().subscribe(data => {
        this.appointmentsByDayOfWeek = data;
        this.renderChart();
      });
    }

    renderChart() {
      const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.appointmentsByDayOfWeek.map(d => d.day),
          datasets: [{
            label: 'Citas por Día de la Semana',
            data: this.appointmentsByDayOfWeek.map(d => d.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
}
