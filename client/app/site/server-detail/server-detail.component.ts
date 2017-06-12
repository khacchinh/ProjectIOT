import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Climate, Irrigation } from '../../_models/index';

import * as io from 'socket.io-client';

import { AlertService, ClimateService, IrrigationService } from '../../_services/index';


declare var series:any;
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
    private chartClimate: any;
    private chartIrrigation: any;
    private pointClimatesSelect : any;
    private pointIrrigationsSelect : any;

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
                console.log(data_chart);
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
                        data: data_chart.cli_view_temp,
                        allowPointSelect: true
                    },{
                        name: "Environment Huminity",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_humi,
                        allowPointSelect: true
                    },{
                        name: "Light Intensity",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_light,
                        allowPointSelect: true
                    },{
                        name: "CO2 Injection",
                        animation: false,
                        type: 'line',
                        data: data_chart.cli_view_co2,
                        allowPointSelect: true
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
                        data: data_chart.irr_view_ph,
                        allowPointSelect: true
                    },{
                        name: "EC",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_ec
                    },{
                        name: "Water Temperature",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_waterTemp,
                        allowPointSelect: true
                    },{
                        name: "Oxygen Concentration In Water",
                        animation: false,
                        type: 'line',
                        data: data_chart.irr_view_OxygenConc,
                        allowPointSelect: true
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
                this.chartClimate.series[0].addPoint([(new Date()).valueOf(), parseFloat(this.arrClimate.cli_view_temp.toString())]);
                this.chartClimate.series[1].addPoint([(new Date()).valueOf(), parseFloat(this.arrClimate.cli_view_humi.toString())]);
                this.chartClimate.series[2].addPoint([(new Date()).valueOf(), parseFloat(this.arrClimate.cli_view_light.toString())]);
                this.chartClimate.series[3].addPoint([(new Date()).valueOf(), parseFloat(this.arrClimate.cli_view_co2.toString())]);
            }
        });
        this.socket.on('irrigation_update', (data:any) => {
            if (this.arrIrrigation.server === data.server){
                this.arrIrrigation = data;
                this.chartIrrigation.series[0].addPoint([(new Date()).valueOf(), parseFloat(this.arrIrrigation.irr_view_ph.toString())]);
                this.chartIrrigation.series[1].addPoint([(new Date()).valueOf(), parseFloat(this.arrIrrigation.irr_view_ec.toString())]);
                this.chartIrrigation.series[2].addPoint([(new Date()).valueOf(), parseFloat(this.arrIrrigation.irr_view_waterTemp.toString())]);
                this.chartIrrigation.series[3].addPoint([(new Date()).valueOf(), parseFloat(this.arrIrrigation.irr_view_OxygenConc.toString())]);
            }
        });
    }

    onPointClimatesSelect (e) {
      var series_name = e.context.series.name;
      var type = "";
      switch (series_name){
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
          "name" : series_name,
          "value" : ": " +e.context.y + " " + type,
          "date" : this.convertDate(e.context.x)
      }
    }

    convertDate(date:any) : string{
        return new Date(date).toLocaleString();
    }

    onPointIrrigationsSelect (e) {
      var series_name = e.context.series.name;
      var type = "";
      switch (series_name){
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
          "name" : series_name,
          "value" : ": " +e.context.y + " " + type,
          "date" : this.convertDate(e.context.x)
      }
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
