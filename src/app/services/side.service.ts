import { Injectable } from '@angular/core';
/**
 * Inyect service sidebar
 */
@Injectable({
  providedIn: 'root'
})
export class SideService {
  
  
  //TODO: Guardar configuración del menu sidebar en la base de datos
  /**
   * Color del menu 
   * Valor light | dark 
   */
  public theme:string = 'dark'; 

  /**
   * Ancho del menu Mínimo 200 máximo 300
   */
  public width:number = 200;

  /**
   * Sangrar px del elemento del menú en línea en cada nivel. Valor por defecto 24
   */
  public inlineIndent: 20;
  
  /**
   * Menu sidebar
   * rol : SUPER_ROLE, ADMIN_ROLE, USER_ROLE
   */
  public menuSidebar = [
    {title:"Configuración",icon:"user",open:false, disabled:false, rol:"ADMIN_ROLE",
      items:[
        {title:'General',path:'config' , disabled:false, rol:"ADMIN_ROLE",},
        {title:'Usuarios',path:'users' , disabled:false, rol:"USER_ROLE",},
        {title:'Parametros', rol:"USER_ROLE",
        itemsSubmenu: [
          {title:'Impuestos',path:'taxes'},
        ]}
      ]
    },
    {title:"Contabilidad",icon:"team",open:false, disabled:false, rol:"USER_ROLE",
    items:[
      {title:'Bill',path:'/pages' , disabled:false, rol:"USER_ROLE",},
      {title:'Tony',path:'login' , disabled:false, rol:"USER_ROLE",},
      {title:'Submenu', rol:"USER_ROLE",
        itemsSubmenu: [
          {title:'Bill',path:'/pages'},
          {title:'Tony',path:'login'}
        ]}
    ]
    },
    {title:"File",icon:"file",path:"login", rol:"USER_ROLE",}
  ]
  constructor() { }

  
  


}
