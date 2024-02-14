import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent {
  roles: any; 
  constructor(
    private adminService: AdminService,
    private notifier: NotificationService
  ){

  }
  getAllRoles(){
    this.adminService.getRoles().subscribe((response: any)=>{
      this.roles = response
    })
  }
}
