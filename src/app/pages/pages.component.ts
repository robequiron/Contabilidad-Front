import { Component, OnInit } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { SideService } from '../services/side.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public title = 'ngzorro';

  public isCollapsed = false;
  /**
   * 
   * @param _side Servicios de configuración del sidebar
   */
  constructor(public _side:SideService){}

  public v(event:NzMenuItemDirective) {
    console.log(event)
  }

  ngOnInit(): void {
  }

}
