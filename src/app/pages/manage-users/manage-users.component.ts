import { Component } from '@angular/core';
import {
  IActionButton,
  IPagination,
  ITableColumn,
} from 'src/app/core/model/table.model';
import { UserResponse } from 'src/app/core/model/userResponse.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

interface IUserRoles {
  role_id: number;
  date_created: string;
  id: number;
  user_id: number;
  roleData: RoleData;
}

interface RoleData {
  department_id: string;
  id: number;
  name_of_role: string;
  describe_role: string;
  maximum_hour: number;
  minimum_hour: number;
  date_created: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users: UserResponse[];
  userPageState: 'addUser' | 'userTable' | 'viewUser' = 'userTable';
  username: any;
  email: any;
  password: any;
  allUserShifts: any[];
  currentUser: UserResponse;
  roles: any[];
  usersroles: any[];
  userRole: IUserRoles[];

  constructor(
    private _adminService: AdminService,
    private notifier: NotificationService
  ) {
    this.getAllUsers();
    this.getAllUsersShift();
    this.getAllRoles();
    this.getAllUsersRoles();
  }

  public userColumns: ITableColumn[] = [
    {
      name: 'First Name',
      type: 'text',
      key: 'first_name',
    },
    {
      name: 'Last Name',
      type: 'text',
      key: 'last_name',
    },
    {
      name: 'Email',
      type: 'text',
      key: 'email',
    },
    {
      name: 'Phone Number',
      type: 'text',
      key: 'phone_number',
    },
    {
      name: 'Date of Birth',
      type: 'text',
      key: 'date_birth',
    },
    {
      name: 'Gender',
      type: 'text',
      key: 'gender',
    },

    {
      name: 'Actions',
      type: 'action',
      key: 'action',
    },
  ];
  public userRoleColumns: ITableColumn[] = [
    {
      name: 'Role Name',
      type: 'text',
      key: 'name_of_role',
    },
    {
      name: 'Maximum Hour',
      type: 'number',
      key: 'maximum_hour',
    },
    {
      name: 'Minimum Hour',
      type: 'number',
      key: 'minimum_hour',
    },
    {
      name: 'Role Description',
      type: 'text',
      key: 'describe_role',
    },

    {
      name: 'Created At',
      type: 'date',
      key: 'date_created',
    },
  ];

  takeAction(e: any) {
    let result: any;
    switch (e?.action) {
      case 'delete':
        result = '';
        break;
      case 'view':
        this.currentUser = e.record;
        this.userPageState = 'viewUser';
        this.userRole = this.usersroles
          ?.filter((role) => role.user_id == this.currentUser.id)
          ?.map((role) => {
            return {
              ...role,
              ...this.roles?.filter((r) => r.id == role.role_id)[0],
            };
          });
        console.log(this.userRole);
        break;
      default:
        result = 'Other';
    }

    return result;
  }

  public actionButtons: IActionButton[] = [
    {
      label: 'View',
      action: 'view',
      icon: 'eye',
    },
  ];

  public pagination: IPagination = {
    next: '',
    previous: '',
    hasNext: false,
    hasPrevious: false,
    total: 0,
  };

  getAllUsers() {
    this._adminService.getAllUser().subscribe((response: any) => {
      this.users = response;
      this.pagination.total = response.length || 0;
    });
  }

  getAllUsersShift() {
    this._adminService.getAllShifts().subscribe({
      next: () => {},
    });
  }
  getAllUsersRoles() {
    this._adminService.getAllUsersRoles().subscribe({
      next: (res: any) => {
        this.usersroles = res;
      },
    });
  }
  getAllRoles() {
    this._adminService.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
      },
    });
  }
}
