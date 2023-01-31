import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  addBackgroundStyleForCard: string = '';
  labelToChangeText: string = 'Create Account';

  constructor(private primengconfig: PrimeNGConfig,private router:Router,private authService:AuthService) {}

  ngOnInit(): void {
   this.authService.checkUserLoggedInOrNotAndRedirect();
    this.primengconfig.ripple = true;
  }

  imagesData = {
    custmerLogo: 'assets/images/customerLogo.svg',
    freenlancerLogo: 'assets/images/freelancer.svg',
  };

  selectedCard(typeOfUser: string) {
    this.addBackgroundStyleForCard = typeOfUser;
    let selectedCard = document.getElementById(typeOfUser);
    if (typeOfUser === 'client') {
      this.labelToChangeText = ' Sign Up as Customer ';
      selectedCard.classList.add('cardOnclickStle');

      let unSelectedCard = document.getElementById('creative');
      unSelectedCard.classList.remove('cardOnclickStle');
    } else {
      this.labelToChangeText = ' Apply as Creative ';
      selectedCard.classList.add('cardOnclickStle');

      let unSelectedCard = document.getElementById('client');
      unSelectedCard.classList.remove('cardOnclickStle');
    }
  }

  signInForm(){
        this.router.navigate(['/register'], {
          queryParams: { onboarding_role: this.addBackgroundStyleForCard },
        });
  }
}
