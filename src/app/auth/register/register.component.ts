import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  crearusuario(): void {





    if (this.loginForm.invalid) {
      return;
    }




    Swal.fire({
      title: 'Espere por favor.',
      willOpen: () => {
        Swal.showLoading()
      }
    });





    const { nombre, correo, password } = this.loginForm.value;

    this.authService.crearusuario(nombre, correo, password)
      .then(credenciales => {

        Swal.close();


        this.router.navigate(['/detalle']);
      }).catch(error => 
          
        {           
          Swal.fire({
            icon: 'error',
            title: error.code ,
            text: error.message


          })
        }
        );


  }

}
