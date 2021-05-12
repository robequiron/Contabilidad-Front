import { Component, OnInit } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public title = 'ngzorro';

  public isCollapsed = false;

  constructor(){}

  public v(event:NzMenuItemDirective) {
    console.log(event)
  }

  ngOnInit(): void {
  }

}
