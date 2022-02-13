import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
/**
 * Services login 
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Instanciamos un usuario
   */
  public usuario:Usuario;
  
  /**
   * Token
   */
  public token:string;

  /**
    * Roles
    */
   public  ROLES:String[] =['USER_ROLE','ADMIN_ROLE','SUPER_ROLE'];

  /**
   * Construtor
   * 
   * @param http Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(private http:HttpClient) { 

    this.getLocalStorage();

  }

  /**
   * Sistema de logeo
   * 
   * @param usuario Objecto usuario
   * @param recordar Recordar contraseña
   * @returns Observable
   */
  public login(usuario:Usuario, recordar:boolean):Observable<any> {

      //Si el usuario selecciona la opción de recordar el email.
      if (recordar) {
        localStorage.setItem('email', usuario.email.toString());
      } else {
        localStorage.removeItem('email');
      }

      

      //Consultamos con la base de datos
      return this.http.post(environment.URL_SERVICIOS + '/login ', usuario).pipe(
        map(
          (resp:any)=>{
            
            localStorage.setItem('id', resp.id);
            localStorage.setItem('token', resp.token);
            this.token = resp.token;
            this.usuario = resp.usuario;
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          }
        )
      )

  }

  /**
   * Retorna true si existe token
   * 
   * @returns Boolean
   */
  public isLogin():boolean {
    return (this.token.length>5) ?  true : false;
  }
  /**
   * Comprobamos la veracidad del token  
   * 
   * @returns Observable
   */
  public checkToken():Observable<boolean> {
    let token = localStorage.getItem('token');
    return this.http.get(environment.URL_SERVICIOS + '/login?token=' + token).pipe(
      map(
        (resp:any)=>{
          return true;
        },
        ()=>{
          return false;
        }
      )
    )
  }


  /**
   * Obtenemos el usuario y el token en el localstorage
   */
  public getLocalStorage():void {
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse( localStorage.getItem('usuario')) || null;
  }


  /**
   * Retornamos boolean si el usuario quiere recordar el email
   * 
   * @returns Boolean
   */
  public getRemember():boolean{
    if(localStorage.getItem('email')) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Retorna el email si el usuario a seleccionado recordar el email
   * 
   * @returns String
   */
  public getEmail():string {
    return localStorage.getItem('email') || '';
  }

  /**
   * Retorna el indice del rol de usuario
   * 
   * @param rol Rol del usuario
   * @returns Indice del rol
   */
  public indexRol(rol:String):number {
    return this.ROLES.indexOf(rol)
  }




}
