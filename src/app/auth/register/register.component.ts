import { Component, OnDestroy, OnInit } from '@angular/core';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


import * as ui from 'src/app/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSuscription: Subscription;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });




    this.uiSuscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    }
    );




  }

  //~
  ngOnDestroy(): void {


    this.uiSuscription.unsubscribe();

  }


  crearusuario(): void {





    if (this.loginForm.invalid) {
      return;
    }


    this.store.dispatch(ui.isLoading());


    // Swal.fire({
    //   title: 'Espere por favor.',
    //   willOpen: () => {
    //     Swal.showLoading()
    //   }
    // });





    const { nombre, correo, password } = this.loginForm.value;

    this.authService.crearusuario(nombre, correo, password)
      .then(credenciales => {

        // Swal.close();
        this.store.dispatch(ui.stopLoading());


        this.router.navigate(['/detalle']);
      }).catch(error => {

        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: error.code,
          text: error.message


        })
      }
      );


  }

}
