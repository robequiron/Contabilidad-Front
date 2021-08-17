import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginGuard } from '../services/login.guard';



const pagesRoutes: Routes = [
    { path: '', 
    component:PagesComponent,
    canActivate:[LoginGuard],
    //canActivate:[LoginGuardGuard],
    children: [
     // {path:'config', component:ConfigComponent, data:{titulo:"Configuración"}},
      //{path:'users', component:UsersComponent, data:{titulo:"Usuarios"}},
      //{path:'user', component:UserComponent, data:{titulo:"Usuario"}},
      //{path:'user/:id', component:UserComponent, data:{titulo:"Edición usuario"}},
      //{path:'grupos', component:GruposComponent, data:{titulo:"Grupos contables"}},
      //{path:'grupo/:id', component:GrupoComponent, data:{titulo:"Edición grupo contable"}},
      //{path:'subgrupos', component:SubgruposComponent, data:{titulo:"Subgrupos contables"}},
      //{path:'subgrupo/:id', component:SubgrupoComponent, data:{titulo:"Edición subgrupo contable"}},
      //{path:'subcuentas', component:SubcuentasComponent, data:{titulo:"Subcuentas contables"}},
      //{path:'subcuenta/:id', component:SubcuentaComponent, data:{titulo:"Edición subcuenta contable"}},
      //{path:'cuentas', component:CuentasComponent, data:{titulo:"Cuentas contables"}},
      //{path:'cuenta/:id', component:CuentaComponent, data:{titulo:"Edición cuenta contable"}},
      {path: 'pages', component:PagesComponent, data:{titulo:"Escritorio"}},
      { path:'', redirectTo:'/pages', pathMatch:'full'},
    ] 
  },
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
