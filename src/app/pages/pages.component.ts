import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeNif } from '../models/typenif.model';
import { AppService } from '../services/app.service';
import { SideService } from '../services/side.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public title = 'ngzorro';

  public isCollapsed = false;

  public isLoad:boolean = false;

  public Load:boolean= false;
  /**
   * 
   * @param _side Servicios de configuración del sidebar
   */
  constructor(public _side:SideService,
      private _app:AppService,
      private _notification:NzNotificationService,
      private router:Router,
    ){}



  ngOnInit(): void {
    this.isLoad = true;
    this.loadTypeNif();
  }

  /**
   * Cargamos los tipos de NIF
   */
  private loadTypeNif() {
    this._app.loadTypeNif().subscribe(
      (resp:TypeNif[])=>{
        this._app.TYPENIF = resp;
        setTimeout(()=>{
          this.isLoad = false;
          this.Load = true;
        },1000)
      }, 
      (e)=>{
        this._notification.error('Error', 'Existe un error en la carga de Tipos de Nif');
        this.router.navigate(['/login']);
      }
    )
  }

}
