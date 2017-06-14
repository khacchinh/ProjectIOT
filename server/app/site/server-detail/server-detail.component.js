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
var io = require("socket.io-client");
var index_1 = require("../../_services/index");
var ServerDetailComponent = (function () {
    function ServerDetailComponent(router, alertService, climateService, irrigationService, route) {
        this.router = router;
        this.alertService = alertService;
        this.climateService = climateService;
        this.irrigationService = irrigationService;
        this.route = route;
        this.url = 'https://api-vegatable.herokuapp.com';
    }
    ServerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var server = params['server'];
            //get data climate
            _this.climateService.getAll(server).subscribe(function (data) {
                _this.arrClimate = data[0];
            });
            //get data irrigation
            _this.irrigationService.getAll(server).subscribe(function (data) {
                _this.arrIrrigation = data[0];
            });
            _this.climateService.getDataClimateChart(server).subscribe(function (data_chart) {
                console.log(data_chart);
                //add chart
                _this.optionsClimates = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: { text: 'chart climate control' },
                    series: [{
                            name: "Environment Temperature",
                            animation: false,
                            type: 'line',
                            data: data_chart.cli_view_temp,
                            allowPointSelect: true
                        }, {
                            name: "Environment Huminity",
                            animation: false,
                            type: 'line',
                            data: data_chart.cli_view_humi,
                            allowPointSelect: true
                        }, {
                            name: "Light Intensity",
                            animation: false,
                            type: 'line',
                            data: data_chart.cli_view_light,
                            allowPointSelect: true
                        }, {
                            name: "CO2 Injection",
                            animation: false,
                            type: 'line',
                            data: data_chart.cli_view_co2,
                            allowPointSelect: true
                        }],
                    xAxis: {
                        type: 'datetime',
                        ordinal: false
                    }
                };
            });
            _this.irrigationService.getDataIrrigatioChart(server).subscribe(function (data_chart) {
                //add chart
                _this.optionsIrrigations = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: { text: 'chart irrigation control' },
                    series: [{
                            name: "PH",
                            animation: false,
                            type: 'line',
                            data: data_chart.irr_view_ph,
                            allowPointSelect: true
                        }, {
                            name: "EC",
                            animation: false,
                            type: 'line',
                            data: data_chart.irr_view_ec
                        }, {
                            name: "Water Temperature",
                            animation: false,
                            type: 'line',
                            data: data_chart.irr_view_waterTemp,
                            allowPointSelect: true
                        }, {
                            name: "Oxygen Concentration In Water",
                            animation: false,
                            type: 'line',
                            data: data_chart.irr_view_OxygenConc,
                            allowPointSelect: true
                        }],
                    xAxis: {
                        type: 'datetime',
                        ordinal: false
                    }
                };
            });
        });
        this.socket = io.connect(this.url);
        this.socket.on('climate_update', function (data) {
            if (_this.arrClimate.server === data.server) {
                _this.arrClimate = data;
                _this.chartClimate.series[0].addPoint([(new Date()).valueOf(), parseFloat(_this.arrClimate.cli_view_temp.toString())]);
                _this.chartClimate.series[1].addPoint([(new Date()).valueOf(), parseFloat(_this.arrClimate.cli_view_humi.toString())]);
                _this.chartClimate.series[2].addPoint([(new Date()).valueOf(), parseFloat(_this.arrClimate.cli_view_light.toString())]);
                _this.chartClimate.series[3].addPoint([(new Date()).valueOf(), parseFloat(_this.arrClimate.cli_view_co2.toString())]);
            }
        });
        this.socket.on('irrigation_update', function (data) {
            if (_this.arrIrrigation.server === data.server) {
                _this.arrIrrigation = data;
                _this.chartIrrigation.series[0].addPoint([(new Date()).valueOf(), parseFloat(_this.arrIrrigation.irr_view_ph.toString())]);
                _this.chartIrrigation.series[1].addPoint([(new Date()).valueOf(), parseFloat(_this.arrIrrigation.irr_view_ec.toString())]);
                _this.chartIrrigation.series[2].addPoint([(new Date()).valueOf(), parseFloat(_this.arrIrrigation.irr_view_waterTemp.toString())]);
                _this.chartIrrigation.series[3].addPoint([(new Date()).valueOf(), parseFloat(_this.arrIrrigation.irr_view_OxygenConc.toString())]);
            }
        });
    };
    ServerDetailComponent.prototype.onPointClimatesSelect = function (e) {
        var series_name = e.context.series.name;
        var type = "";
        switch (series_name) {
            case "CO2 Injection":
                type = "ppm";
                break;
            case "Light Intensity":
                type = "Cd";
                break;
            case "Environment Huminity":
                type = "%";
                break;
            case "Environment Temperature":
                type = "&#8451;";
                break;
        }
        this.pointClimatesSelect = {
            "name": series_name,
            "value": ": " + e.context.y + " " + type,
            "date": this.convertDate(e.context.x)
        };
    };
    ServerDetailComponent.prototype.convertDate = function (date) {
        return new Date(date).toLocaleString();
    };
    ServerDetailComponent.prototype.onPointIrrigationsSelect = function (e) {
        var series_name = e.context.series.name;
        var type = "";
        switch (series_name) {
            case "PH":
            case "EC":
                type = "";
                break;
            case "Water Temperature":
                type = "&#8451;";
                break;
            case "Oxygen Concentration In Water":
                type = "ppm";
                break;
        }
        this.pointIrrigationsSelect = {
            "name": series_name,
            "value": ": " + e.context.y + " " + type,
            "date": this.convertDate(e.context.x)
        };
    };
    ServerDetailComponent.prototype.saveChartClimate = function (chart) {
        this.chartClimate = chart;
    };
    ServerDetailComponent.prototype.saveChartIrrigation = function (chart) {
        this.chartIrrigation = chart;
    };
    return ServerDetailComponent;
}());
ServerDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'server-detail.component.html',
        styleUrls: ['./server-detail.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.AlertService,
        index_1.ClimateService,
        index_1.IrrigationService,
        router_1.ActivatedRoute])
], ServerDetailComponent);
exports.ServerDetailComponent = ServerDetailComponent;
//# sourceMappingURL=server-detail.component.js.map