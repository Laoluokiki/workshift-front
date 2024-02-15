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
  adminState: "addAdmin" | "adminTable" | "updateAdmin" = "adminTable"
username: any;
email: any;
password: any;
  selectedAdmin: any;
updated_username: any;
updated_email: any;
updated_password: any;
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
      case 'edit':
        result = this.selectedAdmin = e?.record
        this.adminState = "updateAdmin"
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
      label: "Update",
      action: "edit",
      icon: "edit",
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

  onUpdate(form: any){
    const body = {
      "username": this.updated_username || this.selectedAdmin.username,
      "email": this.updated_email || this.selectedAdmin.email,
      "disabled": true,
      "password": this.updated_password || this.selectedAdmin.password
    }
    console.log(body)
    this.adminService.updateAdmin(body).subscribe((response: any)=>{
      console.log(response)
      if(response){
        this.notifier.success('Update Successfull!')
        this.adminState = "adminTable";
        this.getAllAdmin()
      }
    }, error=>{
      this.notifier.error(error.error.message)
    })
  }
}
