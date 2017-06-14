import { Component, OnInit, ElementRef } from '@angular/core';

import { User } from '../../_models/index';
import { UserService, ClimateService } from '../../_services/index';

@Component({
    moduleId: module.id,
    selector: "app-header",
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css'] 
    
})

export class HeaderComponent implements OnInit {
    private servers : any[];
    private username = "";
    constructor(private elementRef:ElementRef, private climateService:ClimateService){}

    ngOnInit() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.firstName + " " + currentUser.lastName;
        this.climateService.getAllServerName().subscribe((servers) => {
            this.servers = servers;
        });
    }

    ngAfterViewInit(){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "assets/js/custom-scripts.js";
        this.elementRef.nativeElement.appendChild(s);
    }
}