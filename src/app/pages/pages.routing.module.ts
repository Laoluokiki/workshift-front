import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageShiftComponent } from './manage-shift/manage-shift.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent
  },
  {
    path: 'manage-dept',
    component: ManageDepartmentsComponent
  },
  {
    path: 'manage-admins',
    component: ManageAdminsComponent
  },
  {
    path: 'view-roles/:id',
    component: ManageRolesComponent
  },
  {
    path: 'manage-shift',
    component: ManageShiftComponent
  }
];
