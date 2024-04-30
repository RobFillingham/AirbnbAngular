import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteReservacionesComponent } from './reporte-reservaciones/reporte-reservaciones.component';
import { TeamDataComponent } from './team-data/team-data.component';
import { PlaceDisplayComponent } from './place-display/place-display.component';
import { CommonModule } from '@angular/common';
import { DarkBackService } from './services/back/dark-back.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, ReporteReservacionesComponent, TeamDataComponent, PlaceDisplayComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AirbnbWeb';
  dark : boolean = false;
  background : string = "white";
  color : string = "black";
  activeLink: string = 'home'; 
  clase: string = "fa-solid fa-sun";

  constructor( public darkBackService: DarkBackService){
    
  }

  ngOnInit() {
    this.darkBackService.dark$.subscribe(dark => {
      this.dark = dark;
      if(this.dark){
        this.background = "black";
        this.color = "white";
        this.clase= "fa-solid fa-moon";
      }else{
        this.background = "white";
        this.color = "black";
        this.clase= "fa-solid fa-sun";
      }
    });
  }

  change(){
    this.darkBackService.setDark(!this.dark);
  }

  setActiveLink(link:string){
    this.activeLink=link;
  }
}
