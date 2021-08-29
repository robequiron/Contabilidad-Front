import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';
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
    private _config:ConfigService

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
          name : config.name
        })

      }
    )
  }

  public createFormGeneral():void{

      this.formGeneral = this.fb.group({
        _id: [''],
        name:['', Validators.required]
      })
      console.log(this.formGeneral)

      this.formGeneral.controls['_id'].disable();

      this.formGeneral.getRawValue();
  }

  public save(){}



}
