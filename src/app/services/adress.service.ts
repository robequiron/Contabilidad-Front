import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Adress } from '../models/adress.model';
import { Respuesta } from '../models/response.model';
/**
* Servicios direcciones cuenta personales
* Consulta de direcciones - Vistas e impresión
* Crear, modificar y eliminar cuentas
*/

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  /**
   * Constructor
   * 
   * @param http Servicio para realizar peticiones HTTP
   */
  constructor(private http:HttpClient) { }


  /**
   * Graba o modificar la dirección de los centros de trabajo
   * 
   * @param adress Objeto dirección
   * @param _id Identificador de la direccion
   * @returns Objservable con la respuesta
   */
  public save(adress:Adress):Observable<Respuesta> {
    if(adress._id){
      let url = environment.URL_SERVICIOS + `/adress/${adress._id}`;
      return this.http.put(url,adress).pipe(
        map<any,Respuesta>(
          (resp:any)=>{
            return resp as Respuesta;
          }
        )
      )
    } else {
      let url = environment.URL_SERVICIOS + `/adress`;
      return this.http.post(url, adress).pipe(
        map<any, Respuesta>((resp:any)=>{
          return resp as Respuesta;
        })
      )
    }
  }
  /**
   * Obtenemos la dirección por su identificador
   * @param _id Identificador de la dirección
   * @returns Observable con la respuesta
   */
  public getbyId(_idWorkplace:string):Observable<Respuesta> {
    let url = environment.URL_SERVICIOS + `/adress/${_idWorkplace}`;
    return this.http.get(url).pipe(
      map<any,Respuesta>(
        (resp:any)=>{
          return resp as Respuesta;
        }
      )
    )
  } 

  
}
