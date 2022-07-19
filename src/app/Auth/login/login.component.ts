import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private route: Router) {}

  password: boolean;
  email: boolean;
  loading: boolean = false;
  message: string = '';
  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  emptyMessages(event: string): void {
    this.message = event;
  }

  onSubmit(): any {
    if (this.loginForm.controls.email.status == 'INVALID') {
      return;
    } else if (this.loginForm.controls.password.status == 'INVALID') {
      return;
    } else {
      this.loading = true;
      this.loginService
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .then((res: any) => {
          this.message = res.message;
          this.loading = false;
          localStorage.setItem('hrmstoken', res.token);
          this.loginService.saveDetails(res.data);
          this.route.navigate(['/']);
        })
        .catch((err: any) => {
          if (err.error.message == '' || !err.error.message) {
            this.message = 'Email or password is not correct!';
          } else {
            this.message = err.error.message;
          }
          this.loading = false;
        });
    }
  }
}
