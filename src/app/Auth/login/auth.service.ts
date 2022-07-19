import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private route: Router) {}
  userData: any = {};

  saveDetails(user: any): any {
    this.userData = user;
    localStorage.setItem('HRMS_User', JSON.stringify(this.userData));
  }
  getUser(): any {
    let user = localStorage.getItem('HRMS_User');
    this.userData = JSON.parse(user || '{}');
    return this.userData;
  }

  login(loginCreds: { email: any; password: any }): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.BASE_URL}auth/signin`, loginCreds)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  logout(): void {
    localStorage.removeItem('HRMS_User');
    this.userData = {};
    this.route.navigate(['/login']);
  }
}
