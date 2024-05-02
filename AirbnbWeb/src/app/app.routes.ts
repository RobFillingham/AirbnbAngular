import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReporteReservacionesComponent } from './reporte-reservaciones/reporte-reservaciones.component';
import { TeamDataComponent } from './team-data/team-data.component';
import { PlaceDisplayComponent } from './place-display/place-display.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'reporte-reservaciones', component: ReporteReservacionesComponent},
    {path: 'team-data', component: TeamDataComponent},
    {path: 'place-display/:id', component: PlaceDisplayComponent},
    {path: 'experiencias', component: ExperienciasComponent},
    {path: 'checkout-form/:id', component: CheckoutFormComponent},
];
