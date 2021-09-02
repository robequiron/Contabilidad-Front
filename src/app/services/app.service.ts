import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';
import { TypeNif } from '../models/typenif.model';
/**
 * Servicios app
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {

  /**
   * Tipos de Nif
   */
  public TYPENIF:TypeNif[]=[];

  /**
   * Token
   */
  private token:string;

  /**
   * Constructor
   * 
   * @param http Servicio de angular para las peticiones HTTP
   */

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }

  /**
   * Obtenemos los tipos de números de identificación fiscal
   * 
   * @returns Obsevable typeNif[]
   */
  public loadTypeNif():Observable<TypeNif[]> {
    let url = environment.URL_SERVICIOS + `/typenif?token=${this.token}`;
    return this.http.get(url).pipe(
      map<any, TypeNif[]>(
        (resp:any)=>{
          return resp.typeNif as TypeNif[];
        }
      )
    )
  }
}
