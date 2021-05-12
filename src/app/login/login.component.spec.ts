import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
/*     await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ ReactiveFormsModule, FormsModule]
    }) */
    //.compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ ReactiveFormsModule, FormsModule, NzCheckboxModule,RouterTestingModule ],
      providers: [FormBuilder]
    })

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse el  login component', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de crearse el formulario del login', ()=>{
    expect( component.forma.contains('email')).toBeTruthy();
    expect( component.forma.contains('password')).toBeTruthy();
    expect( component.forma.contains('remember')).toBeTruthy();
  });
  
  it('El email debe de ser obligatorio',()=>{
    const control = component.forma.get('email');
  });

  
 
});
