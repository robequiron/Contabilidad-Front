import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
/**
 * Formulario creación/modificación de usuarios
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  /**
   * Formulario usuario
   */
  public formUsuario:FormGroup;

  /**
   * Usuario
   */
  public usuario:Usuario = new Usuario(null,null,null);



  /**
   * Decorador obtención propiedades de la directiva nameInput
   */
  @ViewChild('nameInput', {static:false}) nameInput : ElementRef;


  /**
   * Constructor
   * 
   * @param _activedRouter Proporciona información sobre la ruta.
   * @param fb Clases abstracta para la creación y configuracion del formulario
   * @param _userService Servicios usuarios
   * @param _notificacion Servicios de ngZorro para mostrar mensaje de forma global
   */


  constructor(private activedRouter:ActivatedRoute, public fb:FormBuilder,
      private _userService:UsersService,
      private _notificacion:NzNotificationService,
      public _login:LoginService,
      private router:Router
    ) { 
      
      this.activedRouter.params.subscribe(
        (resp)=>{
          if (resp.id) {
            this.load(resp.id);
          }
        }
      )

  }
  /**
   * Ciclo de vida del componente. Lifecycle hooks
   * @ignore
   */
  ngOnInit(): void {
    this.createForm();
    setTimeout(() => {
      this.nameInput.nativeElement.focus();
    }, 800);
  }

  /**
   * Decorador de métodos. Escucha eventos emitidos por el host
   * 
   * @param e Keyboard event
   */
  @HostListener('window:keydown', ['$event']) onKeyDown(e:KeyboardEvent) {
    if (e.code==="Escape") {
      this.exit();
    }
    if (e.code==="Enter") {
      if (this.formUsuario.valid) {
        this.save();
      }
    }
  }

 
  /**
   * Cargamos los datos para motrar en el formulario
   * 
   * @param _id Identificador del usuario
   */
  public load(_id:string):void {
    this._userService.getUser(_id).subscribe(
      (user:Usuario)=>{
        this.formUsuario.setValue({
          _id: user._id,
          name: user.name,
          email: user.email,
          password:":)", 
          rol: user.rol
        });
        this.usuario = user;
        this.formUsuario.controls['password'].disable();
      },
      //Si existe un error volvemos a la vista de usuarios
      (e)=>{
        this._notificacion.error('Error', 'Error en el servidor. No se pueden cargar los datos.',{nzDuration:5000});
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 5200);
      }
    )
  }

  /**
   * Creación del formulario
   */
  public createForm():void{
    this.formUsuario = this.fb.group({
      _id: [''],
      name: ['', [Validators.required,Validators.minLength(3)]],
      email:['', [Validators.required,Validators.pattern('[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$')]],
      password: ['', Validators.required],
      rol: ['USER_ROLE']
    });
    this.formUsuario.controls['_id'].disable();
    this.formUsuario.getRawValue();
    
  }

  /**
   * Check duplicate email
   * 
   * Comprobamos que el email no este duplicado
   */
  public valida():void{
    if (this.formUsuario.controls['email'].value) {

      this._userService.checkEmail(this.formUsuario).subscribe(
        (resp:any)=>{
          if (resp) {
            this.formUsuario.controls['email'].setErrors({'incorrect': true})
          } else {
            this.formUsuario.controls['email'].setErrors(null)
          }
        },
        (e)=>{
          this.formUsuario.controls['email'].setErrors({'incorrect': true});
          this._notificacion.error('Error','Existe un error con la comprobación del email. '+
          'Consulte con el administrador. No es posible continuar')
        }
      )

    }
  }

  /**,
   * Grabar registro (Crear y modificar)
   */
  public save():void {
    //Comprobamos el email no este duplicado
    this.valida();

    if (this.formUsuario.valid) {
      this._userService.save(this.formUsuario.value, this.usuario._id).subscribe(
        (usuario:Usuario) =>{
          if (usuario._id && !this.usuario._id) {
            this._notificacion.info('Crear', 'Usuario creado correctamente');
          } else {
            this._notificacion.info('Modificar', 'Usuario modificado correctamente');
          }
          this.formUsuario.controls['_id'].setValue(usuario._id);
          this.usuario = usuario;
          
        },
        (e)=>{
          this._notificacion.error('Error', 'Existe un error en el servidor, no se ha podido grabar.')
        }
      )
    }
  }

  /**
   * Salimos del formulario
   */
  public exit():void {
    this.router.navigate(['/users']);
  }

}
