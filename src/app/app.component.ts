import { Component } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  public title = 'Harena Fuerteventura';

  public isCollapsed = false;

  constructor(private _app:AppService){
    this.loadTypeNif();
  }


  private loadTypeNif() {
    this._app.loadTypeNif().subscribe(
      (resp:any)=>{
        console.log(resp);
      }
    )
  }


  public v(event:NzMenuItemDirective) {
  }







}
