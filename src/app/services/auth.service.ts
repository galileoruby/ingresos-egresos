import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFire: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

  }


  initAuthListener() {


    this.authFire.authState.subscribe(fuser => {

      console.log(fuser);
      // console.log(fuser ?.uid);
      // console.log(fuser ?.email);
    });
  }


  crearusuario(nombre: string, email: string, password: string) {



    return this.authFire.auth.createUserWithEmailAndPassword(email, password).then(
      ({ user }) => {

        const usuario = new Usuario(user.uid, nombre, email);

        return this.firestore.doc(`${user.uid}/usuario`).set({...usuario});

      });



  }

  iniciarSesion(email: string, password: string) {


    return this.authFire.auth.signInWithEmailAndPassword(email, password);


  }


  cerrarSesion() {

    console.log('auth.service.cerrarSesion');

    return this.authFire.auth.signOut();
  }


  isAuth() {
    return this.authFire.authState.pipe(
      map(fbUser => fbUser != null)
    );

  }

}

