import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
];

/**
 * Export AppRoutes
 */
 export const APP_ROUTES = RouterModule.forRoot(routes, {useHash:true});