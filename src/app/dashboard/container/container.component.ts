import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {

  changeSideBarScreenWidthStatus:boolean=false;
  

  minimizeSideBarStatus(minimizeSideBar:boolean)
  {
      //  console.log(minimizeSideBar);
        
      this.changeSideBarScreenWidthStatus = minimizeSideBar;
      
  } 
}
