import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { ChartModule } from 'angular2-highcharts';


import { AlertService, AuthenticationService, UserService, ClimateService, IrrigationService} from '../_services/index';

import { SiteComponent } from './site.component';
//import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { SiteAlertComponent } from './alert.component';
import { ServerDetailComponent } from './server-detail/index';


//header and footer
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { SiteRoutingModule } from './site.routing';

//user
import { UserComponent, RegisterComponent, UserEditComponent } from './users/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SiteRoutingModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [
    SiteComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    RegisterComponent,
    UserEditComponent,
    SiteAlertComponent,
    ServerDetailComponent
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService,
    ClimateService,
    IrrigationService
  ]
})
export class SiteModule {}