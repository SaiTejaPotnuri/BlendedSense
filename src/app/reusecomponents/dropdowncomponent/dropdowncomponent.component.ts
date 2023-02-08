import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdowncomponent',
  templateUrl: './dropdowncomponent.component.html',
  styleUrls: ['./dropdowncomponent.component.scss'],
})
export class DropdowncomponentComponent implements OnInit {
  @Input() itemsList: Array<any>;
  @Input() selectedItem: string = '';

  @Input() placeHolder;
  @Input() Id;
  @Input()
  FormGroup: FormGroup;
  @Input() name = '';
  @Input() optinoalLabelInfo;
  @Input() displayLabel;
  @Input() dropDownDiv;
  @Input() dropDownIcondisplay;
  @Output() selectedItemInfo = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  fetchSelectedItems(itemSelected: string) {
    this.selectedItemInfo.emit(itemSelected);
    
  }
}
