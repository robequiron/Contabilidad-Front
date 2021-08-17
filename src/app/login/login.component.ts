import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
/**
 * Component login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Form
   * 
   * Formulario
   */
  public forma:FormGroup;

  /**
   * Error 
   * @example email = error | email = ''
   */
  public error = {
    email: '',
    emailText: '',
    password: '',
    passwordText:'',
    login:false,
  }

  constructor(
    private fb:FormBuilder,
    private _login:LoginService,
    private router:Router
  ) { 
    //Creamos el formulario
    this.createForm()

  }
  /**
   * @ignore
   */
  ngOnInit(): void {
    this.getEmailLocalStorage();
  }

  /**
   * Si el usuario establece recordar usuario
   */
  public getEmailLocalStorage() {


    this.forma.setValue({
      "email":this._login.getEmail(),
      "password":'',
      "remember" : this._login.getRemember()
    })
  }

  /**
   * Get error email
   * 
   * @returns String error
   */
  public getEmailValid():void {
    this.error.emailText = '';
    if(this.forma.get('email').invalid && this.forma.get('email').touched) {
      this.error.email = 'error';
      this.error.emailText = 'El campo no puede ser nulo';
    } else {
      this.error.email= 'success';
    }
  }

  /**
   * Get error password
   * 
   * @return String error
   */
  public getPasswordValid():void {
    this.error.passwordText = '';
    if(this.forma.get('password').invalid && this.forma.get('password').touched){
      this.error.password = 'error';
      this.error.passwordText = 'El campo password no puede ser nulo';
    } else {
      this.error.password = 'success';
    }
  }


  public createForm() {
    this.forma = this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]],
      remember: [false]
    })
  }

  public save() {
  }

  public singIn() {

    let user:Usuario = new Usuario(
      '',
      this.forma.value.email,
      this.forma.value.password
    )
   this._login.login(user,this.forma.value.remember).subscribe(
     ()=>{
      this.router.navigate(['/pages']) 
     },
     (e)=>{
        if (e.status===400) {
          this.error.login = true;
          this.error.email = 'error';
          this.error.emailText = '';
          this.error.password = 'error';
          this.error.passwordText = '';
        }
        
     }
   )

  }

}
