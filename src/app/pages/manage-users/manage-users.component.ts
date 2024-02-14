import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  users: any;

  constructor(
    private adminService: AdminService
  ){}

  getAllUsers(){
    this.adminService.getAllUser().subscribe((response: any)=>{
      console.log(response)
      this.users = response
    })
  }
}
