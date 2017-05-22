import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    selector: "app-footer",
    templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {
    ngOnInit() {
        
    }
}