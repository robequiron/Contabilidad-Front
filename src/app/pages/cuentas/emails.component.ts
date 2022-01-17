import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Cuenta } from 'src/app/models/cuenta.model';
import Email from 'src/app/models/email.model';
import { CuentasService } from 'src/app/services/cuentas.service';
/**
 * Componente con datagrid de los emails de una cuenta personal. <br>
 * Formulario en la tabla que permiter Añadir, Modificar y Eliminar
 */
@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  /**
   * Decorador de propiedades. Datos recibido del padre. Identificar cuenta personal
   */
  @Input() cuenta:Cuenta;

  /**
   * Decorador de propiedades. Datos recibido del padre. Tab seleccionado
   */
  @Input() SelectedIndex:number;

  /**
   * Decorador obtención de las propiedades de la directiva inputEmail
   */
  @ViewChild('iEmail', {static:false}) iEmail:ElementRef; 

  /**
   * Lista de datos
   */
  public listOfData: Email[] = [];

  /**
   * Busqueda por email
   */
  public emailSearch:string="";

  /** 
  * Visualizar dropmenu del search name 
  */
  public vSearchEmail:boolean=false;

  /**
  * Propiedad editCache
  */
  public editCache: { [key: number]: { edit: boolean; data: Email; validate:boolean; n:boolean } } = [];

  /**
   * Array errores inputs
   */
  public error = {
    email:['',''],
    description:['','']
  }
  
  /**
   * Constructor
   * 
   * @param _notification Servicio de notificación de ngZorro
   * @param router Servicio de Angular Router, que permite la navegación de una vista a la siguiente
   * @param _cuenta Servicios de cuentas personales
   */
  constructor(
    private _notification:NzNotificationService,
    private router:Router,
    private _cuenta:CuentasService
  ) { }

    /**
    * Directiva ciclo de vida del component - Primera ejecución (Lifecycle hooks)
    */
    ngOnInit(): void {
      this.load();
      this.updateEditCache();
    }
    /**
     * Decorador de métodos. Escucha eventos emitidos por el host
     * 
     * @param e KeyboardEvent
    */
    @HostListener ('window:keydown', ['$event']) onKeyDown(e:KeyboardEvent) {
      //Si pulsamo la tecka alt + i  insertamos un nuevo registros
      if(e.altKey && e.code==="KeyI" && this.SelectedIndex===1) {
        this.add(); 
        setTimeout(() => {
          this.iEmail.nativeElement.focus();
        }, 300);
      }
    }

    /**
     * Metodo para la validación de los campos
     * 
     * @param n Input
     * @param id Identificador del email
     */
    public validate(n:NgModel, id:string, i?:string):void {
      
      try {
        //Establecemos null la validación inicial de la fila
        this.editCache[id].validate = null;

        //Creamos un patro para el campo email
        let patron = new RegExp("[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$");

        //Comprobamos los campos
        switch(n.name) {
            case 'email': {
              this.error.email[0]="";
              this.error.email[1]="";
              //Comprobamos que sea correcto el email
              if (!patron.test(n.value)) {
                this.error.email[0]='error';
                this.error.email[1]='El email no es correcto';
                this.editCache[id].validate = false;
              } else {
                this.listOfData.forEach( (item:Email)=>{
                  let j:String = n.value;
                  if(item.email.toLocaleUpperCase()===j.toLocaleUpperCase() && item._id!=i) {
                    this.error.email[0]='error';
                    this.error.email[1]="El email ya existe";
                    this.editCache[id].validate = false;
                  }
                })
              }

              break;
            }
        }


      } catch (error) {
        this._notification.error('Error','Existe un error en la validación de detos', {nzDuration:800});
        setTimeout(() => {
          this.router.navigate(['cuentas']);
        }, 1200);
      }
    }


    /**
     * Añadimos un correo nuevo
     */
    public add():void {
      if (!this.editCache['email']) {
        let email = new Email();
        email._id = "";
        email.email = "email";
        email.description ="";

        this.listOfData = [
          {
            ...email
          },
          ...this.listOfData
        ]
        this.updateEditCache();
        this.editCache['email'].edit=true;
        this.editCache['email'].n = true

      }
      
      
      
    }

    /**
     * Leemos los emails
     */
    public load():void{
      this.listOfData = this.cuenta.email;
    }

    /**
     * Método de busqueda
     */
    public search():void {
      this.load()
      this.listOfData = this.listOfData.filter( (item:Email)=>{
        return item.email.toLocaleUpperCase().includes(this.emailSearch.toLocaleUpperCase());
      })
      this.updateEditCache();
    }


  /**
   * Iniciar edicion de la fila
   * 
   * @param id Identificador de la fila
   */
    public startEdit(id: string): void {
      this.editCache[id].edit = true;
      this.error.email[0]="";
    }

    /**
     * Eliminar el registro
     * 
     * @param email Email a eliminar
     */
    public delete(email:string):void {
  
        //Copia lista en caso de error
        let listCopy = this.listOfData;

        //Filtramos una nueva lista con el email seleccionado
        this.listOfData= this.listOfData.filter(item =>item.email!==email);
        
        //Actualizamos las cuenta email
        this.cuenta.email = this.listOfData;
      

        //Grabamos los datos
        this._cuenta.save(this.cuenta, this.cuenta._id).subscribe(
          (resp:any)=>{
            this._notification.info("Email","Email eliminado correctamente");
            this.load();
            this.updateEditCache();
          },   
          ()=>{
            this._notification.error("Error", "Existe un error al actualizar el email");
            this.listOfData = listCopy;
            this.cuenta.email = listCopy;
          }
        );

    }


    /**
     * Modificación o grabación del email
     * 
     * @param id Email a modificar
     */
    public saveEdit(id:any):void{

      //Obtención de indice del array
      const index = this.listOfData.findIndex( item => item.email === id);

      Object.assign(this.listOfData[index], this.editCache[id].data);

      //Quitamos el filtro de busqueda antes de grabar
      this.cuenta.email = this.listOfData;

      //Grabamos los datos
      this._cuenta.save(this.cuenta, this.cuenta._id).subscribe(
        (resp:any)=>{
          this._notification.info("Email","Email actualizado correctamente");
        },   
        ()=>{
          this._notification.error("Error", "Existe un error al actualizar el email");
        }
      );
      this.load();
      this.updateEditCache();
    }

    /**
     * Cancelar edición de la fila
     * 
     * @param id Idenfiticador de la fila, email
     * @example cancelEdit(robequiron@gmail.com)
     */
    public cancelEdit(id:string):void{
      
      //Busco en la lista de datos el identificador para poder obtener el indice
      const index = this.listOfData.findIndex(item => item.email===id);

      this.load();
      this.updateEditCache();

      this.editCache[id] = {
        edit: false,
        data: { ...this.listOfData[index] },
        validate:true,
        n:false
      };

      this.editCache["email"] = undefined;
    }


    /**
     * Generados un array con los registros para editar posteriormente
     */
    public updateEditCache(): void {

      this.editCache = [];
      
      this.listOfData.forEach(item => {
        this.editCache[item.email] = {
          edit: false,
          data: { ...item },
          validate: true,
          n:false
        };
      });


    }

}
