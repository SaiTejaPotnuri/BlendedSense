import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  overlayVisible: boolean = false;
  minimizeSidebarStatus = false;
  @Output() minimizeSideBar = new EventEmitter<boolean>();

  imagesData = {
    headerLogo: 'assets/images/logoSideBar.svg',
    homeDashboard: 'assets/images/homedashboardicon.svg',
    BussinessLogo: 'assets/images/businessesLogo.svg',
    calendarLogo: 'assets/images/calendarLogo.svg',
    usersIcon: 'assets/images/usersIcon.svg',
    commentHelpIcon: 'assets/images/commentHelp.svg',
    logoShort: 'assets/images/logoShort.svg',
  };

  minimizeSidebar() {
    this.minimizeSidebarStatus = !this.minimizeSidebarStatus;
      this.minimizeSideBar.emit(this.minimizeSidebarStatus);
  }
}
