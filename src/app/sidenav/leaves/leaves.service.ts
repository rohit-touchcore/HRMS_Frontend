import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LeavesService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  leaveRoutes: Array<{ path: string; name: string }> = [
    {
      path: './',
      name: 'Apply',
    },
    {
      path: './approve',
      name: 'Approve',
    },
  ];

  getAllManagers(): any {
    let userToken = localStorage.getItem('hrmstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
    };
    return new Promise((resolve, reject) => {
      let user = this.loginService.getUser();
      let data = {
        userid: user.id,
      };
      this.http
        .post(`${environment.BASE_URL}user/get-all-managers`, data, httpOptions)
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
  ApplyLeaves(data: {
    userid: string;
    managerids: Array<string>;
    startdate: string;
    enddate: string;
  }): any {
    let userToken = localStorage.getItem('hrmstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.BASE_URL}leave/apply`, data, httpOptions)
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
  getLeavesToApprove(): any {
    let user = this.loginService.getUser();
    let userToken = localStorage.getItem('hrmstoken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.BASE_URL}user/get-leaves-to-approve`,
          { userid: user.id },
          httpOptions
        )
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
}
