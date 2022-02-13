import { Component, OnInit } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { LoginService } from 'src/app/services/login.service';
import { SideService } from 'src/app/services/side.service';
/**
 * Componente para la gestión del menu sidebar
 */

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {

  /**
   * Variable si se a cargado los datos para mostrar el formularo
   */
  public load = false;

  /**
   * Formulario está colapsado
   */
  public isCollapsed = true;

  /**
   * Constructor
   * 
   * @param _sidebar Servicios menu sidebar
   * @param _user Servicios de usuario y login
   */
  constructor(public _sidebar:SideService, public _user:LoginService) { }

  /**
   * Ciclo de vida Lifecyle hooks. Inicialización de ciclo de vida.
   */
  ngOnInit(): void {
    setTimeout(()=>{
      this.load = true;
    },1000);
    
  }

  public v(event:NzMenuItemDirective) {
    console.log(event)
  }

}
