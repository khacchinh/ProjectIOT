import { Component, OnInit }    from '@angular/core';
import { ClimateService, IrrigationService, AlertService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'server-edit.component.html'
})
export class ServerEditComponent {
    private model: any = {};
    private old_server : string;
    constructor(
        private climateService : ClimateService,  
        private irrigationService : IrrigationService,
        private alertService : AlertService, 
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.climateService.getById(params['id'])
                .subscribe(data => {
                    this.model = data;
                    this.old_server = data.server;
            });
        })  
    }

    updateServer(){ 
        this.climateService.update(this.old_server, this.model).subscribe(doc1=>{
            this.irrigationService.update(this.old_server, this.model).subscribe(doc2=>{
                this.alertService.success("Update user success!!");
            });
        });
    }
}
