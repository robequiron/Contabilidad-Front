import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Cuenta } from '../models/cuenta.model';
import { Respuesta } from '../models/response.model';
/**
 * Servicios de cuentas personales
 * 
 * Consulta de cuentas personales - Vista e impresión
 * Crear, modificar y eliminar cuentas
 */
@Injectable({
  providedIn: 'root'
})
export class CuentasService {



  constructor(private http:HttpClient) { }

   /**
   * Get cuentas
   * 
   * Obtener la cuentas de clientes
   * 
   * @param name Nombre del impuesto
   * @example
   * @returns Observable Respuesta
   */
    public getCuentas(pageIndex:number, pageSize: number, sortField:string, sortOrder:string , filters: Array<{ key: string; value: string[] }>):Observable<Respuesta> {

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
       
      let url = environment.URL_SERVICIOS + `/cuentas`;
      return this.http.get(url, {params}).pipe(
        map<any, Respuesta>( (resp:any)=>{
          console.log(resp)
          return resp as Respuesta;
        })
      );
  }

  /**
   * Get cuenta
   * 
   * Obtener cuenta
   * 
   * @param _id Identify cuenta
   * @returns Observer object cuenta
   */
  public getCuenta(_id:string):Observable<Cuenta> {
    let url = environment.URL_SERVICIOS + `/cuentas/${_id}`;

    return this.http.get(url).pipe(
      map<Respuesta, Cuenta>((resp:any)=>{
        return resp.cuenta as Cuenta;
      })
    )

  }

    
  /**
   * Obtenemos el último código disponible para cuentas personal
   * 
   * @returns Observable number
   */
  public getLastCode():Observable<number> {
    let url = environment.URL_SERVICIOS + `/cuentas/lastcode`;

    return this.http.get(url).pipe(
      map<Respuesta,number>(
        (resp:Respuesta)=>{
          return resp.data;
        }
      )
    )
  }

  public save(cuenta:Cuenta, _id:string) {
    if(cuenta._id) {
      let url = environment.URL_SERVICIOS + `/cuentas/${cuenta._id}`;
      return this.http.put(url,cuenta).pipe(
        map( (resp:any)=>{
          return resp;
        }) 
      )
    } else {
      let url = environment.URL_SERVICIOS + `/cuentas`;
      return this.http.post(url,cuenta).pipe(
        map( (resp:any)=>{
          
          return resp;
        })
      )
    }


  }



}
