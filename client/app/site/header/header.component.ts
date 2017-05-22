import { Component, OnInit, ElementRef } from '@angular/core';

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    selector: "app-header",
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(private elementRef:ElementRef){}

    ngOnInit() {
        
    }

    ngAfterViewInit(){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "assets/js/custom-scripts.js";
        this.elementRef.nativeElement.appendChild(s);
    }
}