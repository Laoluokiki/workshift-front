import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';

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
    component: ManageDepartmentsComponent
  }
];
