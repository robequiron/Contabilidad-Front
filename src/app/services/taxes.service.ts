import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Respuesta } from '../models/response.model';
import { Taxes } from '../models/taxes.model';
/**
 * Servicios impuestos y porcentajes
 * 
 * Consulta impuestos, porcentajes - Vista e Impresión
 * Crear, modificar y eliminar impuestos y taxes
 */
@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  /**
   * Token user
   */
  public token:string;



  /**
   * Constructor
   * 
   * @param http Servicio de angular para las peticiones HTTP
   */
  constructor(private http:HttpClient) { 
    this.token = localStorage.getItem('token');
  }

   /**
   * Get taxes
   * 
   * Obtener impuestos
   * 
   * @param name Nombre del impuesto
   * @example
   */
  public getTaxes(pageIndex:number, pageSize: number, sortField:string, sortOrder:string , name:string,filters: Array<{ key: string; value: string[] }>) {

      let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`)
      
      
        filters.forEach(filter => {
          filter.value.forEach(value => {
            params = params.append(filter.key, value);
          });
        });
       
      let url = environment.URL_SERVICIOS + `/taxes`;
      return this.http.get(url, {params});
  }

  /**
   * Get tax
   * 
   * Obtener impuesto
   * 
   * @param _id Identify tax
   * @returns Observe object tax
   */
  public getTax(_id:string):Observable<Taxes> {
    
    let url = environment.URL_SERVICIOS + `/taxes/${_id}`;
    
    return this.http.get(url)
    .pipe(
      map<any, Taxes>((resp:any)=>{
          return resp.tax as Taxes
      })
    );
    
  }

  /**
   * Get the last code
   * 
   * Obtenemos el último código
   * 
   * @returns Observable number
   */
  public getLastCode():Observable<number> {
    let url = environment.URL_SERVICIOS + `/taxes/lastcode`;

    return this.http.get(url).pipe(
      map<any, number>(
        (resp:any)=>{
          return resp.lastCode as number;
        }
      )
    )
  }

  /**
   * Eliminar el impuesto
   * 
   * @param _id Identificado del impuesto
   * @returns Observable Respuesta
   */
  public deleteTax(_id:string):Observable<Respuesta> {
    let url = environment.URL_SERVICIOS + `/taxes/${_id}`;
    return this.http.delete(url)
    .pipe(
      map<any, Respuesta>((resp:any)=>{
          return resp as Respuesta
      })
    );
  }

  /**
   * Creamos o modificamos el impuesto
   * 
   * @param tax Object tax
   * @param _id Identificar del impuesto
   * @returns Observable Taxes
   */
  public save(tax:Taxes, _id:String):Observable<Taxes> {
    //Convertimos el nombre a mayusculas
    tax.name = tax.name.toLocaleUpperCase();
    //Modificamos el impuestos
    if(tax._id) {
      let url = environment.URL_SERVICIOS + `/taxes/${tax._id}`;
      return this.http.put(url,tax).pipe(
        map<any, Taxes>(
          (resp:any)=>{
            return resp.tax as Taxes;
          }
        )
      )
    } else {
      let url = environment.URL_SERVICIOS + `/taxes`;
      return this.http.post(url,tax).pipe(
        map<any,Taxes>(
          (resp:any)=>{
            return resp.tax as Taxes;
          }
        )
      )
    }

  }


  

}
