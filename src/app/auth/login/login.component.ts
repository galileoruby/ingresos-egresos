import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {



  }

  ngOnInit() {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });

  }


  iniciarSesion() {


    if (this.loginForm.invalid) { return; }







    Swal.fire({
      title: 'Espere por favor.',
      willOpen: () => {
        Swal.showLoading()
      }
    });





    const { email, password } = this.loginForm.value;

    this.authService.iniciarSesion(email, password)
      .then(userx => {
        Swal.close();
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {

        // debugger;
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

      console.log(closed);

    }).catch(error => {

    });
  }

}


