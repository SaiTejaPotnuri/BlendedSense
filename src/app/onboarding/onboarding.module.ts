import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { RoleComponent } from './role/role.component';
import { HeaderComponent } from './header/header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReusecomponentsModule } from '../reusecomponents/reusecomponents.module';
import { RippleModule } from 'primeng/ripple';



@NgModule({
  declarations: [RoleComponent, HeaderComponent],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    CardModule,
    ButtonModule,
    ReusecomponentsModule,
    RippleModule,
  ],
  exports: [HeaderComponent],
})
export class OnboardingModule {}
