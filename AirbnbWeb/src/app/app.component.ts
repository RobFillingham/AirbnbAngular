import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteReservacionesComponent } from './reporte-reservaciones/reporte-reservaciones.component';
import { TeamDataComponent } from './team-data/team-data.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { PlaceDisplayComponent } from './place-display/place-display.component';
import { CommonModule } from '@angular/common';
import { DarkBackService } from './services/back/dark-back.service';
import { FooterComponent } from './footer/footer.component';
import { FilterService } from './services/filter.service';
import { FormsModule } from '@angular/forms';
import { BotonDarkmodeComponent } from "./boton-darkmode/boton-darkmode.component";
import { UserDataService } from './services/firebaseService/user-data.service';
import { FirebaseStuffService } from './services/firebaseService/firebase-stuff.service';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, ReporteReservacionesComponent, TeamDataComponent, HelpPageComponent, PlaceDisplayComponent, RouterModule, CommonModule, FooterComponent, FormsModule, BotonDarkmodeComponent, SpinnerComponent]
})


export class AppComponent {
  title = 'AirbnbWeb';
  dark : boolean = false;
  background : string = "white";
  color : string = "black";
  activeLink: string = 'home'; 
  clase: string = "fa-solid fa-sun";
  shadow: string = "0 2px 4px 0 rgba(0,0,0,0.2)";
  criteria: string = "";

  constructor( public darkBackService: DarkBackService, private filterService: FilterService, private firebaseStuff : FirebaseStuffService, public userData: UserDataService){
    
  }

  $user = this.firebaseStuff.currentUser$;

  ngOnInit() {
    this.darkBackService.dark$.subscribe(dark => {
      this.dark = dark;
      if(this.dark){
        this.background = "black";
        this.color = "white";
        this.clase= "fa-solid fa-sun";
        this.shadow = "0px 2px 4px 0px rgba(255,255,255,0.2)";
      }else{
        this.background = "white";
        this.color = "black";
        this.clase= "fa-solid fa-moon";
        this.shadow = "0px 2px 4px 0px rgba(0,0,0,0.2)";
      }
    });
  }

  change(){
    this.darkBackService.setDark(!this.dark);
  }

  setActiveLink(link:string){
    this.activeLink=link;
  }

  filterByPrice(){
    this.filterService.filterCriteria.next(this.criteria);
  }

  manejarClicEnBoton(): void {
    this.darkBackService.setDark(!this.dark);
  }

  logout(){
    this.firebaseStuff.logout().subscribe({
      next: () => {
        console.log('Logged out');
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }
}

