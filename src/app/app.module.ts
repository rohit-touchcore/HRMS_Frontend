import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { IndexComponent } from './index/index.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './sidenav/dashboard/dashboard.component';
import { LeavesComponent } from './sidenav/leaves/leaves.component';
import { AttendanceComponent } from './sidenav/attendance/attendance.component';
import { ApplyComponent } from './sidenav/leaves/apply/apply.component';
import { LeaveheaderComponent } from './sidenav/leaves/leaveheader/leaveheader.component';
import { ApproveComponent } from './sidenav/leaves/approve/approve.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    LoaderComponent,
    SnackbarComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    LeavesComponent,
    AttendanceComponent,
    ApplyComponent,
    LeaveheaderComponent,
    ApproveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
