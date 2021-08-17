import { Component, OnInit } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu/menu-item.directive';
import { LoginService } from 'src/app/services/login.service';
import { SideService } from 'src/app/services/side.service';


@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {

  public isCollapsed = true;

  constructor(public _sidebar:SideService, public _user:LoginService) { }

  ngOnInit(): void {

    console.log(this._user.indexRol(this._user.usuario.rol))
  }

  public v(event:NzMenuItemDirective) {
    console.log(event)
  }

}
