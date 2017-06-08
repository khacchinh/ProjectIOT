import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Climate, Irrigation } from '../../_models/index';

import * as io from 'socket.io-client';

import { AlertService, ClimateService, IrrigationService } from '../../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'server-detail.component.html',
    styleUrls: ['./server-detail.component.css'] 
})

export class ServerDetailComponent implements OnInit {
    private url = 'http://localhost:4000';
    private socket : any;
    private arrClimate : Climate;
    private arrIrrigation : Irrigation;
    private optionsClimates: Object;
    private optionsIrrigations: Object;
    private chartClimate: Object;
    private chartIrrigation: Object;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private climateService: ClimateService,
        private irrigationService: IrrigationService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            var server = params['server'];
            //get data climate
            this.climateService.getAll(server).subscribe(data =>{
                this.arrClimate = data[0];
            });

            //get data irrigation
            this.irrigationService.getAll(server).subscribe(data =>{
                this.arrIrrigation = data[0];
            });

            this.climateService.getDataClimateChart(server).subscribe(data_chart=>{
                //add chart
                this.optionsClimates = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title : { text : 'chart climate control' },
                    series : [{
                        name: "Environment Temperature",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_temp
                    },{
                        name: "Environment Huminity",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_humi
                    },{
                        name: "Light Intensity",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_light
                    },{
                        name: "CO2 Injection",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_co2
                    }],
                    xAxis : {
                        type: 'datetime',
                        ordinal: false
                    }
                };
            });

            this.irrigationService.getDataIrrigatioChart(server).subscribe(data_chart=>{
                //add chart
                this.optionsIrrigations = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title : { text : 'chart irrigation control' },
                    series : [{
                        name: "PH",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_ph
                    },{
                        name: "EC",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_ec
                    },{
                        name: "Water Temperature",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_waterTemp
                    },{
                        name: "Oxygen Concentration In Water",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_OxygenConc
                    }],
                    xAxis : {
                        type: 'datetime',
                        ordinal: false
                    }
                };
            });
        })

        this.socket = io.connect(this.url);
        this.socket.on('climate_update', (data:any) => {
            if (this.arrClimate.server === data.server){
                this.arrClimate = data;
                this.chartClimate.series[0].addPoint([(new Date()).valueOf(), this.arrClimate.cli_view_temp]);
                this.chartClimate.series[1].addPoint([(new Date()).valueOf(), this.arrClimate.cli_view_humi]);
                this.chartClimate.series[2].addPoint([(new Date()).valueOf(), this.arrClimate.cli_view_light]);
                this.chartClimate.series[3].addPoint([(new Date()).valueOf(), this.arrClimate.cli_view_co2]);
            }
        });
        this.socket.on('irrigation_update', (data:any) => {
            if (this.arrIrrigation.server === data.server){
                this.arrIrrigation = data;
                this.chartIrrigation.series[0].addPoint([(new Date()).valueOf(), this.arrIrrigation.irr_view_ph]);
                this.chartIrrigation.series[1].addPoint([(new Date()).valueOf(), this.arrIrrigation.irr_view_ec]);
                this.chartIrrigation.series[2].addPoint([(new Date()).valueOf(), this.arrIrrigation.irr_view_waterTemp]);
                this.chartIrrigation.series[3].addPoint([(new Date()).valueOf(), this.arrIrrigation.irr_view_OxygenConc]);
            }
        });
    }

    saveChartClimate(chart){
        this.chartClimate = chart;
    }

    saveChartIrrigation(chart){
        this.chartIrrigation = chart;
    }
    /*
    onAfterSetExtremesX (e) {
      this.minX = e.context.min;
      this.maxX = e.context.max;
    }
    onAfterSetExtremesY (e) {
      this.minY = e.context.min;
      this.maxY = e.context.max;
    }
    */

}
