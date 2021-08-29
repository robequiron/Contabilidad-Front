import { Injectable } from '@angular/core';
/**
 * Servicios para la tablas de registos
 */
@Injectable({
  providedIn: 'root'
})
export class TablesgridService {
  /**
   * Construtor
   */
  constructor() { }


  /**
   * Desplazador de páginas
   * 
   * @param n Número de incrementar o decrementar
   * @param pageIndex Página actual
   * @param total Total de registros
   * @param pagesSize Número de registros por página
   * @returns Página a mostrar
   */
   public movePages(n:number,pageIndex:number, total:number, pageSize:number):number {

    if (total===0) {
      return 0;
    }
    
    //Comprobamos el total de paginas
    let pagesTotal:number =total / pageSize 

    if (pageIndex + n ===0) {
      return pageIndex  
    } else {
      if (pageIndex + n > parseInt(pagesTotal.toFixed(0))) {
        return pageIndex
      } else {
        return pageIndex + n;
      }
    }
  }

  /**
   * Deplazarnos a la última página
   * 
   * @param total Total de registros
   * @param pageSize Número de registros por página
   * @returns 
   */
  public moveFinish(total:number, pageSize:number):number {
    
    //Comprobamos el total de paginas
    let pagesTotal:number =total / pageSize 

    return parseInt(pagesTotal.toFixed(0))
  }
  

}
