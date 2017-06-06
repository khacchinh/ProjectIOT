import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site.component';
import { UserComponent, RegisterComponent, UserEditComponent } from './users/index';
import { HomeComponent } from './home/index';
import { ServerDetailComponent } from './server-detail/index';

//import { RegisterComponent } from './register/register.component';
import { AuthGuard }       from '../_guards/index';

const siteRoutes: Routes = [
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      //{ path: 'register', component: RegisterComponent },
      { path: 'users', component: UserComponent },
      { path: 'user/:id', component: UserEditComponent},
      { path: 'user-add', component: RegisterComponent},
      { path: 'server-detail/:server', component: ServerDetailComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(siteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SiteRoutingModule {}