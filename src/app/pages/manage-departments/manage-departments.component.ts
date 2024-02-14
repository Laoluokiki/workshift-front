import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.scss']
})
export class ManageDepartmentsComponent {
  allDept: any;

  constructor(
    private adminService: AdminService
  ){}

  getAllDepts(){
    this.adminService.getAllDept().subscribe((response: any)=>{
      console.log(response)
      this.allDept = response
    })
  }
}
