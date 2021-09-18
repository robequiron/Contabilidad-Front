import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Respuesta } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment.prod';
/**
 * Servicio para la carga de los códigos postales.
 * 
 * @returns Consulta de los códigos postales, creación , modificación y eliminación de los códigos postales.
 */
@Injectable({
  providedIn: 'root'
})
export class PostalService {

    /**
   * 
   * @param http Servicio de angular para las peticiones HTTP
   */
     constructor(private http:HttpClient) { }

  /**
   * Retornas los códigos postales
   * @returns Observable
   */
   public getPostal():Observable<Respuesta>{

    let url = environment.URL_SERVICIOS + `/postal/all`;
    return this.http.get(url).pipe(
      map<any, Respuesta>(
        (resp:any)=>{
          return resp as Respuesta
        }
      )
    );


  }

}
