import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';

import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresosEgresoSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {


    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(
        ({ user }) => {
          this.ingresosEgresoSubscription = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
            .subscribe(ingresosEgresosFB => {
              this.store.dispatch(ieActions.setItems({ items: ingresosEgresosFB }))
            })
        }
      );

  }//ng-init

  ngOnDestroy() {
    this.ingresosEgresoSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
