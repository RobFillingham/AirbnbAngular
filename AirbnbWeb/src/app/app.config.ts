import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"airbnbfinal-fe212","appId":"1:1007996376875:web:263dbbc57209a4f262d76e","storageBucket":"airbnbfinal-fe212.appspot.com","apiKey":"AIzaSyCGYaYAclr6hcLM8zbqZNVJoktuKNgnigU","authDomain":"airbnbfinal-fe212.firebaseapp.com","messagingSenderId":"1007996376875"})), provideAuth(() => getAuth())]
};
