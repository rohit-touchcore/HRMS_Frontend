import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './SignUp.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private signUpService: SignUpService) {}

  password: boolean;
  email: boolean;
  loading: boolean = false;
  error: string = '';
  success: string = '';
  myfilename: string = '';
  roles: Array<{ name: string; value: number }> = [
    {
      name: 'Admin/HR',
      value: 2,
    },
    {
      name: 'Manager',
      value: 3,
    },
    {
      name: 'Employee',
      value: 4,
    },
  ];
  ngOnInit(): void {}

  signUpForm = new FormGroup({
    avatar: new FormControl(null),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    designation: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    cpassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  emptyMessages(event: string): void {
    this.error = event;
    this.success = event;
  }

  onReset(): void {
    this.signUpForm.reset();
    this.signUpForm.controls['firstname'].setErrors(null);
    this.signUpForm.controls['lastname'].setErrors(null);
    this.signUpForm.controls['designation'].setErrors(null);
    this.signUpForm.controls['phone'].setErrors(null);
    this.signUpForm.controls['email'].setErrors(null);
    this.signUpForm.controls['role'].setErrors(null);
    this.signUpForm.controls['password'].setErrors(null);
    this.signUpForm.controls['cpassword'].setErrors(null);
  }

  toFormData(formValue: any) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
  onSubmit(): any {
    if (this.signUpForm.controls.email.status == 'INVALID') {
      return;
    } else if (this.signUpForm.controls.password.status == 'INVALID') {
      return;
    } else if (
      this.signUpForm.value.cpassword !== this.signUpForm.value.password
    ) {
      return;
    } else {
      this.loading = true;
      this.signUpService
        .signup(this.toFormData(this.signUpForm.value))
        .then((res: any) => {
          this.success = res.message;
          this.loading = false;
          this.onReset();
        })
        .catch((err: any) => {
          this.error = err.error.message;
          this.loading = false;
        });
    }
  }
}
