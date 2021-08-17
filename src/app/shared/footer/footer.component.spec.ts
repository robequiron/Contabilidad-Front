import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgzorroModule } from 'src/app/ngzorro/ngzorro.module';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [NgzorroModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });


  it('Existe el elemento nzfooter',()=>{
    const elem: HTMLElement= fixture.debugElement.query( By.css('nz-footer')).nativeElement;
    expect(elem.innerHTML).toContain(component.textFooter);
  });
  
});
