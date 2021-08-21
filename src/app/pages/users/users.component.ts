import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserslistService } from 'src/app/list/userslist.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsersService } from 'src/app/services/users.service';
/**
 * Componente donde se muestra los usuarios de la aplicación
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  /**
   * Input name search
   */
  @ViewChild('iNameSearch', {static:false}) iNameSearch : ElementRef;
  /**
   * Input name email
   */
  @ViewChild('iEmailSearch', {static:false}) iEmailSearch : ElementRef;

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

  /** Visualizar dropmenu del search name */
  public vSearchName:boolean=false;
  /** Visualizar dropmenu del search email */
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
   * Constructor
   * 
   * @param _userService Servicios usuarios
   */
  constructor(private _userService: UsersService,
    private _userListService: UserslistService
    ) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.filter.push({key:"rol", value: ["USER_ROLE"]})
    this.loadUser(this.pageIndex, this.pageSize, null,null,this.filter)
  }
  /**
   * Eventos del teclado
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
  public loadUser(pageIndex:number, pageSize:number,sortField:string,sortOrder:string,filter: Array<{ key: string; value: string[] }>){
    this.loading = true;
    this._userService.getUsersi(pageIndex,pageSize,sortField,sortOrder,this.nameSearch,this.emailSearch,filter).subscribe(
      (resp:any)=>{
        console.log(resp)
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

  public deleteRow(id:string) {

  }

  public search(){
    this.loadUser(1,this.pageSize,this.sortField,this.sortOrder,this.filter);
  }

  public listUsers() {

    let titulo:string="Listado de usuarios";
    let textoCabecera:string="Filtros.  ROL: " ;
    
    //Texto filtrado por roles
    this.filter[0].value.forEach(value=>
        { textoCabecera = textoCabecera + ' ' + value}
    )
    //Texto filtrado por nombre
    if (this.nameSearch) {
      textoCabecera = textoCabecera + ', Nombre: ' + this.nameSearch
    }
    //Texto filtrado por email
    if (this.emailSearch) {
      textoCabecera = textoCabecera + ', Email: ' + this.emailSearch
    }


    
    let head:[string[]]= [['Nombre', 'Rol', 'Email']]
    let data:Array<string[]>=[];

    this.users.forEach(user=>{
      data.push([
        user.name.toString(),
        user.rol.toString(),
        user.email.toString()
      ])
    })

    
    this._userListService.getes(titulo,textoCabecera,head,data);
  }



}
