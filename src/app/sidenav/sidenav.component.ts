import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../navbar.service';
import { LoginService } from '../login/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  imageUrl: string;
  constructor(
    public navBar: NavBarService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    let image = JSON.parse(localStorage.getItem('HRMS_User') || '{}')
    this.imageUrl =
      environment.IMAGE_URL + image.avatar ;
  }
}
