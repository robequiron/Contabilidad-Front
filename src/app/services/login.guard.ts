import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { LoginService } from './login.service';
/**
 * Guard para proteger las rutas
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  /**
   * Constructor
   * 
   * @param router Router
   * @param _loginServices  Login services
   */
  constructor(private router:Router,private _loginServices:LoginService) {
  }
  /**
   * Guard antes de la carga de las rutas.
   * 
   * @returns Boolean
   */
  canActivate(): Promise<boolean>  | boolean{
  
      if(this._loginServices.isLogin()) {
        let v = this.verificarToken().then(
          (resp)=>{
            return true 
          }
        ).catch(
          ()=>{
            this.router.navigate(['/login']);
            return false;
          }
        )
        return v;
      } else {
        this.router.navigate(['/login']);
        return false;
      }


  }

  /**
   * Retornamos un promesa una vez comprobado el token en el servidor
   * 
   * @returns Promise 
   */
  private verificarToken():Promise<any> {
    return new Promise ( (resolve, reject)=>{
      this._loginServices.checkToken().subscribe(
        ()=>{
          resolve(true);
        },
        ()=>{
          reject(false);
        }
      )
    })
  }
  
}
