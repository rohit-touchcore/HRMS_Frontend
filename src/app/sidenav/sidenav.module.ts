import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeavesComponent } from './leaves/leaves.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { SidenavComponent } from './sidenav.component';
import { ApplyComponent } from './leaves/apply/apply.component';
import { ApproveComponent } from './leaves/approve/approve.component';
import { SideNavOptionsService } from './sidenavoptions.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    LeavesComponent,
    DashboardComponent,
    AttendanceComponent,
    ApproveComponent,
    ApplyComponent,
    SidenavComponent,
  ],
  exports: [
    LeavesComponent,
    DashboardComponent,
    SidenavComponent,
    ApproveComponent,
    ApplyComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  providers: [SideNavOptionsService],
})
export class SideNavModule {}
