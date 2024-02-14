import { Component } from '@angular/core';
import { IPagination, ITableColumn } from 'src/app/core/model/table.model';
import { ICreateDept } from 'src/app/core/model/userRequest.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.scss']
})
export class ManageDepartmentsComponent {
  allDept: any;
  deptState: "deptTable" | "addDept" | "updateDept" = "deptTable"
name_of_department: any;

  constructor(
    private adminService: AdminService,
    private notifier: NotificationService
  ){
    this.getAllDepts()
  }

  public deptColumns: ITableColumn[] = [
    {
      name: "Department",
      type: "text",
      key: "name_of_department"
    },
    
  ];

  getAllDepts(){
    this.adminService.getAllDept().subscribe((response: any)=>{
      console.log(response)
      this.allDept = response
    })
  }

  onSubmit(form: any){
    this.adminService.createDept(form.value).subscribe((response: any)=>{
      console.log(response)
      if(response){
        this.notifier.success('Department Created!')
        form.reset()
        this.deptState = "deptTable"
        this.getAllDepts()
      }else{

      }
    },error=>{
      this.notifier.error(error.error.message)
    })
  }

  public pagination: IPagination = {
    next: "",
    previous: "",
    hasNext: false,
    hasPrevious: false,
    total: 0,
  };
}
