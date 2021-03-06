import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
/**
 * Interceptor para  los mensajes transmitidos entre aplicación y backend para modificar o monitear */
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor() {}

  /**
   * Interceptos
   * 
   * @param req Peticion
   * @param next Siguiente controlador
   * @returns Observable httpevent
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;

    //Creamos la cabecera
    if (localStorage.getItem('token') ) {
      headers = new HttpHeaders({
        'token': localStorage.getItem('token') 
      })

    } else {
      headers = new HttpHeaders({
        
      })
    }
   
    //Realizarmos clonación de la cabecera ya que está es inmutable
    const reqClone = req.clone({headers});

    //Retornamos un observable
    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    );


  }

  /**
   * Retorna un observable con el error en la petición
   * 
   * @param error Observable HttpError
   * @returns 
   */
  public handleError(error:HttpErrorResponse):Observable<any> {
    //TODO:INTERCEPTAR ELL ERRO 401 PARA MANDAR A LA PAGINA DE LOGIN
    console.log(error);
    return throwError('Error')
  }


}
