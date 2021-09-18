import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Respuesta } from 'src/app/models/response.model';
import { Vias } from 'src/app/models/vias.model';
import { environment } from 'src/environments/environment.prod';
/**
 * Servicio para la carga de vias.
 * 
 * @returns Consulta de vias, creación , modificación y eliminación de vias.
 */
@Injectable({
  providedIn: 'root'
})
export class ViasService {

  /**
   * Array de vias
   */
  public vias:Vias[]= [];

  /**
   * 
   * @param http Servicio de angular para las peticiones HTTP
   */
  constructor(private http:HttpClient) { }

  /**
   * Retornas las vias de tráfico
   * @returns Observable
   */
  public getVias():Observable<Respuesta>{

    let url = environment.URL_SERVICIOS + `/vias/all`;
    return this.http.get(url).pipe(
      map<any, Respuesta>(
        (resp:any)=>{
          return resp as Respuesta
        }
      )
    );


  }



}
