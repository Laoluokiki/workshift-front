import { Component } from '@angular/core';
import { IPagination, ITableColumn } from 'src/app/core/model/table.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent {
  roles: any; 
  roleState: "roleTable" | "addRole" | "updateRole" = "roleTable"
  constructor(
    private adminService: AdminService,
    private notifier: NotificationService
  ){
    this.getAllRoles()
  }
  getAllRoles(){
    this.adminService.getRoles().subscribe((response: any)=>{
      this.roles = response
      console.log(response)
    })
  }

  public roleColumns: ITableColumn[] = [
    {
      name: "Role",
      type: "text",
      key: "name_of_department"
    },
    
  ];

  public pagination: IPagination = {
    next: "",
    previous: "",
    hasNext: false,
    hasPrevious: false,
    total: 0,
  };
}
