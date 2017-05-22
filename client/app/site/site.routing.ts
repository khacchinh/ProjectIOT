import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { AuthGuard }       from '../_guards/index';

const siteRoutes: Routes = [
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent }
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