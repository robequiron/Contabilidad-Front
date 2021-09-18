import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, HostListener,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { Respuesta } from 'src/app/models/response.model';
import { Taxes } from 'src/app/models/taxes.model';
import { TablesgridService } from 'src/app/services/tablesgrid.service';
import { TaxesService } from 'src/app/services/taxes.service';
/**
 * Componente donde se muestra los impuestos de la aplicación a través de datagrid
 */
@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit {

  /**
   * Decorador obtención de las propiedades de la directiva iNameSearch
   */
  @ViewChild('iNameSearch', {static:false}) iNameSearch: ElementRef

   /**
   * Decorador obtención de las propiedades de la directiva iNameSearch
   */
  @ViewChild('iCodeSearch', {static:false}) iCodeSearch: ElementRef

  /**
   * Suscripción del listado impuestos
   */
  public $taxes: Subscription;

  /**
   * Array de taxes. Impuestos
   */
  public taxes:Taxes[]=[];

  /**
   * Busqueda por nombre
   */
  public nameSearch:string= "";

  /**
   * Busqueda por código de impuesto
   */
  public codeSearch:number=null;

  /** 
   * Visualizar dropmenu del search name 
   */
  public vSearchName:boolean=false;
  /** 
   * Visualizar dropmenu del search code
   */
  public vSearchCode:boolean=false;

  /**
   * Texto a mostrar en el pie de la tabla
   */
  public textFooter:string = "";

  /**
   * Total de registros
   */
  public total:number=1;

  /**
   * Estado leyendo
   */
  public loading = true;

  /**
   * Número de registros por página
   */
  public pageSize:number=10;
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


  /**
   * Constructor
   * 
   * @param _taxes Servicios impuestos y porcentajes
   * @param router Servicio de Angular Router, que permite la navegación de una vista a la siguiente
   * @param _tablesgrid Servicio para el desplazamiento de la páginas en las tablas
   * @param _notification Servicio de notificación de ngZorro
   */
  constructor(private _taxes:TaxesService,
              private router:Router,
              private _tablesgrid: TablesgridService,
              private _notification:NzNotificationService,
    ) { }
  
  /**
   * Directiva ciclo de vida del component - Primera ejecución (Lifecycle hooks)
   * 
   */
  ngOnInit(): void {
    this.filter.push({key:'name', value:[this.nameSearch]});
    this.filter.push({key:'code', value:['']});
  }
  /**
   * Decorador de métodos. Escucha eventos emitidos por el host
   * 
   * @param e KeyboardEvent
   */
  @HostListener('window:keydown', ['$event']) onKeyDown(e:KeyboardEvent){

    //Si pulsamos alt+b mostramos la ventana busqueda por código
    if(e.altKey && e.code==="KeyB") {
      this.vSearchCode = true;
      this.vSearchName = false;
      setTimeout(() => {
        this.iCodeSearch.nativeElement.focus();
      }, 300);  
    }
    //Si pulsamos la tecla tabulador y la ventana busqueda por código es visible pasamos a la venta busqueda por email
    if (e.code==="Tab" && this.vSearchCode) {
      this.vSearchCode = false;
      this.vSearchName = true;
      setTimeout(() => {
        this.iNameSearch.nativeElement.focus();
      }, 300);
    }
    //Si pulsamo la tecka alt + i  insertamos un nuevo registros
    if(e.altKey && e.code==="KeyI") {
      setTimeout(() => {
        this.add(); 
      }, 300);
    }
    //Desplazamiento de la tabla
    if (e.shiftKey && e.code==="ArrowRight") {
        this.pageIndex = this._tablesgrid.movePages(1,this.pageIndex,this.total,this.pageSize);
    }
    if (e.shiftKey && e.code==="ArrowLeft") {
        this.pageIndex = this._tablesgrid.movePages(-1,this.pageIndex,this.total,this.pageSize);
    }
    if(e.shiftKey && e.code==="ArrowUp") {
        this.pageIndex=1;
    }

    if (e.shiftKey && e.code==="ArrowDown") {
       this.pageIndex = this._tablesgrid.moveFinish(this.total,this.pageSize);
    }


  }

  /**
   * Obtenemos los usuarios
   * 
   * @param pageIndex Número de página
   * @param pageSize Número de registros por página
   * @param sortField Columna a ordenar
   * @param sortOrder Orden de la columnta
   * @param filter Filtros la consulta
   */
   public loadTaxes(pageIndex:number, pageSize:number,sortField:string,sortOrder:string,filter: Array<{ key: string; value: string[] }>):void{
    this.loading = true;
    this.$taxes = this._taxes.getTaxes(pageIndex,pageSize,sortField,sortOrder,this.nameSearch,filter).subscribe(
      (resp:any)=>{
        this.loading = false;
        this.taxes = resp.taxes;
        this.total = resp.count;
        this.textFooter = "Número de registros: " + this.total;
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
      //this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
      this.sortField = sortField;
      this.sortOrder = sortOrder;
      this.filter = filter;
      this.loadTaxes(pageIndex, pageSize,sortField,sortOrder,filter)
    }
  
  /**
   * Añadir impuesto
   */
  public add() {
    this.router.navigate(['/tax','nuevo']);
  }

  /**
   * Editar impuesto
   * 
   * @param _id Identificador impuesto
   */
  public edit(_id:string):void{
    this.router.navigate(['/tax',_id]);
  }

  /**
   * Eliminar impuesto
   * @param _id Identificado impuesto
   */
  public deleteRow(tax:Taxes) {
    
      if(tax.percentages.length>0) {
        this._notification.error('Eliminar','No es posible eliminar, contiene porcentajes.')
      } else {
        this._taxes.deleteTax(tax._id).subscribe(
          (resp:Respuesta)=>{
              if (resp.ok) {
                this._notification.success("Eliminado","Registro eliminado correctamente");
                this.loadTaxes(1,this.pageSize,this.sortField,this.sortOrder,this.filter);
              } else {
                this._notification.error("Error", "Existen errores al eliminar el registro")
              }
          }
        )
      }

    

  }

  /**
   * Lista de impuesto 
   */
  public listTaxes(){
    //TODO: Creación del listado de impuestos
  }


  /**
   * Busqueda de impuestos
   */
  public search():void{
   this.filter = []
   this.filter.push({key:'name', value:[this.nameSearch]});
   let code:string='';
   if (this.codeSearch) {
      code = this.codeSearch.toString();
   }
   this.filter.push({key:'code', value:[code]})
   this.loadTaxes(1,this.pageSize,this.sortField,this.sortOrder,this.filter);
  }

 
}
