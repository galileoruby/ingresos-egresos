import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  logOut() {


    this.auth.cerrarSesion().then(() => {

      this.router.navigate(['/login']);
      // this.router.navigate(['/dashboard']);


    }).catch(error => {

      Swal.fire({
        icon: 'error',
        title: error.code,
        text: error.message


      })

    });

  }

}
