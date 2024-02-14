import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent,
  },
  {
    path: 'register',
    component: AppSideRegisterComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
