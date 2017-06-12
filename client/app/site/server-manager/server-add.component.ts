import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, ClimateService, IrrigationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'server-add.component.html',
    styleUrls: ['./server-add.component.css']
})

export class ServerAddComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private climateService: ClimateService,
        private irrigationService : IrrigationService,
        private alertService: AlertService) { }

    addNew() {
        this.loading = true;
        this.climateService.create(this.model)
            .subscribe(
                data => {
                    this.irrigationService.create(this.model)
                        .subscribe(
                            data => {
                                this.alertService.success('Registration successful', true);
                                this.loading = false;
                            },
                            error => {
                                this.alertService.error(error._body);
                                this.loading = false;
                            }
                        );
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                }
            );
    }
}
