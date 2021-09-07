import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
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
   * Decorador de propiedades. Datos recibidos del padres. Objecto tax
   */
  @Input() tax:Taxes;



  /**
   * Decorador obtención de las propiedades de la directiva inputName
   */
  @ViewChild('iName', {static:false}) iName: ElementRef;

  /**
   * Decorador obtención de las propiedades de la directiva iPercentage
   */
  @ViewChild('iPercentage', {static:false}) iPercentage: ElementRef;

  /**
   * Propiedad editCache
   */
  editCache: { [key: number]: { edit: boolean; data: Percentage; validate:boolean; n:boolean } } = [];

  /**
   * Lista de datos
   */
  listOfData: Percentage[] = [];

 

  /**
   * Errores campos input
   */
  public error = {
    name:'',
    dateInit:'',
    dateEnd:'',
    percentage: ['','']
  }
  
  /**
   * Constructor
   * 
   * @param _taxesServices Servicios Taxes - Impuesto
   * @param _notification Servicio de ngZorro para mostrar mensaje de forma global
   * @param router Servicio que proporciona navegación entre vista y capacidades de manipulación de la url
   */
  constructor(public _taxesServices:TaxesService, private _notification:NzNotificationService, private router:Router,
    
    ) {}

  /**
   * Directiva ciclo de vida del component - Primera ejecución (Lifecycle hooks)
   */
  ngOnInit(): void {
    console.log(this.tax._id)
      this.load();
      this.updateEditCache();
  }

  /**
   * Leer y recorrer array con los tipos de porcentajes
   */
  public load(){
    
    this.tax.percentages.forEach((item:Percentage)=>{
      item.dateInit = new Date(item.dateInit);
      if (item.dateEnd) {
        item.dateEnd = new Date(item.dateEnd);
      }
    })
    this.listOfData = this.tax.percentages;
  }


  public add(){

    if (!this.editCache[-1]) {


      let percentage = new Percentage();
      percentage._id="";
      percentage.name = "";
      percentage.percentage = -1;
      percentage.dateInit = new Date();
      percentage.dateEnd = null;
      
      this.listOfData = [
        {
          ...percentage
        },
        ...this.listOfData
      ];
      this.updateEditCache();
  
      this.editCache[-1].edit = true;
      this.editCache[-1].n = true;
      
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
  }
   
  public changeDecimal(e:KeyboardEvent,id:string) {
    this.editCache[id].data.percentage =  parseFloat(this.editCache[id].data.percentage).toFixed(2)
    console.log(this.editCache[id].data.percentage)
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

  onChange(result: Date): void {
    console.log('onChange: ', result);
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
    
    if(this.editCache[id]) {
      this.editCache[id].edit = false;
    } else {
      this.editCache[-1].edit = false;
      this.editCache[-1].n = false;
    }
    
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

      //Si el campo es nombre y el patron es falso
      if(n.name==="name" && !patron.test(n.value)) {
        this.error.name = 'error';
        this.editCache[id].validate = false;
      }
      //Si la fecha de inicio es nula
      if (n.name==="dateInit" && n.value===null) {
        this.error.dateInit = 'error';
        this.editCache[id].validate = false;
      } 
      //Si la fecha de inicio es distinta a nula
      if (n.name==="dateInit" && n.value!=null) {
        this.error.dateInit = ''
      } 
      //Si la fecha de fin es nula
      if (n.name==="dateEnd" && n.value===null) {
        this.error.dateEnd = '';
      } 
      //Si la fecha de fin no es nula
      if (n.name==="dateEnd" && n.value!=null) {
        let dateInit= this.editCache[id].data.dateInit;
        let dateEnd = n.value;
        this.error.dateEnd = '';
        //Compramos que la fecha de fin no sea inferior a la fecha de inicio
        if(dateEnd<dateInit) {
          this.error.dateEnd = 'error';
          this.editCache[id].validate = false;
        } 
      }

      this.error.percentage[0] = '';
      this.error.percentage[1] = '';
      
      //Si el pocentaje es nulo
      if (n.name==="percentage" && n.value===null) {
        this.error.percentage[0] = 'error';
        this.error.percentage[1] = 'No puede ser nulo';
        this.editCache[id].validate = false;
      }

      if (n.name==="percentage" && n.value!=null) {
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
    
    this.listOfData.forEach(item => {
      this.editCache[item.percentage] = {
        edit: false,
        data: { ...item },
        validate: true,
        n:false
      };
    }); 

  }

  public delete(id:number) {
    const index = this.listOfData.findIndex(item => item.percentage === id);

    
  }


}
