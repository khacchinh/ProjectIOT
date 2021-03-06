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
var router_1 = require("@angular/router");
var index_1 = require("../../_services/index");
var ServerAddComponent = (function () {
    function ServerAddComponent(router, climateService, irrigationService, alertService) {
        this.router = router;
        this.climateService = climateService;
        this.irrigationService = irrigationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    ServerAddComponent.prototype.addNew = function () {
        var _this = this;
        this.loading = true;
        this.climateService.create(this.model)
            .subscribe(function (data) {
            _this.irrigationService.create(_this.model)
                .subscribe(function (data) {
                _this.alertService.success('Registration successful', true);
                _this.loading = false;
            }, function (error) {
                _this.alertService.error(error._body);
                _this.loading = false;
            });
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return ServerAddComponent;
}());
ServerAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'server-add.component.html',
        styleUrls: ['./server-add.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.ClimateService,
        index_1.IrrigationService,
        index_1.AlertService])
], ServerAddComponent);
exports.ServerAddComponent = ServerAddComponent;
//# sourceMappingURL=server-add.component.js.map