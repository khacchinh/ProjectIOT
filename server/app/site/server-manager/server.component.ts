import { Component, OnInit }    from '@angular/core';
import { ClimateService, IrrigationService, AlertService } from '../../_services/index';

declare var $ : any;
@Component({
  moduleId: module.id,
  templateUrl: 'server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {

  private allServer : any[];
  constructor(private climateService : ClimateService, private irrigationService : IrrigationService,  private alertService : AlertService){}

  ngOnInit(){
      this.climateService.getAllServerName().subscribe( server => {
        this.allServer = server;
      });
  }
  
  deleteServer(server : any){
    if (confirm("Are you sure??")){
      this.climateService.delete(server).subscribe( (data) => {
        this.irrigationService.delete(server).subscribe( (data) => {
          for (var i = 0; i < this.allServer.length;i++){
              if (this.allServer[i].server == server)
                this.allServer.splice(i,1);
          }
        })
      })
    }
    
  }
}
