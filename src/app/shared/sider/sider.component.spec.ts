import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { NzMenuGroupComponent, NzMenuModule, NzSubMenuComponent } from 'ng-zorro-antd/menu';

import { SiderComponent } from './sider.component';

describe('SiderComponent', () => {
  let component: SiderComponent;
  let fixture: ComponentFixture<SiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderComponent, NzSiderComponent, NzCardComponent ],
      imports: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
