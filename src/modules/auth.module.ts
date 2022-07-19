import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SignupComponent, LoginComponent],
  exports: [SignupComponent, LoginComponent],
  providers: [],
})
export class AuthModule {}
