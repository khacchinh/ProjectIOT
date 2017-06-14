"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var angular2_highcharts_1 = require("angular2-highcharts");
var index_1 = require("../_services/index");
var site_component_1 = require("./site.component");
//import { RegisterComponent } from './register/index';
var index_2 = require("./home/index");
var alert_component_1 = require("./alert.component");
var index_3 = require("./server-detail/index");
//header and footer
var index_4 = require("./header/index");
var index_5 = require("./footer/index");
var site_routing_1 = require("./site.routing");
//user
var index_6 = require("./users/index");
var index_7 = require("./server-manager/index");
var SiteModule = (function () {
    function SiteModule() {
    }
    return SiteModule;
}());
SiteModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            site_routing_1.SiteRoutingModule,
            angular2_highcharts_1.ChartModule.forRoot(require('highcharts'))
        ],
        declarations: [
            site_component_1.SiteComponent,
            index_2.HomeComponent,
            index_6.RegisterComponent,
            index_4.HeaderComponent,
            index_5.FooterComponent,
            index_6.UserComponent,
            index_6.RegisterComponent,
            index_6.UserEditComponent,
            alert_component_1.SiteAlertComponent,
            index_3.ServerDetailComponent,
            index_7.ServerComponent,
            index_7.ServerAddComponent,
            index_7.ServerEditComponent
        ],
        providers: [
            index_1.AlertService,
            index_1.AuthenticationService,
            index_1.UserService,
            index_1.ClimateService,
            index_1.IrrigationService
        ]
    })
], SiteModule);
exports.SiteModule = SiteModule;
//# sourceMappingURL=site.module.js.map