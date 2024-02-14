import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent {
  constructor(
    private adminService: AdminService
  ){
    this.getAllAdmin()
  }

  getAllAdmin(){
    this.adminService.getAllAdmin().subscribe((response: any)=>{
      console.log(response)
    })
  }
}
