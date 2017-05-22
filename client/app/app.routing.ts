import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    {
      path: '',
      loadChildren: 'app/site/site.module#SiteModule',
      canLoad: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);