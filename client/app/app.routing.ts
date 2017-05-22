import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
    {
      path: 'site',
      loadChildren: 'app/site/site.module#SiteModule',
      canLoad: [AuthGuard]
    },
    { path: '',   redirectTo: '/site', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, 
            {useHash: true, preloadingStrategy: SelectivePreloadingStrategy})
    ],
    exports: [RouterModule],
    providers:[
        SelectivePreloadingStrategy
    ]
})

export class AppRoutingModule {}
//export const routing = RouterModule.forRoot(appRoutes);