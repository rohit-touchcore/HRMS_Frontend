import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { LoginService } from './login/auth.service';
import { SignUpService } from './signup/SignUp.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [LoginComponent, SignupComponent],
  exports: [
    LoginComponent,
    SignupComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [LoginService, SignUpService],
})
export class AuthModule {}
