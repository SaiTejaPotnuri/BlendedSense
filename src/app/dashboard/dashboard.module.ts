import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusecomponentsModule } from '../reusecomponents/reusecomponents.module';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { BussinessComponent } from './bussiness/bussiness.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverlayModule } from 'primeng/overlay';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ContainerComponent,
    BussinessComponent,
    SidebarComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReusecomponentsModule,
    AvatarModule,
    OverlayPanelModule,
    OverlayModule,
    InputTextModule,
    TableModule,
    NgxSpinnerModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,

  ],
})
export class DashboardModule {}
