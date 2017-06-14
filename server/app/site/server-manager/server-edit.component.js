"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../_services/index");
var router_1 = require("@angular/router");
var ServerEditComponent = (function () {
    function ServerEditComponent(climateService, irrigationService, alertService, route) {
        this.climateService = climateService;
        this.irrigationService = irrigationService;
        this.alertService = alertService;
        this.route = route;
        this.model = {};
    }
    ServerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.climateService.getById(params['id'])
                .subscribe(function (data) {
                _this.model = data;
                _this.old_server = data.server;
            });
        });
    };
    ServerEditComponent.prototype.updateServer = function () {
        var _this = this;
        this.climateService.update(this.old_server, this.model).subscribe(function (doc1) {
            _this.irrigationService.update(_this.old_server, _this.model).subscribe(function (doc2) {
                _this.alertService.success("Update user success!!");
            });
        });
    };
    return ServerEditComponent;
}());
ServerEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'server-edit.component.html'
    }),
    __metadata("design:paramtypes", [index_1.ClimateService,
        index_1.IrrigationService,
        index_1.AlertService,
        router_1.ActivatedRoute])
], ServerEditComponent);
exports.ServerEditComponent = ServerEditComponent;
//# sourceMappingURL=server-edit.component.js.map