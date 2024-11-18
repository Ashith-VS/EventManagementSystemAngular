import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase.config';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
    // provideStore(),
    //  importProvidersFrom([
    //   StoreModule.forRoot()
    //  ]),
     provideFirebaseApp(()=>initializeApp(firebaseConfig)),
     provideFirestore(()=>getFirestore()),
     provideStorage(()=>getStorage()),
     provideAuth(()=>getAuth())
    ]
};