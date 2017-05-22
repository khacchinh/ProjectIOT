import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { AlertService, AuthenticationService, UserService} from '../_services/index';

import { SiteComponent } from './site.component';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';


//header and footer
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SiteRoutingModule } from './site.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SiteRoutingModule
  ],
  declarations: [
    SiteComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService
  ]
})
export class SiteModule {}