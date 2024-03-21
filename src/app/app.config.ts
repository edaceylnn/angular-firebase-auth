import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp,initializeApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZ_l-pCBI45NNcQuj2KC3JPR-v7ab7cHU",
  authDomain: "fir-auth-c5b48.firebaseapp.com",
  projectId: "fir-auth-c5b48",
  storageBucket: "fir-auth-c5b48.appspot.com",
  messagingSenderId: "405486126421",
  appId: "1:405486126421:web:e386674179fdde3b0a1bdc"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
  importProvidersFrom([provideFirebaseApp(() => initializeApp(firebaseConfig)),provideAuth(() => getAuth())])],
};
