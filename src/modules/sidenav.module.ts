import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApproveComponent } from 'src/app/sidenav/leaves/approve/approve.component';
import { ApplyComponent } from 'src/app/sidenav/leaves/apply/apply.component';
import { LeavesComponent } from 'src/app/sidenav/leaves/leaves.component';
import { DashboardComponent } from 'src/app/sidenav/dashboard/dashboard.component';
import { AttendanceComponent } from 'src/app/sidenav/attendance/attendance.component';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    ApproveComponent,
    LeavesComponent,
    ApplyComponent,
    DashboardComponent,
    AttendanceComponent,
    SidenavComponent,
  ],
  exports: [
    ApproveComponent,
    LeavesComponent,
    ApplyComponent,
    DashboardComponent,
    AttendanceComponent,
    SidenavComponent,
    SharedModule
  ],
  providers: [],
})
export class SideNavModule {}
