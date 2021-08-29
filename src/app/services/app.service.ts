import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  public TYPENIF:TypeNif;

  /**
   * Token
   */
  private token:string;

  /**
   * 
   * @param http 
   */

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token');
   }


  public loadTypeNif() {
    let url = environment.URL_SERVICIOS + `/typenif?token=${this.token}`;
    return this.http.get(url).pipe()
  }
}
