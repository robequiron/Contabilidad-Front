import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Respuesta } from '../models/response.model';
import { TypeNif } from '../models/typenif.model';
import { Vias } from '../models/vias.model';
import { AppService } from '../services/app.service';
import { PostalService } from '../services/parametros/postal.service';
import { ViasService } from '../services/parametros/vias.service';
import { SideService } from '../services/side.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  /**
   * Titulo
   */
  public title = 'Harena Fuerteventura';
  /**
   * Sidebar recogido
   */
  public isCollapsed = false;
  /**
   * Variable que muestra la carga
   */
  public isLoad:boolean = false;
  /**
   * Varible que muestra pages
   */
  public Load:boolean= false;
  /**
   * Constructor
   * @param _side Servicios de configuración del sidebar
   * @param _app Servicios app de datos no modificables y necesarios para el funcionamiento de la aplicación.
   * @param _notification Servicio de notificación de ngZorro
   * @param router Servicio de Angular Routere, que permite la navegación de una vista a la siguiente.
   */
  constructor(public _side:SideService,
      private _app:AppService,
      private _notification:NzNotificationService,
      private _vias:ViasService,
      private _postal:PostalService,
      private router:Router,
    ){}


  /**
   * Directiva ciclo de vida del componente - Primera ejecución (Lifecycle hooks)
   */
  ngOnInit(): void {
    this.isLoad = true;
    this.loadTypeNif();
    this.loadVias();
    this.loadPostal();
    setTimeout(()=>{
      this.isLoad = false;
      this.Load = true;
    },2000)
  }

  /**
   * Cargamos los tipos de NIF
   */
  private loadTypeNif() {
    this._app.loadTypeNif().subscribe(
      (resp:TypeNif[])=>{
        this._app.TYPENIF = resp;
        setTimeout(()=>{
          this.Load = true;
        },1000)
      }, 
      (e)=>{
        this._notification.error('Error', 'Existe un error en la carga de Tipos de Nif');
        this.router.navigate(['/login']);
      }
    )
  }
  /**
   * Cargamos las vias
   */
  private loadVias() {
    this._vias.getVias().subscribe(
      (resp:Respuesta)=>{
        this._vias.vias = resp.data as Vias[];
      },
      (e)=>{
        this._notification.error('Error', 'Existe un error en la carga de las vías');
        this.router.navigate(['/login']);
      }
    )
  }

  /**
  * Cargamos parte de los códigos postales
  */
 private loadPostal() {
  this._postal.getPostal().subscribe(
    ()=>{},
    (e)=>{
      this._notification.error('Error', 'Existe un error en la carga de los códigos postales');
      this.router.navigate(['/login']);
    }
  )
 }

}
