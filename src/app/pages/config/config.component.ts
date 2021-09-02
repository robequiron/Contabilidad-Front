import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public config:Config

  constructor(private fb:FormBuilder, private router:Router,
    private _config:ConfigService,
    public _appServices: AppService,
    private _nifValidate: NifService,
    private _notification:NzNotificationService
    ) { }
  
  
  ngOnDestroy(): void {
    if (this.$config) { this.$config.unsubscribe()};
  }

  ngOnInit(): void {
    this.load();
    this.createFormGeneral()
  }


  public load() {
    this.$config = this._config.getConfig().subscribe(
      (config:Config)=>{ 
        this.formGeneral.setValue({
          _id: config._id,
          name : config.name,
          codeNif: config.codeNif,
          nif: config.nif
        })

      }
    )
  }

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

  public save(){
    this.checknif();
    
    if (this.formGeneral.valid) {

      this._config.save(this.formGeneral.value, this.formGeneral.controls['_id'].value).subscribe(
        (resp:any)=>{
          console.log(resp);
          this._notification.success('Modificado','Modificado la configuración correctamente');
        },
        (e)=>{
          console.log(e)
          this._notification.error('Error', 'Existe un error al modificar la configuración')
        }
      )
     

    }


  }

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
