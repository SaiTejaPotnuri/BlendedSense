import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiselectdropdown',
  templateUrl: './multiselectdropdown.component.html',
  styleUrls: ['./multiselectdropdown.component.scss']
})
export class MultiselectdropdownComponent {


  @Input() listofitems;
  @Input() selecteditems;
  @Input() FormGroup:FormGroup;
  @Input() FromControlerName;
  @Input() placeHolder="";
  @Input() dropDownDiv;
  @Input() labelStyle;
  @Input() optionalLabelInfo;
  @Output() selectedItemsList = new EventEmitter<string>()



  fetchSelectedItemsFromMultiselectDropDown(itemsList : Array<string>){
       // this.selectedItemsList.emit(itemsList)
       console.log("Emitting Data from Multi Select");
       
  }



}
