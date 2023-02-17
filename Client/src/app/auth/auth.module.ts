import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaComponentComponent } from './components/idea-component/idea-component.component';
import { IdeaComponent } from './components/idea/idea.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
  
    IdeaComponentComponent,
       IdeaComponent,
       SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
