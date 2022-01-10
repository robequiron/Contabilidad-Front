import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/models/config.model';
import { TypeNif } from 'src/app/models/typenif.model';
import { AppService } from 'src/app/services/app.service';
import { ConfigService } from 'src/app/services/config.service';
import { NifService } from 'src/app/services/nif.service';
/**
 * Formulario configuración general
 */
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnDestroy{

  /**
   * Formulario general
   */
  public formGeneral: FormGroup;

  /**
   * Suscripción $config
   */
  private $config:Subscription;

  /**
   * Modelo config
   */
  public config:Config;

  /**
   * Constructor
   * 
   * @param fb Clases abstracta para la creación y configuracion del formulario
   * @param _config Servicios configuración - Consulta configuración general Modificar configuración general
   * @param _appServices Servicios app de datos no modificables y necesarios para el funcionamiento de la aplicación.
   * @param _nifValidate Servicio validación del Nif
   * @param _notification Servicio de notificación de ngZorro
   */
  constructor(private fb:FormBuilder, 
    private _config:ConfigService,
    public _appServices: AppService,
    private _nifValidate: NifService,
    private _notification:NzNotificationService
    ) { }
  
  
  /**
   * Ciclo de vida deel componente. Lifecycle hooks. Limpieza de recursos.
   */  
  ngOnDestroy(): void {
    if (this.$config) { this.$config.unsubscribe()};
  }

  /**
   * Ciclo de vida del componente. Lifecycle hooks.
   */
  ngOnInit(): void {
    this.load();
    this.createFormGeneral()
  }

  /**
   * Leemos los datos de configuración de la base de datos.
   */
  public load() {
    this.$config = this._config.getConfig().subscribe(
      (config:Config)=>{ 
        this.config = config;
        this.formGeneral.setValue({
          _id: config._id,
          name : config.name,
          codeNif: config.codeNif,
          nif: config.nif
        })
      }
    )
  }

  /**
   * Creamos el formulario reactive
   */
  public createFormGeneral():void{

      this.formGeneral = this.fb.group({
        _id: [''],
        name:['', Validators.required],
        codeNif:['', Validators.required],
        nif: ['', Validators.required]
      })
      console.log(this.formGeneral)

      this.formGeneral.controls['_id'].disable();

      this.formGeneral.getRawValue();
  }

  /**
   * Grabamos la configuración
   */
  public save(){
    this.checknif();
    
    if (this.formGeneral.valid) {

      this._config.save(this.formGeneral.value, this.formGeneral.controls['_id'].value).subscribe(
        (resp:any)=>{
          this._config.config = resp;
          this._notification.success('Modificado','Modificado la configuración correctamente');
        },
        (e)=>{
          this._notification.error('Error', 'Existe un error al modificar la configuración')
        }
      )
    }
  }

  /**
   * Comprobamos que el nif sea correcto
   */
  public checknif() {
    let typeNif = this.formGeneral.controls['codeNif'].value;
    let inputNif= this.formGeneral.controls['nif'];
    inputNif.setErrors(null);
 
    this._appServices.TYPENIF.forEach(
      (item:TypeNif)=>{
        
        if (typeNif===item.code && item.valida) {
          if (typeNif===1 || typeNif===4) {
            if (!this._nifValidate.validateDNI(inputNif.value)) inputNif.setErrors({'incorrect': true});
          } else {
            if (!this._nifValidate.isValidCif(inputNif.value)) inputNif.setErrors({'incorrect': true});
          }
        }

      }

    )
  }

}
