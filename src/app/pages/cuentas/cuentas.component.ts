import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { UserslistService } from 'src/app/list/userslist.service';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentasService } from 'src/app/services/cuentas.service';
import { TablesgridService } from 'src/app/services/tablesgrid.service';
/**
 * Componente donde se muestra las cuentas de la aplicación a través de datagrid
 */
@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  /**
  * Decorador obtención de las propiedades de la directiva iNameSearch
  */
  @ViewChild('iNameSearch', {static:false}) iNameSearch : ElementRef;
  /**
  * Decorador obtención de las propiedades de la directiva iEmailSearch
  */
  @ViewChild('iSurnameSearch', {static:false}) iSurnameSearch : ElementRef;
  /**
  * Decorador obtención de las propiedades de la directiva iEmailSearch
  */
  @ViewChild('iCodeSearch', {static:false}) iCodeSearch : ElementRef;
  /**
  * Decorador obtención de las propiedades de la directiva iEmailSearch
  */
  @ViewChild('iNifSearch', {static:false}) iNifSearch : ElementRef;  
   
  
  /**
  * Suscripción listado cuentas
  */
  public $cuentaList:Subscription;

  /**
  * Array de cuentas
  */
  public cuentas:Cuenta[]=[];

  /**
   * Busqueda por nombre
   */
  public nameSearch:string="";
  /**
  * Busqueda por email
  */
  public surnameSearch:string="";

  /**
  * Busqueda por código
  */
  public codeSearch:number;

  /**
   * Busquda por nif
   */
  public nifSearch:string="";
      /** 
   * Visualizar dropmenu del search name 
   */
  public vSearchName:boolean=false;

  /*
  * Visualizar dropmenu del search email 
  */
  public vSearchSurname:boolean=false;

  /*
  * Visualizar dropmenu del search código
  */
  public vSearchCode:boolean=false;

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
   * Número de página actual
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
   * Filtros de busqueda
   */
  private filter:Array<{ key: string; value: string[]}>=[];

  constructor(private _cuentasService: CuentasService,
    private _userListService: UserslistService,
    private _notificacion: NzNotificationService,
    private _tablesgrid: TablesgridService,
    private router:Router) { }

  ngOnInit(): void {
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
   public load(pageIndex:number, pageSize:number,sortField:string,sortOrder:string,filter: Array<{ key: string; value: string[] }>):void{
    this.loading = true;
    this.$cuentaList = this._cuentasService.getCuentas(pageIndex,pageSize,sortField,sortOrder,filter).subscribe(
      (resp:any)=>{
        this.loading = false;
        this.cuentas  = resp.data as Cuenta[];
        this.total = 0;
        this.textFooter = "Número de registros:" + this.total;
      }
    )
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
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.filter = filter;
    this.load(pageIndex, pageSize,sortField,sortOrder,filter)
  }

  /**
   * Ir al formulario cuenta para añadir un registro nuevo
   */
  public add() {
    this.router.navigate(['/cuenta', 'nuevo']);
  }


  public listCuentas() {}


  public search(){}

  /**
   * Ir al formulario cuenta para modificar el registro
   * @param _id Identificador
   */
  public edit(_id:string){
    this.router.navigate(['/cuenta', _id]);
  }

  public deleteRow(id:string){}

}
