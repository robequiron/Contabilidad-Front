import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardComponent, NzCardGridDirective } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormControlComponent, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NgzorroModule } from '../ngzorro/ngzorro.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, NzCardComponent, 
        NzFormItemComponent, NzFormControlComponent,NzInputGroupComponent ],
      imports:[ ReactiveFormsModule, FormsModule, 
        NzCheckboxModule,RouterTestingModule, 
        NzGridModule,NzButtonModule ],
      providers: [FormBuilder,NzCardGridDirective]
    }) 
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, NzCardComponent, 
        NzFormItemComponent, NzFormControlComponent,NzInputGroupComponent ],
      imports:[ ReactiveFormsModule, FormsModule, 
        NzCheckboxModule,RouterTestingModule, 
        NzGridModule,NzButtonModule ],
      providers: [FormBuilder,NzCardGridDirective]
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
