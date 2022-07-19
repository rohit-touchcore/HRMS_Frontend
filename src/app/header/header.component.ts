import { Component, OnInit } from '@angular/core';
import { NavBarService } from './navbar.service';
import { LoginService } from '../Auth/login/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public navBar: NavBarService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}
  onToggle(): any {
    this.navBar.toggleOpen();
  }
  Logout(): any {
    this.loginService.logout();
  }
}
