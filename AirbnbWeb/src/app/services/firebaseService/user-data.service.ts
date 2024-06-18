import { Injectable } from '@angular/core';
import { FirebaseStuffService } from './firebase-stuff.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private subscription: Subscription;
  name : string;
  email : string;

  constructor(private firebaseStuffService: FirebaseStuffService) {
    // Subscribe to currentUser$ observable
    this.subscription = this.firebaseStuffService.currentUser$.subscribe(user => {
      if (user) {
        this.onUserLogin(user);
      } else {
        this.onUserLogout();
      }
    });
    this.name = "";
    this.email = "";
  }

  // Perform actions when the user logs in
  private onUserLogin(user: any) {
    console.log('User logged in:', user);
    // Add your custom actions here
    this.name = "Robert";
  }

  // Perform actions when the user logs out
  private onUserLogout() {
    console.log('User logged out');
    // Add your custom actions here
    this.name = "";
  }

  // Unsubscribe when the service is destroyed to avoid memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
