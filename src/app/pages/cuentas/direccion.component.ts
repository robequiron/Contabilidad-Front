import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Vias } from 'src/app/models/vias.model';
import { ViasService } from 'src/app/services/parametros/vias.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectComponent } from 'ng-zorro-antd/select/select.component';
import { padStart } from 'ng-zorro-antd/core/util';
import { PostalService } from 'src/app/services/postal.service';
import { Postal } from 'src/app/models/postal.model';
import { Respuesta } from 'src/app/models/response.model';
import { Workplace } from 'src/app/models/workplace.model';
import { WorkplacesService } from 'src/app/services/workplaces.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  
  /**
   * Decorador de propiedades. Datos recibido del padre. Identificar cuenta personal
   */
  @Input() _idCuenta:string;

  /**
   * Decorador de propiedades. Datos recibidos del padre. Identificador del centro de trabajo.
   */
  @Input() _idworkplace:string;

  /**
   * Centro de trabajo
   */
  public workplace:Workplace;

  /**
   * Formulario dirección
   */
  public formDireccion:FormGroup;

  /**
   * Array tipos de vias
   */
  public vias:Vias[];

  /**
   * Misibilidad del modal
   */
  public vModal:boolean=false;

  /**
   * Array codigo postales
   */
  public postales:Postal[]=[];
  


  constructor(
    public _vias:ViasService, 
    public _postal:PostalService,
    public _workplace:WorkplacesService,
    public fb:FormBuilder) { }

  ngOnInit(): void {
    this.vias = this._vias.vias;
    this.create();
    setTimeout(() => {
      this.loadWorkplace(this._idCuenta);
    }, 800);
  }

  /**
   * Creamos el formulario
   */
  public create(){
    this.formDireccion = this.fb.group({
      _idVia:['',[Validators.required]],
      nameVia:['',[Validators.required]],
      number:[''],
      flat:[''],
      door:[''],
      postal:['',[Validators.max(99999),Validators.required]],
      provincia:[{value:'',disabled:true}],
      town:[''],
      other:[''],
    })
  }

   /**
   * Leemos los datos del centro de trabajo por defecto
   */
    public loadWorkplace(id:string) {

      this._workplace.getWorkplaceHeadquarters(id).subscribe(
        (resp:Respuesta)=>{
          if (resp.ok) {
            this.workplace = resp.data[0] as Workplace;
            console.log(this.workplace)
          }
        }
      )
    }


  public save(){}

  /**
   * Obtenemos los datos de provincia y población según el código postal suministrado
   * 
   * @param code Código postal
   */
  public loadPostal(code:number) {
    
    let provincia =this.formDireccion.get('provincia');
    let town =this.formDireccion.get('town');
  

    this._postal.getPostal(code).subscribe( (resp:Respuesta)=>{
        if (resp.ok) {
          if (resp.data.length===1) {
            let postal:Postal = resp.data[0] as Postal;
            provincia.setValue(postal.provincia);
            town.setValue(postal.poblacion)
          }
          if (resp.data.length>1) {
            this.postales = resp.data;
            this.vModal = true;
          }
        }
    });

  }


  /**
   * Validamos los campos del formulario
   */
  public validate() {
    let _idVia:AbstractControl= this.formDireccion.controls['_idVia'];
    let nameVia:AbstractControl= this.formDireccion.controls['nameVia'];
    let postal:AbstractControl= this.formDireccion.controls['postal'];
    
   

    if(_idVia.touched && !_idVia.valid) {
      _idVia.setErrors({'incorrect':true});
    }

    if(nameVia.touched && !nameVia.valid) {
      nameVia.setErrors({'incorrect': true});
    } 
    if(postal.touched && !postal.valid) {
      postal.setErrors({'incorrect':true});
    }
    if(postal.valid) {
      if(postal.value>52999 || postal.value<1000) {
        postal.setErrors({'incorrect':true});
      } else {
        this.loadPostal(postal.value);
      }
      
    } 


    
  }

  /**
   * Cerramos la ventana modal códigos postales
   */
  public closeModal() {
    this.vModal = false;
  }

  public selectPostal(postal:Postal) {
    let provincia =this.formDireccion.get('provincia');
    let town =this.formDireccion.get('town');
    provincia.setValue(postal.provincia);
    town.setValue(postal.poblacion);
    this.vModal = false;
  }

}
