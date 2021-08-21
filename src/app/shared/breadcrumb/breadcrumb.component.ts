import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public titulo:string;
  public menu:string = null;
  public submenu:string;


  constructor(private router:Router) { 
    this.router.events
    .pipe(
      filter ((e)=> e instanceof ActivationEnd),
      filter ((e:ActivationEnd)=> e.snapshot.firstChild===null),
      map ((e:ActivationEnd)=>e.snapshot.data)
      
    ).subscribe(
      (data:any) => { 
        this.titulo = data.titulo;
        this.menu = data.menu;
        this.submenu = data.submenu;
      }
    )
   
  }

  ngOnInit(): void {
  }

}
