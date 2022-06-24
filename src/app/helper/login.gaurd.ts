import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { LoginService } from '../login/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.getUser();
    if (Object.keys(currentUser).length) {
      // logged in so return false and navigate to index
      this.router.navigate(['/']);
      return false;
    }

    // not logged in return true and navigate to login page
    return true;
  }
}
