import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';

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
  }
];
