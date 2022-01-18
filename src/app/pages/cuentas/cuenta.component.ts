import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectComponent } from 'ng-zorro-antd/select/select.component';
import { Subscription } from 'rxjs';
import { Cuenta } from 'src/app/models/cuenta.model';
import { Respuesta } from 'src/app/models/response.model';
import { TypeNif } from 'src/app/models/typenif.model';
import { Workplace } from 'src/app/models/workplace.model';
import { AppService } from 'src/app/services/app.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { NifService } from 'src/app/services/nif.service';
import { WorkplacesService } from 'src/app/services/workplaces.service';
/**
 * Formulario creación/modificación de cuentas
 */
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit, OnDestroy {


  /**
   * Formulario cuenta
   */
  public formCuenta:FormGroup;

  /**
   * Cuenta
   */
  public cuenta:Cuenta = new Cuenta();

  /**
   * Centro de trabajo principal
   */
  public workplace:Workplace;

  /**
   * Alto de la ventana
   */
  public heightWindow:string='300px';

   /**
   * Decorador obtención propiedades de la directiva nameInput
   */
  @ViewChild('nameInput', {static:false}) nameInput : ElementRef;

   /**
   * Decorador obtención propiedades de la directiva typeNifInput
   */
  @ViewChild('typeNifInput', {static:false}) typeNifInput : NzSelectComponent ; 

  /**
   * Decorador obtención propiedades de la directiva codeInput
   */
  @ViewChild('codeInput', {static:false}) codeInput : ElementRef;

  /**
   * Decorador obtención propiedades de la directiva nifInput
   */
  @ViewChild('nifInput', {static:false}) nifInput: ElementRef;

  /**
   * Conmutador para mostrar los componentes hijos de la pestaña datos (Dirección y Teléfono);
   */
  public loadDatos:boolean = false;

  /**
   * Pestaña seleccionada
   */
  public SelectedIndex:number = 0;


  public errorForm = {
    code: ['','']
  }


  /**
   * Titulo y placeholder de los input dinámicos.
   */
  public labels = {
    name: ['Nombre',''],
    surname: ['Apellido', 'Primer apellido'],
    surname2: ['Apellido', 'Segundo apellido'],
    dateBirth: ['F. Nacimiento','F. Nacimiento'],
    sexo:['','']
  }



  constructor(private activeRouter:ActivatedRoute,
    public fb:FormBuilder,
    public _appServices:AppService,
    private _cuentaService:CuentasService,
    private _workplace:WorkplacesService,
    public _notification:NzNotificationService,
    private _nifValidate:NifService,
    private router:Router
  ) {
    this.activeRouter.params.subscribe(
      (resp)=>{
        if(resp.id!='nuevo') {
          this.cuenta._id = resp.id;
          this.load(resp.id);
          setTimeout(() => {
            //Esperamos un segundo para mostrar los componente hijos dirección y telefono
            this.loadDatos = true;
          }, 1000);
        } 
      }
    )

   }
 
  ngOnInit(): void {
    this.heightWindow = Math.round(window.innerHeight*40/100).toString() + 'px'; 
    this.create();
    setTimeout(() => {
      this.descriptionCategoria(1);
      this.codeInput.nativeElement.focus();
    }, 800);
  }

  /**
   * Decorador de métodos. Escucha eventos emitidos por el host
   * 
   * @param e Keyboard event
   */
     @HostListener('window:keydown', ['$event']) onKeyDown(e:KeyboardEvent) {
      if (e.code==="Escape" && this.SelectedIndex===0) {
        this.exit();
      }
    }

  /**
   * Retorna si la fecha está activo o no
   * 
   * @param v Fecha del calendario
   * @returns Boolean
   */  
  public disabledDate(v:any):boolean{
    let today = new Date();
    if (today<=v) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Leemos los datos para añadir al formulario
   * 
   * @param id Identificador de la cuenta
   */
  public load(id:string) {
    this._cuentaService.getCuenta(id).subscribe(
      (resp:Cuenta)=>{
        this.cuenta = resp;
        console.log(resp);
        this.formCuenta.setValue(
          {
            _id: resp._id,
            code: resp.code,
            typeNif:resp.typeNif,
            nif:resp.nif,
            category:resp.category,
            name:resp.name,
            surname:resp.surname,
            surname2:resp.surname2,
            sexo:resp.sex,
            dateBirth:new Date(),
            dCategory:''
          }
        )
        this.descriptionCategoria(resp.code);
        this.formCuenta.controls['code'].disable();
        this.formCuenta.controls['sexo'].setValue(resp.sex);
      }
    )
  }

 
  
  /**
   * Categoria de la cuenta personal
   * @returns String
   * @param code Código categoría cuenta personal (1 NIF / 2 CIF / 3 PASAPORTE / 4 PERMISO DE RESIDENCIA / 5 INTERNO )
   * @example 'Persona Física' / 'Persona Jurídica' / 'Cuenta Interna'
   */
  private descriptionCategoria(code:number):void {
    try {
      let controlCategory = this.formCuenta.get('category');
      let controldCategory = this.formCuenta.get('dCategory');
      this.formCuenta.controls['nif'].enable();
      this.formCuenta.controls['surname'].enable();
      this.formCuenta.controls['surname2'].enable();
      this.formCuenta.controls['sexo'].disable();
      
      if (code===1 || code===3 || code===4 ) {
        controlCategory.setValue('P');
        controldCategory.setValue('Persona física');
        this.labels.name[1]='Nombre';
        this.labels.surname = ['Apellido', 'Primer apellido'];
        this.labels.surname2 = ['Apellido', 'Segundo apellido'];
        this.labels.dateBirth = ['F. Nacimiento','F. Nacimiento'];
        this.formCuenta.controls['sexo'].enable();
        this.labels.sexo = ['Sexo','Sexo'];
      } 
      if (code===2) {
        controlCategory.setValue('J');
        controldCategory.setValue('Persona jurídica');
        this.labels.name[1]= 'Empresa'
        this.labels.surname[0] = 'Nombre';
        this.labels.surname[1] = 'Nombre comercial';
        this.formCuenta.controls['surname2'].disable();
        this.labels.surname2 = ['',''];
        this.labels.dateBirth = ['F. Constitución','F. Constitución']
        this.labels.sexo = ['',''];
        this.formCuenta.controls['sexo'].setValue('');
      }
      if (code===5) {
        controlCategory.setValue('I');
        controldCategory.setValue('Cuenta Interna');
        this.formCuenta.controls['nif'].setValue(this.formCuenta.controls['code'].value);
        this.formCuenta.controls['nif'].disable();
        this.formCuenta.controls['sexo'].setValue('');
        this.formCuenta.controls['surname'].disable();
        this.formCuenta.controls['surname2'].disable();
        this.labels.surname = ['Nombre',''];
        this.labels.surname2 = ['',''];
        this.labels.dateBirth = ['F. Inicio','F. Inicio']
        this.labels.sexo = ['',''];
      }

      this.nifInput.nativeElement.focus();

    } catch (error) {
       this._notification.error('Error', 'Existe un error en el formulario. Descripción de categoría');
       this.router.navigate(['/cuentas']);
    }
  }


  /**
   * Establecemos surname el valor de name sólo cuando el tipo de cuenta es Interna
   */
  public copyNameInterno():void{
    if (this.formCuenta.controls['category'].value==='I') {
      const name = this.formCuenta.controls['name'].value;
      this.formCuenta.controls['surname'].setValue(name);
    }
  }

  
  /**
   * Según el tipo de nif se procede a modificar los estados del formulario
   */
  public selectNif():void {
    
    const controlNif = this.formCuenta.get('typeNif');
  
    this.descriptionCategoria(controlNif.value)

  }


  onChange(result: Date): void {
  }

  public getCodeValid(e?:KeyboardEvent):void {

    this.errorForm.code[0]= '';
    let control = this.formCuenta.get('code');

    if(!control.value && e.code==='Enter') {
      this.getCode();
      control.disable();
      this.typeNifInput.focus();
      return;
    } 

    if (control.errors) {
      this.errorForm.code[0] = 'error';
      if (control.errors.required) {
        this.errorForm.code[1] = 'El campo es requerido. Debe ser un número entero';
        return;
      }
      if (control.errors.max) {
        this.errorForm.code[1] = 'El campo no puede ser superior a 99999';
        return;
      }
      if (control.errors.patern) {
        this.errorForm.code[1] = 'El campo debe contener número entero'
        return;
      }

    } 




  }

  /**
   * Creamos el formulario Reactive
   */
  public create(){

    this.formCuenta = this.fb.group({
      code:['',[Validators.required, Validators.max(99999), Validators.pattern("^[0-9]{1,5}")]],
      _id:[{value:'',disabled:true}],
      typeNif:[1],
      nif:['',Validators.required],
      category:[{value:'',disabled:true}],
      name:['',[Validators.required, Validators.pattern("[a-zA-Z0-9À-ÿñÑ\s]{3,25}")]],
      surname:['',[Validators.required, Validators.pattern("[a-zA-Z0-9À-ÿñÑ\s]{3,25}")]],
      surname2:[''],
      sexo:['F',Validators.required],
      dateBirth:['', Validators.required],
      dCategory:[{value:'', disabled:true}]
    })

  }


  public save() {
    //TODO: Comprobación sexo
    if(this.formCuenta.valid) {
      //Creamos el objeto
      this.cuenta._id = this.formCuenta.controls['_id'].value;
      this.cuenta.code = this.formCuenta.controls['code'].value;
      this.cuenta.category = this.formCuenta.controls['category'].value;
      this.cuenta.name = this.formCuenta.controls['name'].value;
      this.cuenta.surname = this.formCuenta.controls['surname'].value;
      this.cuenta.surname2 = this.formCuenta.controls['surname2'].value;
      this.cuenta.typeNif = this.formCuenta.controls['typeNif'].value;
      this.cuenta.nif = this.formCuenta.controls['nif'].value;
      this.cuenta.sex = this.formCuenta.controls['sexo'].value;
      this.cuenta.dateBirth = this.formCuenta.controls['dateBirth'].value;
      this.cuenta.locked = false;
      
      this._cuentaService.save(this.cuenta,this.cuenta._id).subscribe(
        (resp:any)=>{
          let cuenta:Cuenta = resp.data as Cuenta;
          this.cuenta._id = cuenta._id;

          setTimeout(() => {
            //Esperamos un segundo para mostrar los componente hijos dirección y telefono
            this.loadDatos = true;
          }, 1000);
          
          this._notification.success('Correcto','Registro modificado correctamente');
          
        },
        ()=>{
          this._notification.error('Error', 'Existe un error al crear o actualizar los datos');
        }
      )
   
    }

  }

  /**
   * Obtenemos el último código disponible
   */
  public getCode():void{
    let controlCode = this.formCuenta.get('code');
    this.errorForm.code[0] = '';

    //Obtenemos el último código disponible
    if (!controlCode.value) {
      this._cuentaService.getLastCode().subscribe(
        (resp:number)=>{
          controlCode.setValue(resp + 1);
        },
        ()=>{
          this._notification.error('Error','Existe un error al obtener el código de la cuenta')
        }
      )
    }


  }

  /**
   * Salir a consulta cuentas
   */
  public exit():void{
    this.router.navigate(['/cuentas']);
  }

  /**
   * Comprobamos el DNI/CIF/NIE
   */
  public checknif():void {

    let typeNif = this.formCuenta.controls['typeNif'].value;
    let inputNif= this.formCuenta.controls['nif'];
    inputNif.setErrors(null);
 
    this._appServices.TYPENIF.forEach(
      (item:TypeNif)=>{
        if (typeNif===item.code && item.valida) {
          if (typeNif===1 || typeNif===4) {
            console.log(inputNif.value)
            if (!this._nifValidate.validateDNI(inputNif.value)) inputNif.setErrors({'incorrect': true});
          } else {
            if (!this._nifValidate.isValidCif(inputNif.value)) inputNif.setErrors({'incorrect': true});
          }
        }
      }
    )
  }

  /**
   * Eliminamos las suscripciones
   */
  ngOnDestroy(): void {

    try {
    } catch (error) {
      this._notification.error("Errore", "Existe un error en la eliminación de las suscripciones");
    }
  }


}
