import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  private currentUserSubscription: Subscription;
  public currentUser: Usuario=null;

  constructor(private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

    this.currentUserSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(fUser => {
        this.currentUser = fUser.user;
      });
  }

  ngOnDestroy(): void {

    this.currentUserSubscription.unsubscribe();


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
