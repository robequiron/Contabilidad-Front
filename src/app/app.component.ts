import { Component } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  public title = 'ngzorro';

  public isCollapsed = false;

  constructor(){}

  public v(event:NzMenuItemDirective) {
    console.log(event)
  }







}
