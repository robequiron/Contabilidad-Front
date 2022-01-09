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
import { Adress } from 'src/app/models/adress.model';
import { AdressService } from 'src/app/services/adress.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
   * Dirección
   */
  public adress:Adress = new Adress();

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
    private _adress:AdressService,
    private _message: NzMessageService,
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
      postal:['',[Validators.max(99999),Validators.min(1000),Validators.required]],
      provincia:[{value:'',disabled:true}],
      town:['',[Validators.required]],
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
            this._adress.getbyId(this.workplace._id).subscribe(
              (resp:Respuesta)=>{
                if (resp.data) {
                  this.adress = resp.data as Adress;
                  this.loadPostal(this.adress.postal,true);
                  this.formDireccion.setValue({
                    _idVia:this.adress._idVia,
                    nameVia:this.adress.nameVia,
                    number:this.adress.number,
                    flat:this.adress.flat,
                    door:this.adress.door,
                    postal:this.adress.postal,
                    provincia:'',
                    town:this.adress.town,
                    other: this.adress.other || ''
                  })
                }

              }
            )
          }
        }
      )
    }

  /**
   * Grabamos o modificamos la dirección
   */
  public save(){
    
    if (this.formDireccion.valid) {

      this.adress._idCuenta = this.workplace._idCuenta ;
      this.adress._idWorkplace = this.workplace._id;
      this.adress._idVia = this.formDireccion.controls['_idVia'].value;
      this.adress.nameVia = this.formDireccion.controls['nameVia'].value;
      this.adress.number = this.formDireccion.controls['number'].value;
      this.adress.flat = this.formDireccion.controls['flat'].value;
      this.adress.door = this.formDireccion.controls['door'].value;
      this.adress.postal = this.formDireccion.controls['postal'].value;
      this.adress.town = this.formDireccion.controls['town'].value;
      this.adress.other = this.formDireccion.controls['other'].value;
      this._message.success("Dirección grabada correctamente",{nzDuration:800});
      
      this._adress.save(this.adress).subscribe((resp:Respuesta)=>{
        if(resp.ok) {
          let adress = resp.data as Adress
          this.adress._id = adress._id;
        }
      })

    }
  }

  /**
   * Obtenemos los datos de provincia y población según el código postal suministrado
   * 
   * @param code Código postal
   * @param load Lectura de la base de datos, 
   */
  public loadPostal(code:number,load?:boolean) {
    
    let provincia:AbstractControl =this.formDireccion.get('provincia');
    let town:AbstractControl =this.formDireccion.get('town');
    let postal:AbstractControl = this.formDireccion.controls['postal']
  

    this._postal.getPostal(code).subscribe( (resp:Respuesta)=>{
        if (resp.ok) {
          if (resp.data.length===1) {
            let postal:Postal = resp.data[0] as Postal;
            provincia.setValue(postal.provincia);
            town.setValue(postal.poblacion)
          }
          if (resp.data.length>1 && !load) {
            this.postales = resp.data;
            this.vModal = true;
          }
          if (load) {
            let postal:Postal = resp.data[0] as Postal;
            provincia.setValue(postal.provincia);
          }
          if(resp.data.length===0){
            provincia.setValue('');
            town.setValue('');
            postal.setErrors({'incorrect': true});
          }
        }
    });

  }

  /**
   * Validamos los campos del formulario
   */
  public validate(c?:string) {
    let _idVia:AbstractControl= this.formDireccion.controls['_idVia'];
    let nameVia:AbstractControl= this.formDireccion.controls['nameVia'];
    let postal:AbstractControl= this.formDireccion.controls['postal'];
    let town:AbstractControl = this.formDireccion.controls['town'];
    let provincia:AbstractControl =this.formDireccion.get('provincia');
    


    if(_idVia.touched && !_idVia.valid) {
      _idVia.setErrors({'incorrect':true});
    }

    if(nameVia.touched && !nameVia.valid) {
      nameVia.setErrors({'incorrect': true});
    } 
    if (_idVia.valid && nameVia.valid && town.valid && !c) {
      this.save();
      return;
    }
    if(postal.touched && !postal.valid) {
      postal.setErrors({'incorrect':true});
      provincia.setValue('');
      town.setValue('');
    }
    if(postal.touched && postal.valid) {
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
  /**
   * Selecciona la población del listado
   */
  public selectPostal(postal:Postal) {
    let provincia =this.formDireccion.get('provincia');
    let town =this.formDireccion.get('town');
    provincia.setValue(postal.provincia);
    town.setValue(postal.poblacion);
    this.vModal = false;
  }

}
