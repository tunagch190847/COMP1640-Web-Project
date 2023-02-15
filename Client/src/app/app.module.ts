import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    HomeComponent,
    DetailComponent,
    HeaderHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    PasswordModule,
    InputTextModule,
    MenubarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

