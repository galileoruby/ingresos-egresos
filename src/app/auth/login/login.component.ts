import { Component, OnDestroy, OnInit } from '@angular/core';


import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/ui.actions';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {



  }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });


    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading         
      });

  }

  //~
  ngOnDestroy() {

    this.uiSubscription.unsubscribe();

  }


  iniciarSesion() {


    if (this.loginForm.invalid) { return; }




    this.store.dispatch(ui.isLoading());


    // Swal.fire({
    //   title: 'Espere por favor.',
    //   willOpen: () => {
    //     Swal.showLoading()
    //   }
    // });





    const { email, password } = this.loginForm.value;

    this.authService.iniciarSesion(email, password)
      .then(userx => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {

        // debugger;
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: error.code,
          text: error.message


        })
      }
      );

  }

  cerrarSesion() {
    this.authService.cerrarSesion().then(closed => {       

    }).catch(error => {

    });
  }




}


