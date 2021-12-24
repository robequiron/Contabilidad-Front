import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Vias } from 'src/app/models/vias.model';
import { ViasService } from 'src/app/services/parametros/vias.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectComponent } from 'ng-zorro-antd/select/select.component';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  
  /**
   * Formulario dirección
   */
  public formDireccion:FormGroup;

  /**
   * Array tipos de vias
   */
  public vias:Vias[];




  constructor(public _vias:ViasService, public fb:FormBuilder) { }

  ngOnInit(): void {
    this.vias = this._vias.vias;
    console.log(this.vias);
    this.create();
  }

  /**
   * Creamos el formulario
   */
  public create(){
    this.formDireccion = this.fb.group({
      _idVia:[''],
      nameVia:['',[Validators.required, Validators.pattern("[a-zA-Z0-9À-ÿñÑ\s]{3,25}")]],
      number:[''],
      flat:[''],
      door:[''],
      postal:[''],
      provincia:[''],
      localidad:[''],
    })
  }

  public save(){}

}
