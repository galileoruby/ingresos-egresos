import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'



import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.models';
import * as authAction from '../auth/auth.action';

import * as ingresoEgresoAction from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;


  constructor(public authFire: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {

  }


  get User(): Usuario {
    return this._user;
  }

  initAuthListener() {
    this.authFire.authState.subscribe(fuser => {

      if (fuser) {
        this.userSubscription = this.firestore.doc(`/${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;

            this.store.dispatch(authAction.setUser({ user }));

          })

      } else {
        if (this.userSubscription) {
          this._user = null;
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authAction.unSetUser());
        this.store.dispatch(ingresoEgresoAction.unSetItems());
      }
    });
  }


  crearusuario(nombre: string, email: string, password: string) {



    return this.authFire.auth.createUserWithEmailAndPassword(email, password).then(
      ({ user }) => {

        const usuario = new Usuario(user.uid, nombre, email);

        return this.firestore.doc(`${user.uid}/usuario`).set({ ...usuario });

      });

  }

  iniciarSesion(email: string, password: string) {


    return this.authFire.auth.signInWithEmailAndPassword(email, password);

  }


  cerrarSesion() {
    return this.authFire.auth.signOut();
  }


  isAuth() {
    return this.authFire.authState.pipe(
      map(fbUser => fbUser != null)
    );

  }

}

