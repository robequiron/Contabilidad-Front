import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
   */
  public forma:FormGroup;

  /**
   * Error 
   * @example email = error | email = ''
   */
  public error = {
    email: '',
    password: '',
  }

  constructor(
    private fb:FormBuilder,
    private router:Router
  ) { 

    this.createForm()

  }

  ngOnInit(): void {
  }


  /**
   * Get error email
   * 
   * @returns String error
   */
  public getEmailValid():void {
    if(this.forma.get('email').invalid && this.forma.get('email').touched) {
      this.error.email = 'error';
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
    if(this.forma.get('password').invalid && this.forma.get('password').touched){
      this.error.password = 'error';
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
    console.log(this.forma)
  }

  public singIn() {
    this.router.navigate['pages'];
  }

}
