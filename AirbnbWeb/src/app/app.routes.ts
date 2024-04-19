import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PlaceDisplayComponent } from './place-display/place-display.component';

export const routes: Routes = [
    { path: "displayPlaces", component: PlaceDisplayComponent },
];
