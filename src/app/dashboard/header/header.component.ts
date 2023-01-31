import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  userInfo: any;
  userProfileImage: string;
  userFullName:string;

  ngOnInit(): void {
      this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('bs_valid'));
    this.userProfileImage = this.userInfo.user.profilePic;
    this.userFullName = this.userInfo.user.firstName +' '+ this.userInfo.user.lastName;
  }

  logout() {
    this.authService.logout();
  }
}
