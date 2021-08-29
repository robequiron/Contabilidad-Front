import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { UserslistService } from 'src/app/list/userslist.service';
import { Usuario } from 'src/app/models/usuario.model';
import { TablesgridService } from 'src/app/services/tablesgrid.service';
import { UsersService } from 'src/app/services/users.service';
/**
 * Componente donde se muestra los usuarios de la aplicación a través de datagrid
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  /**
   * Decorador obtención de las propiedades de la directiva iNameSearch
   */
  @ViewChild('iNameSearch', {static:false}) iNameSearch : ElementRef;
  /**
   * Decorador obtención de las propiedades de la directiva iEmailSearch
   */
  @ViewChild('iEmailSearch', {static:false}) iEmailSearch : ElementRef;

  /**
   * Suscripción listado users
   */
  public $userList:Subscription;

  /**
   * Suscripción usuarios
   */
  public $user:Subscription;

  /**
   * Array de usuarios
   */
  public users:Usuario[]=[];
  /**
   * Busqueda por nombre
   */
  public nameSearch:string="";
  /**
   * Busqueda por email
   */
  public emailSearch:string="";

  /** 
   * Visualizar dropmenu del search name 
   */
  public vSearchName:boolean=false;
  
  /*
  * Visualizar dropmenu del search email 
  */
  public vSearchEmail:boolean=false;

  /**
   * Texto a mostrar en el pie de la tabla
   */
  public textFooter:string;

  /**
   * Total de registros
   */
  public total:number = 1;
 
  /**
   * Estado leyendo
   */
  public loading = true;

  /**
   * Número de registros por página
   */
  public pageSize:number = 10;
  
  /**
   * Número de página
   */
  public pageIndex:number = 1;
  /**
   * Campo a ordenar
   */
  public sortField:string = null; 
  /**
   *  Tipo de orden ascend | descend | null
   */
  public sortOrder:string = null;
 
  /**
   * Array para filtra con roles de usuario
   */
  public filterRol:Array<{text:string, value:string, byDefault?:boolean}> = [
    { text: 'ADMIN_ROLE', value: 'ADMIN_ROLE' }, 
    { text: 'SUPER_ROLE', value: 'SUPER_ROLE' },
    { text: 'USER_ROLE', value: 'USER_ROLE', byDefault: true },
  ];
 
  /**
   * Filtros de busqueda
   */
  private filter:Array<{ key: string; value: string[]}>=[];
  

  /**
   * Constructor de la clase
   * @param _userService Servicios usuario
   * @param _userListService Servicio impresión usuarios
   * @param _notificacion Servicios de ngZorro para mostrar mensaje de forma global
   * @param router Servicio que proporcina navegación entre vista y capacidades de manipulación de la url
   */
  constructor(private _userService: UsersService,
              private _userListService: UserslistService,
              private _notificacion: NzNotificationService,
              private _tablesgrid: TablesgridService,
              private router:Router
    ) {}


  /**
   * Ciclo de vida del componenete Lifecycle hooks
   * @ignore
   */
  ngOnInit(): void {
    this.filter.push({key:"rol", value: ["USER_ROLE"]})
    this.loadUser(this.pageIndex, this.pageSize, null,null,this.filter)
  }

  /**
   * Decorador de métodos. Escucha eventos emitidos por el host
   * 
   * @param e KeyboardEvent
   */
  @HostListener ('window:keydown', ['$event']) onKeyDown(e:KeyboardEvent) {
    //Si pulsamos alt+b mostramos la ventana busqueda por nombre
    if(e.altKey && e.code==="KeyB") {
      this.vSearchName = !this.vSearchName
      this.vSearchEmail = false;
      setTimeout(() => {
        this.iNameSearch.nativeElement.focus();
      }, 300);  
    }
    //Si pulsamos la tecla tabulador y la ventana busqueda por nombre es visible pasamos a la venta busqueda por email
    if (e.code==="Tab" && this.vSearchName) {
      this.vSearchName = false;
      this.vSearchEmail = true;
      setTimeout(() => {
        this.iEmailSearch.nativeElement.focus();
      }, 300);
    }
    //Si pulsamos la tecla shift+tabulado y la venta busqueda por email es visible pasamos a la ventana busqueda por email
    if(e.code==="Tab" && e.shiftKey && this.vSearchEmail) {
      this.vSearchEmail = false;
      this.vSearchName = true;
      setTimeout(() => {
        this.iNameSearch.nativeElement.focus();
      }, 300);
    }
    if(e.altKey && e.code==="KeyI") {
      setTimeout(() => {
        this.add(); 
      }, 300);
    }

    if (e.altKey && e.code==="ArrowRight") {
      if (this.total>0) {
        this.pageIndex = this._tablesgrid.movePages(1,this.pageIndex,this.total,this.pageSize);
      }
    }
    if (e.altKey && e.code==="ArrowLeft") {
      if (this.total>0){
        this.pageIndex = this._tablesgrid.movePages(-1,this.pageIndex,this.total,this.pageSize);
      }
    }
    if(e.altKey && e.code==="ArrowUp") {
      if (this.total>0) {
        this.pageIndex=1;
      }
    }

    if (e.altKey && e.code==="ArrowDown") {
      if (this.total>0) {
        this.pageIndex = this._tablesgrid.moveFinish(this.total,this.pageSize);
      }
    }
  }

  /**
   * Obtenemos los usuarios
   * 
   * 
   * @param pageIndex Número de página
   * @param pageSize Número de registros por página
   * @param sortField Columna a ordenar
   * @param sortOrder Orden de la columnta
   * @param filter Filtros la consulta
   */
  public loadUser(pageIndex:number, pageSize:number,sortField:string,sortOrder:string,filter: Array<{ key: string; value: string[] }>):void{
    this.loading = true;
    this.$user = this._userService.getUsers(pageIndex,pageSize,sortField,sortOrder,this.nameSearch,this.emailSearch,filter).subscribe(
      (resp:any)=>{
        this.loading = false;
        this.users = resp.users;
        this.total = resp.count;
        this.textFooter = "Número de registros:" + this.total;
      }
    );
  }

 
  /**
   * Cambio de parametros en la tabla nztable
   * 
   * @param params Parametros NzTAble
   */
  public onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    //this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.filter = filter;
    this.loadUser(pageIndex, pageSize,sortField,sortOrder,filter)
  }


  /**
   * Eliminamos el usuario de la base de datos
   * 
   * @param id Identificador del usuario
   */
  public deleteRow(id:string) {

  }
  /**
   * Realizamos la busqueda de usuarios
   */
  public search():void{
    this.loadUser(1,this.pageSize,this.sortField,this.sortOrder,this.filter);
  }

  /**
   * Retorna un listado de usuarios con los filtros aplicados en la consulta.
   */
  public listUsers():void {
    //Titulo del listado
    let titulo:string="Listado de usuarios";
    //Texo cabecera del listado
    let textoCabecera:string="Filtros.  ROL: " ;
    //Texto pie del listado
    let textoPie:string = "";
    //Total registros de la consulta
    let total:number=0;
    //Array usuarios
    let users:Usuario[]=[];
    
    //Texto filtrado por roles
    this.filter[0].value.forEach(value=>
        { textoCabecera = textoCabecera + ' ' + value}
    )
    //Texto filtrado por nombre
    if (this.nameSearch) {
      textoCabecera = textoCabecera + ', Nombre: ' + this.nameSearch;
    }
    //Texto filtrado por email
    if (this.emailSearch) {
      textoCabecera = textoCabecera + ', Email: ' + this.emailSearch;
    }


    //Nombre columna del listado
    let head:[string[]]= [['Nombre', 'Rol', 'Email']];

    //Array datos del listado
    let data:Array<string[]>=[];
    
    //Suscripcion al listado de usuarios
    this.$userList = this._userService.getUsersList(this.sortField,this.sortOrder,this.nameSearch,this.emailSearch,this.filter).subscribe(
      (resp:any)=>{
        this._notificacion.create('success','Listado','El listado ya esta disponible para descargar',{nzDuration:2000});
        total = resp.count;
        textoPie = "Número de registros:" + total;
        resp.users.forEach(user=>{
          data.push([
            user.name.toString(),
            user.rol.toString(),
            user.email.toString()
          ])
        })
        setTimeout(() => {
          this._userListService.getListadoUsuarios(titulo,textoCabecera,textoPie,head,data);
        }, 300);
      },
      ()=>{
        this._notificacion.create('error', 'Listado', 'Existe un error al obtener el listado');
      }
    )

  }

  /**
   * Ir al formulario añadir usuario
   */
  public add():void {
    this.router.navigate(['/user']);
  }

  /**
   * Ir al formulario editar usuario
   * @param _id Identificador usuario
   */
  public edit(_id:string):void {
    this.router.navigate(['/user',_id]);
  }

  

  /**
   * Ciclo de vida del componente limpieza de recursos. Lifecycle hooks
   * @ignore
   */
  ngOnDestroy(): void {
    if (this.$userList) { this.$userList.unsubscribe();}
    if (this.$user) { this.$user.unsubscribe(); }
  }




}
