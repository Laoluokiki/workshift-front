import { Component } from '@angular/core';
import { IActionButton, IPagination, ITableColumn } from 'src/app/core/model/table.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent {
  allAdmins: any;
  adminState: "addAdmin" | "adminTable" = "adminTable"
username: any;
email: any;
password: any;
  constructor(
    private adminService: AdminService,
    private notifier: NotificationService
  ){
    this.getAllAdmin()
  }

  public deptColumns: ITableColumn[] = [
    {
      name: "Username",
      type: "text",
      key: "username"
    },
    {
      name: "Email",
      type: "text",
      key: "email"
    },
    {
      name: " Date Created",
      type: "date",
      key: "date_created"
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
      case 'delete':
        result = ''
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
      label: "Delete",
      action: "delete",
      icon: "trash",
    },
    {
      label: "View",
      action: "view",
      icon: "eye"
    }
  ];

  public pagination: IPagination = {
    next: "",
    previous: "",
    hasNext: false,
    hasPrevious: false,
    total: 0,
  };


  getAllAdmin(){
    this.adminService.getAllAdmin().subscribe((response: any)=>{
      // console.log(response)
      this.allAdmins = response
    })
  }

  createAdmin(){
    // this.adminService.createAdmin()
  }

  onSubmit(form: any){
    // console.log(form.value)
    const existingFormData = form.value;
    existingFormData.disabled = true;
    // console.log(existingFormData)

    this.adminService.createAdmin(existingFormData).subscribe((response: any)=>{
      console.log(response)
      if(response){
        this.notifier.success('Admin Created Successfully!')
        form.reset()
        this.getAllAdmin()
        this.adminState = "adminTable"
      }
      
    }, error=>{
      this.notifier.error(error.error.message)
    })
  }
}
