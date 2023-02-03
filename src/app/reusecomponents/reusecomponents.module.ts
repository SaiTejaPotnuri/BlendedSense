import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputtagComponent } from './inputtag/inputtag.component';
import { ButtontagComponent } from './buttontag/buttontag.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { DropdowncomponentComponent } from './dropdowncomponent/dropdowncomponent.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiselectdropdownComponent } from './multiselectdropdown/multiselectdropdown.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { IconComponent } from './icon/icon.component';





@NgModule({
  declarations: [
    InputtagComponent,
    ButtontagComponent,
    ErrormessageComponent,
    DropdowncomponentComponent,
    MultiselectdropdownComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule
    
  ],
  exports: [
    InputtagComponent,
    ButtontagComponent,
    ErrormessageComponent,
    DropdowncomponentComponent,
    MultiselectdropdownComponent,
    IconComponent

  ],
})
export class ReusecomponentsModule {}
