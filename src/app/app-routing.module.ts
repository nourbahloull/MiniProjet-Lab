import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { ArticlesComponent } from './articles/articles.component';
import { ToolsComponent } from './tools/tools.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';

//tableau contient les routes
//nb : l'ordre intervient 
const routes: Routes = [
  {
    path :'members',
    pathMatch : 'full',
    component : MemberComponent
  },
  {
    path :'create',
    pathMatch : 'full',
    component : MemberFormComponent
  },
  {
    path :'',
    pathMatch : 'full',
    component : LoginComponent
  },
  {
    path :'edit/:id', // id contenu dynamique = valeur mteoo
    pathMatch : 'full',
    component : MemberFormComponent
  },
  {
    path :'articles',
    pathMatch : 'full',
    component : ArticlesComponent
  },
  {
    path :'tools',
    pathMatch : 'full',
    component : ToolsComponent
  },
  {
    path :'dashboard',
    pathMatch : 'full',
    component : DashboardComponent
  },
  {
    path :'events',
    pathMatch : 'full',
    component : EventsComponent
  },

  // ekher haja lezem
  {
    path :'**',
    component : MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
