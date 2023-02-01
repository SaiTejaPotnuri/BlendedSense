import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Gurds/auth.guard';
import { BussinessComponent } from './bussiness/bussiness.component';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContainerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: BussinessComponent },
      { path: '', redirectTo: '/user/projects', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
