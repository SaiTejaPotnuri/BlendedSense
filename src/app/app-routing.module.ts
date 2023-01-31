import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './auth/notfound/notfound.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    //{path:'',redirectTo:'/',pathMatch:'full'}
    {path:'register',component:RegisterComponent},
    {path:'onboarding',loadChildren:()=>import('./onboarding/onboarding.module').then((m)=>m.OnboardingModule)},
    {path:'user',loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)},
    {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
