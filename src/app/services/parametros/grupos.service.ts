import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrupoModel } from 'src/app/models/grupo.model';
import { Respuesta } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment.prod';
/**
 * Servicios grupos contables
 */
@Injectable({
  providedIn: 'root'
})
export class GruposService {


  /**
   * Constructor
   * 
   * @param http Servicio de angular para las peticiones de HTTP
   */
  constructor(private http:HttpClient) { }


  /**
   * Obtenemos los grupos contables. Si éstas no existe se crean.
   * @returns Observable<GrupoModel[]>
   */
  public getGrupos():Observable<GrupoModel[]> {
    let url = environment.URL_SERVICIOS + '/grupos';

    return this.http.get(url).pipe(
      map<Respuesta, GrupoModel[]>( (resp:Respuesta)=>{
          return resp.data as GrupoModel[];
      })
    )

  }


}
