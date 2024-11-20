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
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { rootReducer } from './redux';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
    provideStore(),
     importProvidersFrom([
      StoreModule.forRoot(rootReducer)
     ]),
     provideFirebaseApp(()=>initializeApp(firebaseConfig)),
     provideFirestore(()=>getFirestore()),
     provideStorage(()=>getStorage()),
     provideAuth(()=>getAuth()),
     provideToastr({
      timeOut:10000,
      positionClass:"toast-top-center",
      preventDuplicates:true,
      closeButton:true,
      progressBar:true,
    }),
    provideAnimations()
    ]
};