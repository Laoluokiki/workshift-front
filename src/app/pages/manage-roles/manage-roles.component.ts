import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { IActionButton, IPagination, ITableColumn } from 'src/app/core/model/table.model';
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
  departmentId: any;
  departmentRoles: any;
name_of_role: any;
describe_role: any;
minimum_hour: any;
maximum_hour: any;
  allDept: any;
  selectedRole: any;
updatedRoleName: any;
updatedRoleDesc: any;
updatedMinHour: any;
updatedMaxHour: any;
  selectedDept: any;
  constructor(
    private adminService: AdminService,
    private notifier: NotificationService,
    private route: ActivatedRoute,
  ){
    
    this.getAllRoles()
    this.route.params.subscribe(params => {
      // Access the id parameter
      this.departmentId = params['id'];
      console.log(this.departmentId, 'i am id')
    });
    this.getAllDepts()
  }
  getAllRoles(){
    this.adminService.getRoles().subscribe((response: any)=>{
      this.roles = response
      console.log(response)
      const filteredRole = this.roles.filter((item: { department_id: any; }) => item.department_id === this.departmentId)
      this.departmentRoles = filteredRole
    },error =>{
      this.notifier.error(error.statusText)
    })
  }

  getAllDepts(){
    this.adminService.getAllDept().subscribe((response: any)=>{
      console.log(response)
      this.allDept = response
      const selectedDept = response.filter((item: { id: any; }) => item.id === parseInt(this.departmentId))
      this.selectedDept = selectedDept[0]
      console.log(selectedDept)
    },error =>{
      this.notifier.error(error.statusText)
    })
  }

  public roleColumns: ITableColumn[] = [
    {
      name: "Role",
      type: "text",
      key: "name_of_role"
    },
    {
      name: "Min. hour",
      type: "number",
      key: "minimum_hour"
    },
    {
      name: "Max. hour",
      type: "number",
      key: "maximum_hour"
    },
    {
      name: "Role Desc.",
      type: "text",
      key: "describe_role"
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
        result = 
        this.selectedRole = e?.record
        this.roleState = "updateRole"

        break;
        case 'view':
          result =''
          break;
      default:
        result = "Other";
    }

    return result;
  }

  public pagination: IPagination = {
    next: "",
    previous: "",
    hasNext: false,
    hasPrevious: false,
    total: 0,
  };

  public actionButtons: IActionButton[] = [
    {
      label: "Update",
      action: "edit",
      icon: "edit",
    },
    
  ];
  

  onSubmit(form: any){
    const existingFormData = form.value
    existingFormData.department_id = this.departmentId;

    this.adminService.createRoles(existingFormData).subscribe((response: any)=>{
      console.log(response)
      if(response){
        this.notifier.success('Role Added Successfully!')
        this.roleState = "roleTable";
        this.getAllRoles()
        form.reset()
      }
    },error =>{
      this.notifier.error(error.statusText)
    })
  }

  onUpdate(form: any){
    const body = {
      "department_id": this.departmentId,
      "name_of_role": this.updatedRoleName || this.selectedRole.name_of_role,
      "describe_role": this.updatedRoleDesc || this.selectedRole.describe_role,
      "minimum_hour": this.updatedMinHour || this.selectedRole.minimum_hour,
      "maximum_hour": this.updatedMaxHour || this.selectedRole.maximum_hour
    }
    console.log(body)
    this.adminService.updateRoles(body).subscribe((response: any)=>{
      this.notifier.success('Update Successfull!')
      this.roleState = "roleTable"
      this.getAllRoles()
      form.reset()
    },error =>{
      this.notifier.error(error.statusText)
    })
  }
}
