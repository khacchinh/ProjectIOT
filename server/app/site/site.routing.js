"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var site_component_1 = require("./site.component");
var index_1 = require("./users/index");
var index_2 = require("./home/index");
var index_3 = require("./server-detail/index");
var index_4 = require("./server-manager/index");
//import { RegisterComponent } from './register/register.component';
var index_5 = require("../_guards/index");
var siteRoutes = [
    {
        path: '',
        component: site_component_1.SiteComponent,
        canActivate: [index_5.AuthGuard],
        children: [
            { path: '', component: index_2.HomeComponent },
            //{ path: 'register', component: RegisterComponent },
            { path: 'users', component: index_1.UserComponent },
            { path: 'user/:id', component: index_1.UserEditComponent },
            { path: 'user-add', component: index_1.RegisterComponent },
            { path: 'server-detail/:server', component: index_3.ServerDetailComponent },
            { path: 'servers', component: index_4.ServerComponent },
            { path: 'server/:id', component: index_4.ServerEditComponent },
            { path: 'server-add', component: index_4.ServerAddComponent },
        ]
    }
];
var SiteRoutingModule = (function () {
    function SiteRoutingModule() {
    }
    return SiteRoutingModule;
}());
SiteRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(siteRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], SiteRoutingModule);
exports.SiteRoutingModule = SiteRoutingModule;
//# sourceMappingURL=site.routing.js.map