import { Component, OnInit }    from '@angular/core';
import { UserService, AlertService } from '../../_services/index';

declare var $ : any;
@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  private allUser : any[];
  constructor(private userService : UserService, private alertService : AlertService){}

  ngOnInit(){
      this.userService.getAll().subscribe( users => {
        this.allUser = users;
      });
  }
  
  deleteUser(user_id : any){
    if (confirm("Are you sure??")){
      this.userService.delete(user_id).subscribe( (user) => {
        for (var i = 0; i < this.allUser.length;i++){
            if (this.allUser[i]._id == user_id)
              this.allUser.splice(i,1);
        }
      })
    }
    
  }
}
