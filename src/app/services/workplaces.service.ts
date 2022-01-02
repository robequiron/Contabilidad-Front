import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Respuesta } from '../models/response.model';

/**
 * Servicios workpalces. Centros de trabajo.
 * 
 * Consulta centros de trabajo - Vista e Impresión
 * Crear, modificar y eliminar centros de trabajo
 * 
 */


@Injectable({
  providedIn: 'root'
})
export class WorkplacesService {

  /**
   * Token user
   */
  public token:string;
  
  /**
   * Constructor
   * 
   * @param http Servicio de Angular para las peticiones HTTP
   */
  constructor(private http:HttpClient) { 
    this.token = localStorage.getItem('token');
  }

  /**
   * Obtención de la sede principal de una cuenta personal
   * 
   * @param _idCuenta Identificado de la cuenta personal
   */
  public getWorkplaceHeadquarters(_idCuenta:string):Observable<Respuesta> {
    let url  = environment.URL_SERVICIOS + `/workplace/headquater/${_idCuenta}`;

    return this.http.get(url).pipe(
      map<any, Respuesta>(
        (resp:any)=>{ 
          return resp as Respuesta
        }
      )
    )


  }

}
