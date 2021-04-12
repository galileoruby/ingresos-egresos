import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as uiAction from '../ui.actions';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  ingresoEgresoForm: FormGroup
  tipo: string = 'ingreso';
  cargando: boolean = false;
  subscriptionLoading: Subscription;

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>

  ) {



  }

  ngOnInit() {

    this.ingresoEgresoForm = this.fb.group({

      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      tipo: ['']
    });


    this.subscriptionLoading = this.store.select('ui').subscribe(
      loadingState => {
        this.cargando = loadingState.isLoading
      }
    );


    this.ingresoEgresoForm.addControl('tipo', new FormControl('', [Validators.required]));

  }

  ngOnDestroy() {

    this.subscriptionLoading.unsubscribe();

  }



  // onBlurEvent(event:any){
  //   debugger;
  //    console.log(event.target.value);
  // }

  guardar() {




     
    if (this.ingresoEgresoForm.invalid) { return; }



    const { descripcion, monto } = this.ingresoEgresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);


    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(exito => {

        this.ingresoEgresoForm.reset;

        Swal.fire({
          icon: 'success',
          title: this.tipo,
          text: 'Agregado correctamente'
        })


        this.store.dispatch(uiAction.stopLoading());

      }).catch(
        err => {

          Swal.fire({
            icon: 'error',
            title: this.tipo,
            text: err.message

          })

          this.store.dispatch(uiAction.stopLoading());

        })


  }
}
