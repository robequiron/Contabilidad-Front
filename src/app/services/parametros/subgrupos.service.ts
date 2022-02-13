import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Respuesta } from 'src/app/models/response.model';
import { subgrupoModel } from 'src/app/models/subgrupo.model';
import { environment } from 'src/environments/environment.prod';
/**
 * Servicios subgrupos contables
 */
@Injectable({
  providedIn: 'root'
})
export class SubgruposService {

  /**
   * Contructor
   * 
   * @param http Servicio de angular para las peticiones http
   */
  constructor(private http:HttpClient) { }

  /**
   * Obtenemos los subgrupos contables. Si éstas no existen se crean
   * @returns Observable<subgrupoModel[]>
   */
  public getSubgrupos():Observable<subgrupoModel[]> {
      let url = environment.URL_SERVICIOS + '/subgrupos';

      return this.http.get(url).pipe(
        map<Respuesta, subgrupoModel[]>(
         (resp:Respuesta)=>{
           return resp.data as subgrupoModel[];
         } 
        )
      )
  }


}
