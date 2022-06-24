import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './sidenav/dashboard/dashboard.component';
import { LeavesComponent } from './sidenav/leaves/leaves.component';
import { AttendanceComponent } from './sidenav/attendance/attendance.component';

import { AuthGuard } from './helper/auth.gaurd';
import { LoginGuard } from './helper/login.gaurd';
import { ApplyComponent } from './sidenav/leaves/apply/apply.component';
import { ApproveComponent } from './sidenav/leaves/approve/approve.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'leaves',
        component: LeavesComponent,
        children: [
          { path: '', component: ApplyComponent },
          { path: 'approve', component: ApproveComponent },
        ],
      },
      { path: 'attendance', component: AttendanceComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
