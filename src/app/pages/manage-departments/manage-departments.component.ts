import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IActionButton, IPagination, ITableColumn } from 'src/app/core/model/table.model';
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
  selectedDept: any;

  constructor(
    private adminService: AdminService,
    private notifier: NotificationService,
    private router: Router
  ){
    this.getAllDepts()
  }

  public deptColumns: ITableColumn[] = [
    {
      name: "Department",
      type: "text",
      key: "name_of_department"
    },
    {
      name: "Actions",
      type: "action",
      key: "action"
    }
  ];

  takeAction(e: any){
    let result: any;
    switch (e?.action) {
      case 'view':
        result = this.selectedDept = e?.record
        console.log(this.selectedDept)
        this.router.navigate([`/main/view-roles/${this.selectedDept.id}`]);
        break;
        case 'view':
          result =''
          break;
      default:
        result = "Other";
    }

    return result;
  }

  public actionButtons: IActionButton[] = [
    {
      label: "View",
      action: "view",
      icon: "eye",
    }
  ];

  getAllDepts(){
    this.adminService.getAllDept().subscribe((response: any)=>{
      console.log(response)
      this.allDept = response
    },error =>{
      this.notifier.error(error.statusText)
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
    },error =>{
      this.notifier.error(error.statusText)
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
