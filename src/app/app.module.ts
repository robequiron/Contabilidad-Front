import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NgzorroModule } from './ngzorro/ngzorro.module';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SiderComponent } from './shared/sider/sider.component';
import { PAGES_ROUTES } from './pages/pages.routing';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/users/user.component';
import { ConfigComponent } from './pages/config/config.component';
import { TaxesComponent } from './pages/taxes/taxes.component';
import { TaxComponent } from './pages/taxes/tax.component';
import { PercentagesComponent } from './pages/taxes/percentages.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    FooterComponent,
    SiderComponent,
    BreadcrumbComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    ConfigComponent,
    TaxesComponent,
    TaxComponent,
    PercentagesComponent,
   
  ],
  imports: [
    PAGES_ROUTES,
    APP_ROUTES,
    BrowserModule,
    
    FormsModule,
    HttpClientModule,
    NgzorroModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule {

 

}
