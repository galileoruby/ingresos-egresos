import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUserSubscription: Subscription;
  currentUser: Usuario = null;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

    this.currentUserSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(fUser => {
        this.currentUser = fUser.user;
        console.log(this.currentUser);
      });




  }

  ngOnDestroy(): void {

    this.currentUserSubscription.unsubscribe();
  }

}
