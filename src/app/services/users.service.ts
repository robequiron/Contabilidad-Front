import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario.model';

/**
 * Servicios usuarios.
 * 
 * Consulta usuario - Vista e Impresión
 * Crear, modificar  y eliminar usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * Usuario
   */
  public user:Usuario = new Usuario(null, null, null);

  /**
   * Token user
   */
  private token:string;
  
  /**
   * 
   * @param http Servicio de angular para las peticiones HTTP.
   */
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token');
  }
  

   /**
   * Get users
   * 
   * Obtener usuarios
   * 
   * @param name Name user 
   * @param email Email user
   * @example
   * getUsers(test,test@test.com)
   */
    public getUsers(pageIndex:number, pageSize: number, sortField:string, sortOrder:string , name:string, email:string,filters: Array<{ key: string; value: string[] }>) {

      let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`)
      .append('name', `${name}`)
      .append('email', `${email}`);
      
        filters.forEach(filter => {
          filter.value.forEach(value => {
            params = params.append(filter.key, value);
          });
        });
      


      let token = localStorage.getItem('token');
      let url = environment.URL_SERVICIOS + `/users?token=${token}`;
      return this.http.get(url, {params});
    }


    /**
     * Get user
     * 
     * Obtenemos el usuario por el identificador
     * 
     * @param _id Identify user
     * @returns Observable object user
     */
    public getUser(_id:string):Observable<Usuario> {
      
      let url = environment.URL_SERVICIOS + `/users/${_id}?token=${this.token}`;

      return this.http.get(url).pipe(
        map<any, Usuario>(
          (resp:any)=>{
            return resp.usuario as Usuario;
          }
        )
      );
    }

   /**
   * Get userss
   * 
   * Obtener usuarios
   * 
   * @param name Name user 
   * @param email Email user
   * @example
   * getUsers(test,test@test.com)
   */
  public getUsersList(sortField:string, sortOrder:string , name:string, email:string,filters: Array<{ key: string; value: string[] }>) {

    let params = new HttpParams()
    .append('sortField', `${sortField}`)
    .append('sortOrder', `${sortOrder}`)
    .append('name', `${name}`)
    .append('email', `${email}`);
    
      filters.forEach(filter => {
        filter.value.forEach(value => {
          params = params.append(filter.key, value);
        });
      });
    

    let token = localStorage.getItem('token');
    let url = environment.URL_SERVICIOS + `/users/list?token=${token}`;
    return this.http.get(url, {params});
  }

  /**
   * Check email
   * 
   * Comprobamos que el email no este duplicado
   * 
   * @param formUsuario 
   * @returns 
   */
  public checkEmail(formUsuario:FormGroup){

    let email:string = formUsuario.controls['email'].value;
    let _id :string = formUsuario.controls['_id'].value
    
  
    let params = new HttpParams()
    .append('email', `${email}`)
    .append('_id',`${_id}`)
    let token = localStorage.getItem('token');
    let url = environment.URL_SERVICIOS + `/users/duplicateEmail?token=${token}`;


    return this.http.get(url, {params}).pipe(
      map(
        (resp:any)=>{return resp.existe}
      )
    )
  }

  
  /**
   * Función para validar el email con la validación asincrona desde el formulario Reactive
   * 
   * @param control Input email
   * @returns Promesa
   */
  public  duplicateEmail(control:FormControl):Promise<any> | Observable<any> {
    
    if (!control.value) {
      return Promise.resolve(null)
    } 
    let token = localStorage.getItem('token');
    let url = environment.URL_SERVICIOS + `/users/duplicateEmail?token=${token}&email=${control.value}`;
    
    return new Promise( (resolve,reject)=>{
     
        const obs$ = ajax.getJSON(url).subscribe(
          (data:any)=>{
            if(data.existe) {
              resolve({existe:true})
            } else {
              resolve(null)
            }
          } 
        );

       

    })
  
    
    
  }


  /**
   * Creamos el usuario
   * 
   * @param user Usuario
   * @returns Observable con el usuario creado
   */
  public save(user:Usuario, _id:String):Observable<Usuario>{
    
    //Convertimos a minuscula para que estén todos en minusculas
    user.email = user.email.toLocaleLowerCase();
    //Convertirmo a mayusculas los nombres
    user.name = user.name.toUpperCase();
    user._id = _id;
    
    if (user._id) {
      let url = environment.URL_SERVICIOS + `/users/${user._id}?token=${this.token}`;
      console.log(url)
      return this.http.put(url,user).pipe(
        map<any, Usuario>(
          (resp:any)=>{
            return resp.usuario as Usuario
          }
        )
      );
    } else  {
      let url = environment.URL_SERVICIOS + `/users?token=${this.token}`;
      console.log(url)
      return this.http.post(url,user).pipe(
        map<any,Usuario>( 
          (resp:any)=>{return resp.usuario as Usuario}
        )
      )
    }
    
  }


}


