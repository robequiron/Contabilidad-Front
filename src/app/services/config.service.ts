import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';
import { Config } from '../models/config.model';
/**
 * Servicios configuración
 * 
 * Consulta configuración general
 * Modificar configuración general
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  /**
   * Token user
   */
  private token:string;
  /**
   * Objecto configuración
   */
  public config:Config = new Config();

  /**
   * Constructor
   * 
   * @param http Servicio de angular para las peticiones de HTTP
   */
  constructor(private http:HttpClient) { 
    this.token = localStorage.getItem('token');
  }

  /**
   * Retorna la configuración general. Si ésta no existe la crea
   * 
   * @returns Observable con los datos de configuración
   */
  public getConfig():Observable<Config> {

    let url = environment.URL_SERVICIOS + `/config?token=${this.token}`;
    return this.http.get(url).pipe(
      map<any, Config>(
        (resp:any)=>{
          return resp.config as Config;
        }
      )
    );


  }

  /**
   * Modificamos la configuración
   * 
   * @param config Config
   * @param _id Identificador de la configuración
   * @returns Observable
   */
  public save(config:Config, _id:string):Observable<any> {

    let url = environment.URL_SERVICIOS + `/config/${_id}?token=${this.token}`;
    return this.http.put(url,config).pipe();


  }

}
