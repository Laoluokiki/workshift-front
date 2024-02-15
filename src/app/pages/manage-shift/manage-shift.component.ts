import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import {
  IActionButton,
  IPagination,
  ITableColumn,
} from 'src/app/core/model/table.model';
import { ICreateShift } from 'src/app/core/model/userRequest.model';
import { IShift } from 'src/app/core/model/userResponse.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-manage-shift',
  templateUrl: './manage-shift.component.html',
  styleUrls: ['./manage-shift.component.scss'],
})
export class ManageShiftComponent {
  roles: any[];
  role_id: string;
  shiftState: 'shiftTable' | 'addShift' | 'updateShift' = 'shiftTable';
  shifts: IShift[];
  no_of_resources: number;
  end_time: number;
  start_time: number;
  shift_id: number;
  u_no_of_resources: number;
  u_end_time: number;
  u_start_time: number;
  u_role_id: string;


  constructor(
    private adminService: AdminService,
    private notifier: NotificationService
  ) {
    this.getAllRoles();

    this.getAllShifts();
  }

  getAllRoles() {
    this.adminService.getRoles().subscribe(
      (response: any) => {
        this.roles = response;
        console.log(this.roles);
      },
      (error) => {
        this.notifier.error(error.statusText);
      }
    );
  }

  getAllShifts() {
    this.adminService.getShifts().subscribe({
      next: (res: any) => {
        this.shifts = res;
      },
    });
  }

  public shiftColumns: ITableColumn[] = [
    {
      name: 'ID',
      type: 'number',
      key: 'id',
    },
    {
      name: 'No of Resources',
      type: 'number',
      key: 'no_of_resources',
    },
    {
      name: 'Start Time',
      type: 'hournumber',
      key: 'start_time',
    },
    {
      name: 'End Time',
      type: 'hournumber',
      key: 'end_time',
    },
    {
      name: 'Created At',
      type: 'date',
      key: 'date_created',
    },
    {
      name: 'Actions',
      type: 'action',
      key: 'action',
    },
  ];

  takeAction(e: any) {
    let result: any;
    switch (e?.action) {
      case 'edit':
        this.shift_id = e?.record?.id;
        this.shiftState = 'updateShift';
        this.u_role_id = e?.record?.role_id;
        this.u_start_time = e?.record?.start_time;
        this.u_end_time = e?.record?.end_time;
        this.u_no_of_resources = e?.record?.no_of_resources;
        break;
      case 'view':
        result = '';
        break;
      default:
        result = 'Other';
    }

    return result;
  }

  public actionButtons: IActionButton[] = [
    {
      label: 'Update',
      action: 'edit',
      icon: 'edit',
    },
  ];

  onSubmit(form: any) {
    const currentDate = new Date();

    const payload: ICreateShift = {
      date_created: currentDate.toISOString().split('T')[0],
      end_time: Number(this.end_time),
      start_time: Number(this.start_time),
      no_of_resources: Number(this.no_of_resources),
      role_id: parseInt(this.role_id),
    };
    const selectedRole = this.roles?.filter(
      (role) => role.id == this.role_id
    )[0];

    this.adminService.createShift(payload).subscribe(
      (response: any) => {
        if (response) {
          this.notifier.success('Role Added Successfully!');
          this.getAllShifts();
          this.shiftState = 'shiftTable';
          form.reset();
        }
      },
      (error) => {
        this.notifier.error(error.statusText);
      }
    );
  }

  onUpdate(form: any) {
    const currentDate = new Date();

    const payload: ICreateShift = {
      date_created: currentDate.toISOString().split('T')[0],
      end_time: Number(this.u_end_time),
      start_time: Number(this.u_start_time),
      no_of_resources: Number(this.u_no_of_resources),
      role_id: parseInt(this.u_role_id),
    };

    this.adminService.updateShift(payload, this.shift_id).subscribe(
      (response: any) => {
        this.notifier.success('Update Successfull!');
        this.shiftState = 'shiftTable';
        this.getAllShifts();
        form.reset();
      },
      (error) => {
        this.notifier.error(error.statusText);
      }
    );
  }
}
