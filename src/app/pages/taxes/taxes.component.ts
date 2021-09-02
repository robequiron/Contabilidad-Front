import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { Taxes } from 'src/app/models/taxes.model';
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
   * Visualizar dropmenu del search name 
   */
     public vSearchName:boolean=false;

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



  constructor(private _taxes:TaxesService,
              private router:Router
    ) { }
  

  ngOnInit(): void {
    this.loadTaxes(this.pageIndex,this.pageSize,this.sortField,this.sortOrder,this.filter);
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
   public loadTaxes(pageIndex:number, pageSize:number,sortField:string,sortOrder:string,filter: Array<{ key: string; value: string[] }>):void{
    this.loading = true;
    this.$taxes = this._taxes.getTaxes(pageIndex,pageSize,sortField,sortField,this.nameSearch,filter).subscribe(
      (resp:any)=>{
        console.log(resp);
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

  public add() {
    this.router.navigate(['/tax','nuevo']);
  }

  public edit(_id:string){
    this.router.navigate(['/tax',_id]);
  }

  public deleteRow(_id:string) {}


  public listTaxes(){}

  public search(){}

 
}
