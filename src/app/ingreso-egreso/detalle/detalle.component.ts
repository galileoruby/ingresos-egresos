import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {


  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoServ: IngresoEgresoService

  ) { }

  ngOnInit() {

    this.ingresosSubscription = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.ingresosEgresos = items);
  }

  ngOnDestroy() {

    this.ingresosSubscription.unsubscribe();

  }

  borrar(uid: string) {
    console.log(uid);
    this.ingresoEgresoServ.borrarIngresoEgreso(uid).then(
      () => {
        Swal.fire('oka', 'item borrado', 'success');
      }
    ).catch(err => {
      Swal.fire('oka', err.message, 'error');

    })
  }

}
