import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Taxes } from 'src/app/models/taxes.model';
import { TaxesService } from 'src/app/services/taxes.service';
/**
 * Formulario creación y modificación de impuestos
 */
@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  /**
   * Formulario Tax
   */
  public formTax:FormGroup;

  /**
   * Tax object
   */
  public tax:Taxes= new Taxes();

  /**
   * Texto de error del campo code
   */
  public errorCode:string = "";

  /** 
   * Texto de erro del campo nombre 
   */ 
  public errorName:string="";

  /**
   * Decorador obtención propiedades de la directiva nameInput
   */
  @ViewChild('nameInput', {static:false}) nameInput: ElementRef;
  /**
   * Decorador obtención propiedades de la directiva codeInput
   */
  @ViewChild('codeInput', {static:false}) codeInput:ElementRef;


  constructor(private activeRouter:ActivatedRoute,
              private router:Router,
              private _taxesServices:TaxesService,
              private _modal:NzModalService,
              private _notification:NzNotificationService,
              public fb:FormBuilder
    ) { 
      this.activeRouter.params.subscribe(
        (resp)=>{
          if(resp.id!='nuevo') {
             this.load(resp.id);
          }
        }
      )
    }
  
  /**
   * @ignore
   */
  ngOnInit(): void {
    this.create();
    setTimeout(()=>{
      this.tax._id ? this.nameInput.nativeElement.focus() : this.codeInput.nativeElement.focus(); 
    },800)
  }

  @HostListener( 'window:keydown', ['$event']) onKeyDown(e:KeyboardEvent) {
    if (e.code==="Escape") {
      if (this.tax._id) {
        this.tax = new Taxes();
        this.create();
        setTimeout(() => {
          this.codeInput.nativeElement.focus();
        }, 800);
      } else {
        if (this.formTax.controls['name'].value) {
          this._modal.confirm({
            nzTitle:'<b>No ha guardado los datos. ¿Desea salir sin guardar?',
            nzOkText: 'Si',
            nzOnOk: ()=>{ this.router.navigate(['/taxes']); },
            nzCancelText: 'No',
            nzOnCancel: ()=>{this.nameInput.nativeElement.focus()}
          })
        } else {
          this.router.navigate(['/taxes']);
        }
        
        
      }
    }
  }





  /**
   * Retorna el error del campo codigo
   */
  public getCodeValid():void {

    this.errorCode = "";
    let control = this.formTax.get('code');
    if (control.touched && control.errors) {
      if (control.errors.required) {
        this.errorCode = "El campo es requerido. Pulse intro en el campo para obtener el último código disponible";
        return;
      }
      if (control.errors.max) {
        this.errorCode = "El campo no puede ser superior a 9";
        return;
      }
      if (control.errors.pattern) {
        this.errorCode = "El campo debe contener un número entero";
        return;
      }
    }

  }

  public getNameValid():void {
    let control = this.formTax.get('name');
    if (control.touched && control.errors) {
      if (control.errors.required) {
        this.errorName = "El campo nombre es obligatorio";
        return;
      }
    }
  }


  /**
   * Cargamos los datos del impuesto
   * 
   * @param id Identificar del impuesto
   */

  private load(id:string):void{
    this._taxesServices.getTax(id).subscribe(
      (resp:Taxes)=>{
        this.tax = resp;
        this.formTax.setValue({
          _id: this.tax._id,
          code: this.tax.code,
          name: this.tax.name,
        })
        this.formTax.controls['code'].disable();
      }
    )
  }

  /**
   * Creamos el formulario 
   */
  public create():void{
    this.formTax = this.fb.group({
      _id:[''],
      code: ['', [Validators.required, Validators.max(9), Validators.pattern("^[0-9]")]],
      name: ['', Validators.required]
    })
    this.formTax.controls['_id'].disable();
    //Incluye los controladores deshabilitados
    this.formTax.getRawValue();
  }

  public save(){
    this.tax._id = this.formTax.controls['_id'].value;
    this.tax.code = this.formTax.controls['code'].value;
    this.tax.name = this.formTax.controls['name'].value;

    this._taxesServices.save(this.tax,this.tax._id).subscribe(
      (tax:Taxes)=>{
        if(tax._id && this.tax._id) {
          this._notification.info('Crear', 'Impuesto creado correctamente');
        } else {
          this._notification.info('Modificar', 'Impuesto modificado correctmante');
        }
        this.formTax.controls['_id'].setValue(tax._id);
        this.formTax.controls['code'].disable();
      }
    )

  }

  /**
   * Obtenemos el último código disponible y si el código introducido ya existe carga los datos del impuesto
   */
  public getCode() {
    let controlCode = this.formTax.get('code');
    this.errorCode="";
    controlCode.setErrors(null);
    
    //Obtenemos el último código disponible
    if(controlCode.value==='') {
      this._taxesServices.getLastCode().subscribe(
        (resp:number)=>{
          controlCode.setValue(resp + 1);
        }
      )
    } else {
      //Si el código ya existe cargamos los datos directamente
      this._taxesServices.getTaxes(1,10,'code','ascend',null,[{key:'code',value:[controlCode.value]}]).subscribe(
        (resp:any)=>{
          if (resp.count===1) {
            this.tax  = resp.taxes[0];
            this.formTax.setValue({
              _id: this.tax._id,
              code: this.tax.code,
              name: this.tax.name,
            })
            controlCode.disable();
            this.nameInput.nativeElement.focus();
          } 
        }
      );
    }
  }

  
  /**
   * Salimos del formulario
   */
  public exit(){
    this.router.navigate(['/taxes']);
  }

  

}
