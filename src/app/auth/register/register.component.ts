import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  dialogboxHeaderData: string = '';
  constructor(private router: ActivatedRoute, private routing: Router,private authService:AuthService) {}

  imagesList = {
    underConsruction: 'assets/images/underconstruction.png',
  };

  ngOnInit(): void {


   this.authService.checkUserLoggedInOrNotAndRedirect();
   
    this.router.queryParamMap.subscribe((paramas) => {
      console.log(paramas.get('onboarding_role'));
      paramas.get('onboarding_role') === 'creative'
        ? (this.dialogboxHeaderData = 'Dear Freelancer ')
        : (this.dialogboxHeaderData = 'Dear Customer');
    });
  }

  displayDialogBox: boolean = true;
  redirectToHomePage() {
    this.routing.navigate(['/login']);
  }
}
