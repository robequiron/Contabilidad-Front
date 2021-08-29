import { Routes, RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginGuard } from '../services/login.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { ConfigComponent } from './config/config.component';



const pagesRoutes: Routes = [
    { path: '', 
    component:PagesComponent,
    canActivate:[LoginGuard],
    //canActivate:[LoginGuardGuard],
    children: [
     // {path:'config', component:ConfigComponent, data:{titulo:"Configuración"}},
      // Usuarios
      {path:'users', component:UsersComponent, data:{menu:"Configuración",titulo:"Consulta usuarios"}},
      {path:'user', component:UserComponent, data:{menu:"Configuración",titulo:"Nuevo usuario"}},
      {path:'user/:id', component:UserComponent, data:{menu:"Configuración",titulo:"Editar usuario"}},
      {path:'config', component:ConfigComponent, data:{menu:"Configuración", titulo:"General"}},

      
      //{path:'grupos', component:GruposComponent, data:{titulo:"Grupos contables"}},
      //{path:'grupo/:id', component:GrupoComponent, data:{titulo:"Edición grupo contable"}},
      //{path:'subgrupos', component:SubgruposComponent, data:{titulo:"Subgrupos contables"}},
      //{path:'subgrupo/:id', component:SubgrupoComponent, data:{titulo:"Edición subgrupo contable"}},
      //{path:'subcuentas', component:SubcuentasComponent, data:{titulo:"Subcuentas contables"}},
      //{path:'subcuenta/:id', component:SubcuentaComponent, data:{titulo:"Edición subcuenta contable"}},
      //{path:'cuentas', component:CuentasComponent, data:{titulo:"Cuentas contables"}},
      //{path:'cuenta/:id', component:CuentaComponent, data:{titulo:"Edición cuenta contable"}},
      {path: 'dashboard', component:DashboardComponent},
      { path:'', redirectTo:'/dashboard', pathMatch:'full'},
    ] 
  },
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
