import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//ngRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';


 
import { AppComponent } from './app.component'; 



//Firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';

// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';




// 2. Add your credentials from step 1


@NgModule({
  declarations: [
    AppComponent,     
    
  ],
  imports: [
    BrowserModule,
    AuthModule,     
    
    AppRoutingModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    
    AngularFireStorageModule, // storage
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // retains las 25 movements,
      logOnly: environment.production // restrict extensions to log-only mode
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
