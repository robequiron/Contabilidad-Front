import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Percentage } from 'src/app/models/percentage.model';
import { Taxes } from 'src/app/models/taxes.model';
import { TaxesService } from 'src/app/services/taxes.service';

/**
 * Componente con datagrid de los tipos impositivos de un impuesto. 
 * Formulario en la tabla que permite Añadir, Modificar y Eliminar (Si no existen registros en la tabla Taxbook)
 */
@Component({
  selector: 'app-percentages',
  templateUrl: './percentages.component.html',
  styleUrls: ['./percentages.component.css']
})
export class PercentagesComponent implements OnInit {
  /**
   * Decorador de propiedades. Datos recibidos de padres. Objecto tax
   */
  @Input() tax:Taxes;

  /**
   * Indice del tab seleccionado, para lo métodos no entren en conflicto
   */
  @Input () tabSelect:number;

  /**
   * Decorador obtención de las propiedades de la directiva inputName
   */
  @ViewChild('iName', {static:false}) iName: ElementRef;

  /**
   * Decorador obtención de las propiedades de la directiva iNameSearch
   */
  @ViewChild('iNameSearch', {static:false}) iNameSearch : ElementRef;

  /**
   * Decorador obtención de las propiedades de la directiva iPercentage
   */
  @ViewChild('iPercentage', {static:false}) iPercentage: ElementRef;

  /**
   * Decorador obtención de las propiedades de la directiva iDateInit
   */
  @ViewChild('iDateInit', {static:false}) iDateInit: NzDatePickerComponent;

  /**
   * Decorador obtención de las propiedades de la directiva iDateEnd
   */
  @ViewChild('iDateEnd', {static:false}) iDateEnd:NzDatePickerComponent;

  /**
  * Busqueda por nombre
  */
  public nameSearch:string="";

   /** 
  * Visualizar dropmenu del search name 
  */
  public vSearchName:boolean=false;

  /**
   * Propiedad editCache
   */
  public editCache: { [key: number]: { edit: boolean; data: Percentage; validate:boolean; n:boolean } } = [];

  /**
   * Lista de datos
   */
  public listOfData: Percentage[] = [];

  /**
   * Errores campos input
   * @example error[0] = 'error'
   */
  public error = {
    name:['',''],
    dateInit:['',''],
    dateEnd:['',''],
    percentage: ['',''],
  }
  
  /**
   * Constructor
   * 
   * @param _taxesServices Servicios Taxes - Impuesto
   * @param _notification Servicio de ngZorro para mostrar mensaje de forma global
   * @param _message Servicio de ngZorro para mostrar notificaciones de forma global
   * @param router Servicio de Angular Router, que permite la navegación de una vista a la siguiente
   */
  constructor(public _taxesServices:TaxesService, 
    private _notification:NzNotificationService, 
    private _message: NzMessageService,
    private router:Router) {}

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
    
    //Si pulsamos alt+b mostramos la ventana busqueda por nombre
    if(e.altKey && e.code==="KeyB" && this.tabSelect===1) {
      this.vSearchName = !this.vSearchName
      setTimeout(() => {
        this.iNameSearch.nativeElement.focus();
      }, 300);  
    }
    
    //Si pulsamo la tecka alt + i  insertamos un nuevo registros
    if(e.altKey && e.code==="KeyI" && this.tabSelect===1) {
      setTimeout(() => {
        this.add(); 
      }, 300);
    }

