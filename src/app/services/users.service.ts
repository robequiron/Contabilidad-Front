import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }

  constructor(private http: HttpClient) { 
    
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
     public getUsersi(pageIndex:number, pageSize: number, sortField:string, sortOrder:string , name:string, email:string,filters: Array<{ key: string; value: string[] }>) {

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
      

      console.log(params)

      let token = localStorage.getItem('token');
      let url = environment.URL_SERVICIOS + `/users?token=${token}`;
      return this.http.get(url, {params});
    }


}


