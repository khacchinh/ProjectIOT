import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import { AlertService, ClimateService } from '../../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'server-detail.component.html'
})

export class ServerDetailComponent {
    private url = 'http://localhost:4000';
    private socket:any;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private climateService: ClimateService) { }

    ngOnInit() {
        this.climateService.getAll("server+name").subscribe((climates) => {
            console.log(climates);
        })

        this.socket = io.connect(this.url);
        this.socket.on('message', (data:any) => {
            console.log(data);
        });
    }

}
