import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReusecomponentsModule } from '../reusecomponents/reusecomponents.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { DialogModule } from 'primeng/dialog';
import { RegisterComponent } from './register/register.component';
import { OnboardingModule } from '../onboarding/onboarding.module';

import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [LoginComponent, NotfoundComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReusecomponentsModule,
    DialogModule,
    OnboardingModule,
    ToastModule,
  ],
})
export class AuthModule {}
