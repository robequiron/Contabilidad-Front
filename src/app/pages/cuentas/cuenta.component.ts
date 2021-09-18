import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Cuenta } from 'src/app/models/cuenta.model';
import { AppService } from 'src/app/services/app.service';
import { CuentasService } from 'src/app/services/cuentas.service';
/**
 * Formulario creación/modificación de cuentas
 */
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {


  /**
   * Formulario cuenta
   */
  public formCuenta:FormGroup;

  /**
   * Cuenta
   */
  public cuenta:Cuenta = new Cuenta();

   /**
   * Decorador obtención propiedades de la directiva nameInput
   */
  @ViewChild('nameInput', {static:false}) nameInput : ElementRef;



  constructor(private activeRouter:ActivatedRoute,
    public fb:FormBuilder,
    public _appServices:AppService,
    private _cuentaService:CuentasService,
    public _notification:NzNotificationService,
    private router:Router
  ) {
    this.activeRouter.params.subscribe(
      (resp)=>{
        
      }
    )

   }

  ngOnInit(): void {
    this.createFormCuenta()
  }


  public load(id:string) {

  }

  public createFormCuenta(){

    this.formCuenta = this.fb.group({
      _id:[''],
      name:[''],
      surname:[''],
      surname2:[''],
      codeNif:[1],
      nif:[''],
      sexo:['F']
      
    })

  }

  public save() {}

  public checkNif(){}

}