    //Editar registro buscado con anterioridad
    if (e.altKey && e.shiftKey && e.code==="KeyE" && this.tabSelect===1) {
      if (this.listOfData.length===1) {
        this.startEdit(this.listOfData[0].percentage.toString());
      } else {
        this._message.warning('Sólo se puede editar un registro encontrado')
      }
    }
      
  }

  /**
   * Leer y recorrer array con los tipos de porcentajes
   */
  public load():void{
    this.tax.percentages.forEach((item:Percentage)=>{
      item.dateInit = new Date(item.dateInit);
      if (item.dateEnd) {
        item.dateEnd = new Date(item.dateEnd);
      }
    })
    this.listOfData = this.tax.percentages;
  }

  /**
   * Añadimos un tipo de porcentaje nuevo
   */
  public add():void{

    //Si no existe
    if (!this.editCache[-101]) {

      let percentage = new Percentage();
      percentage._id="";
      percentage.name = "";
      percentage.percentage = -101;
      percentage.dateInit = new Date();
      percentage.dateEnd = null;
      
      this.listOfData = [
        {
          ...percentage
        },
        ...this.listOfData
      ];
      this.updateEditCache();
  
      this.editCache[-101].edit = true;
      this.editCache[-101].n = true;
      
      
      //Esperamos 2 milisegundo para obtener el foco en el nombre
      setTimeout(() => {
        this.iName.nativeElement.focus();
      }, 200);

    }

  }

  /**
   * Iniciar edicion de la fila
   * 
   * @param id Identificador de la fila
   */
  public startEdit(id: string): void {
    this.editCache[id].edit = true;
    setTimeout(() => {
      this.iName.nativeElement.focus()
    }, 300);
    
  }

  /**
   * Cancelar edición de la fila
   * 
   * @param id Idenfiticador de la fila
   */
  public cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.percentage=== id);
    
    this.load();
    this.updateEditCache();    

    this.editCache[id] = {
      edit: false,
      data: { ...this.listOfData[index] },
      validate:true,
      n:false
    };

  }

  /**
   * Busqueda de tipo de impuesto por porcentaje
   */
  public search():void{
    this.load()
    this.listOfData = this.listOfData.filter( (item:Percentage)=>{
      return item.name.toLocaleUpperCase().includes(this.nameSearch.toLocaleUpperCase());
    })
    this.updateEditCache();
  }
 
  /**
   * Acciones a realizar con eventos de teclado en los inputs
   * 
   * @param n Campo
   * @param id Identificador de la linea
   */
  public saveEnter(n:NgModel,id?:number):void {

    switch(n.name) {
      case 'name' : {
        if (this.iPercentage.nativeElement.disabled) {
          this.iDateInit.picker.focus();
        } else {
          this.iPercentage.nativeElement.focus();
        }

        break;
      }
      case 'percentage': {
        this.iDateInit.picker.focus();
        break;
      }
      case 'dateInit': {
        this.iDateEnd.picker.focus();
        break;
      }
      case 'dateEnd': {
       if (this.editCache[id].validate) {
         this.iName.nativeElement.focus();
       } else {
         this.saveEdit(id);
       }
       break;
      }

    }

    
  }

  /**
   * Grabamos los datos en el array tipo de porcentajes . Percentages
   * 
   * @param id Indice en el array
   */
  public saveEdit(id: number): void {
    
    //Obtención de indice en el array
    const index = this.listOfData.findIndex(item => item.percentage === id);
     
    Object.assign(this.listOfData[index], this.editCache[id].data);

    //Quitamos el filtro de busqueda antes de grabar
    this.nameSearch ='';
    this.search();

    //Establecemos un tiempo para restaurar la lista de datos

      this.tax.percentages = this.listOfData;
  
      //Grabamos los datos
      this._taxesServices.save(this.tax, this.tax._id).subscribe(
        (resp:any)=>{
          this._notification.info('Tipo impositivo', "Tipo impositivo actualizado correctamente")
        },
        ()=>{
          this._notification.error('Error', 'Existe un error al actualizar los tipos impositivos')
        }
      )
      this.load();
      this.updateEditCache();

    
    
  }

  /**
  * Validación de los campos del formulario
  * 
  * @param n Directiva de atributo binding - Campos del formulario
  * @param id Indice del array
  */
  public validate(n:NgModel,id:string) {
    
    try {
      //Establece null la validación inicial de la fila
      this.editCache[id].validate = null;
      
      
      //Creamos un patron para el campo nombre
      let patron = new RegExp("[a-zA-Z0-9]{3}")
      
      switch (n.name) {

        
        case 'name': {
          if (!patron.test(n.value)) {
            this.error.name[0] = 'error';
            this.editCache[id].validate = false;
          } else {
            this.error.name[0] = '';
          }
          break;
        }

        case 'percentage': {
          this.error.percentage[1] = '';
         
          if (n.value===null) {
            this.error.percentage[0] = 'error';
            this.error.percentage[1] = 'No puede ser nulo';
            this.editCache[id].validate = false;
          } else {
              //Comprobamos que no sea superior ni inferior a 100
              if (n.value>100 || n.value<-100) {
                this.error.percentage[0] = 'error';
                this.error.percentage[1] = 'No puede ser superior a 100 ni inferior a -100';
                this.editCache[id].validate = false;
              }
              //Comprobamos que no exista ese porcentaje
              this.tax.percentages.forEach(
                (item:Percentage)=>{
                  if (item.percentage===n.value) {
                    this.error.percentage[0] = 'error';
                    this.error.percentage[1] = 'Ya existe este pocentaje';
                    this.editCache[id].validate = false;
                  }
                }
              )
          }
          break;
        }

        case 'dateInit': {
          if (n.value===null) {
            this.error.dateInit[0] = 'error';
            this.editCache[id].validate = false;
          } else {
            this.error.dateInit[0] = '';
          }
          break;
        }

        case 'dateEnd': {
          this.error.dateEnd[0] = '';
          if (n.value!=null) {
            let dateInit= this.editCache[id].data.dateInit;
            let dateEnd = n.value;
            //Compramos que la fecha de fin no sea inferior a la fecha de inicio
            if(dateEnd<dateInit) {
              this.error.dateEnd[0] = 'error';
              this.editCache[id].validate = false;
            } 
            
          }
          break;
        }
        
       

      }
     
      if (this.error.name[0]==='error' || this.error.percentage[0]==='error' 
      || this.error.dateEnd[0]==='error'
      || this.error.dateInit[0]==='error') {
        this.editCache[id].validate = false;
      }
      

    } catch (error) {
      this._notification.error('Error','Existe un error en la validación de datos.',{nzDuration:800});
      setTimeout(() => {
        this.router.navigate(['/taxes']);
      }, 1200);
    }

   
    
  }

  /**
   * Array con los datos a actualizar
   */
  public updateEditCache(): void {

    this.editCache = [];

    this.listOfData.forEach(item => {
      this.editCache[item.percentage] = {
        edit: false,
        data: { ...item },
        validate: true,
        n:false
      };
    }); 


  }

  /**
   * Eliminar tipo de impuesto, sino tiene registros en la colección taxBook
   * 
   * @param id Identificador
   */
  public delete(id:number) {
    const index = this.listOfData.findIndex(item => item.percentage === id);
    //TODO:Comprobación que no exista registros en la colección taxBook para su posterior eliminación
  }


}
