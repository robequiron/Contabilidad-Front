import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Respuesta } from '../models/response.model';

/**
 * Servicios códigos postales
 * Consulta de codigo postales, provincias y municipios
 */

@Injectable({
  providedIn: 'root'
})
export class PostalService {

  /**
   * Token user
   */
  public token:string;

  /**
   * Constructor
   * 
   * @param http Servicio de angular para laas peticiones HTTP
   * 
   */
  constructor(private http:HttpClient) { }


  /**
   * 
   * @param postal Código postal
   * @returns Retorna un observable con la Respuesta del servidor
   */
  public getPostal(postal:number):Observable<Respuesta> {

    let url:string = environment.URL_SERVICIOS + `/postal/code/${postal}`;

    return this.http.get(url).pipe(
      map<any, Respuesta>( (resp:Respuesta)=>{
        return resp;
      })
    )

  }

}
