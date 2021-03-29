import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {


  ingresoEgresoForm: FormGroup

  constructor(private fb: FormBuilder) {



  }

  ngOnInit() {

    this.ingresoEgresoForm = this.fb.group({

    });

  }

}
