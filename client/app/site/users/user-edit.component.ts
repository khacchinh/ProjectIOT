import { Component, OnInit }    from '@angular/core';
import { UserService, AlertService } from '../../_services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'user-edit.component.html'
})
export class UserEditComponent {

  private model: any = {};
  constructor(private userService : UserService, private alertService : AlertService, private route: ActivatedRoute){}

  ngOnInit(){
      this.route.params.subscribe(params => {
            this.userService.getById(params['id'])
                .subscribe(user => {
                    this.model = user;
            });
        })  
  }

  updateUser(){
      /*
    this.userService.updateUsers(this.model)
        .subscribe(data=>{
          this.model = data;
          this.alertService.success("Update user success!!");
        })
    }
    */
  }
}
