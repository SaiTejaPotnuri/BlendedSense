import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-buttontag',
  templateUrl: './buttontag.component.html',
  styleUrls: ['./buttontag.component.scss'],
})
export class ButtontagComponent implements OnInit {
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean;
  @Input() buttonStyleClass: string;
  @Input() buttonLoading: boolean;
  @Input() icontType;
  @Input() loadingStatus;
  @Input() iconPosition;

  changeButtonStatus: boolean = false;

  constructor() {}
  @Output() buttonClickStatus = new EventEmitter<any>();

  ngOnInit(): void {}

  checkButtonActiveStatus() {
    this.buttonClickStatus.emit();
  }
}
