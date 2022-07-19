import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class SignUpService {
  constructor(private http: HttpClient) {}

  signup(userDetails: FormData): any {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment.BASE_URL}auth/signup`, userDetails)
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
