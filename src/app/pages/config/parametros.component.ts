import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Config } from 'src/app/models/config.model';
import { ConfigService } from 'src/app/services/config.service';
/**
 * Formulario parámetros generales
 */
@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  /**
   * Decorador de propiedades. Datos recibidos de padres. Objecto config
   */
  @Input() c:Config;

  /**
   * Objeto configuración
   */
  public config:Config = new Config();
 
   /**
   * Constructor
   * 
   * @param _config Servicios configuración - Consulta configuración general Modificar configuración general
   * @param _notification Servicio de notificación de ngZorro
   */
  constructor(
    private _config:ConfigService,
    private _notification: NzNotificationService
  ) { }

  /**
  * Ciclo de vida del componenete. Lifecycle hooks
  */
  ngOnInit(): void {
   setTimeout(() => {
      this.config = this.c;
   }, 800);
  }

  /**
   * Grabamos el formulario
   */
  public save() {

      this._config.save(this.config,this.config._id).subscribe(
        (resp:any)=>{
          this._config.config = resp;
          this._notification.success('Modificado','Modificado la configuración correctamente');
        }
      )

  }


}
