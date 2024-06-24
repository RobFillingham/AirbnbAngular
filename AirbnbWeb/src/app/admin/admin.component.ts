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
    title = 'GraficasAngular';
    dark : boolean = false;
    background : string = "white";
    color : string = "black";
    url: string = "faiqd9Crpmg?si=AvhGc4-EmHppoD6q";
    user$ = this.firebaseStuff.currentUser$;

    constructor(public darkBackService: DarkBackService, private firebaseStuff : FirebaseStuffService, public userData: UserDataService ){
      //Primero se ejecuta el constructor, luego el ngOnInit
    }

    public chart: Chart | null = null;
    users? : User[] = [];

  
    // Arreglo de objetos con datos
    public dataObjects = [
      { label: '1-2 dias', value: 0, color: 'rgb(255, 99, 132)' },
      { label: '3-4 dias', value: 0, color: 'rgb(54, 162, 235)' },
      { label: '5-6 dias', value: 0, color: 'rgb(255, 205, 86)' },
      { label: '7-8 dias', value: 0, color: 'rgb(75, 192, 192)' },
      { label: '9+ dias', value: 0, color: 'rgb(153, 102, 255)' }
    ];
  
    ngOnInit(): void {

      this.firebaseStuff.getUser().subscribe(users=>{
        this.users = users;
      })

      this.generateRandomData();
      this.initializeChart();

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
  
    initializeChart(): void {
      const data = this.getChartData();
  
      this.chart = new Chart("chart", {
        type: 'doughnut' as ChartType,
        data
      });
    }
  
    updateChart(): void {
      this.generateRandomData();
      if (this.chart) {
        const data = this.getChartData();
        this.chart.data.datasets[0].data = data.datasets[0].data;
        this.chart.data.labels = data.labels;
        this.chart.update();
      }
    }
  
    generateRandomData(): void {
      this.dataObjects = this.dataObjects.map(obj => ({
        ...obj,
        value: Math.floor(Math.random() * 400)
      }));
    }
  
    getChartData() {
      return {
        labels: this.dataObjects.map(obj => obj.label),
        datasets: [{
          label: 'Reservaciones',
          data: this.dataObjects.map(obj => obj.value),
          backgroundColor: this.dataObjects.map(obj => obj.color),
          hoverOffset: 4
        }]
      };
    }
  
}
