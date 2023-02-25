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
import { HeaderHomeComponent } from './shared/header-home/header-home.component';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { LayoutComponent } from './shared/layout/layout.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DropdownModule} from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { ListboxModule } from 'primeng/listbox';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { ScrollerModule } from 'primeng/scroller';
import { MegaMenuModule } from 'primeng/megamenu';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        ResetPasswordComponent,
        HomeComponent,
        DetailComponent,
        HeaderHomeComponent,
        LayoutComponent,
        MenuComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AccordionModule,
        PasswordModule,
        InputTextModule,
        MenubarModule,
        SlideMenuModule,
        ButtonModule,
        SpeedDialModule,
        SidebarModule,
        CommonModule,
        FormsModule,
        TabViewModule,
        CardModule,
        BrowserAnimationsModule,
        DynamicDialogModule,
        DropdownModule,
        MenuModule,
        SplitButtonModule,
        TreeSelectModule,
        ListboxModule,
        PanelMenuModule,
        ChipModule,
        AvatarModule,
        ScrollerModule,
        MegaMenuModule,
        DialogModule,
        ToggleButtonModule,
        InputTextareaModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }

