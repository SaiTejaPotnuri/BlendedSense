import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.scss'],
})
export class ErrormessageComponent implements OnInit {
  @Input() styles: string = '';
  @Input() errorText: string = '';
  @Input() ststusOfErrorMessage:boolean=false;

  constructor() {}

  ngOnInit(): void {}
}
