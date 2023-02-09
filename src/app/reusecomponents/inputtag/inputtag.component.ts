import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inputtag',
  templateUrl: './inputtag.component.html',
  styleUrls: ['./inputtag.component.scss'],
})
export class InputtagComponent implements OnInit {
  @Input() typeOfInput: string = '';
  @Input() placeholder?: string = '';
  @Input()
  FormGroup: FormGroup;
  @Input() label?: string = '';
  @Input() name = '';
  @Input() fieldIcon;
  @Input() passwordId: string = '';
  @Input() styleClass: string;
  @Input() hideItem;
  @Input() readOnlyStatus;
  @Input() enableCrossSymbol
   enableIConCross:boolean= false;
   @Input() positionTheIcon2;
   eventInfo
   makeFetchApiMethodActive:boolean=false;
  @Output() showSearchingText = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    
  }


removeDataInInputText(){
    
  this.eventInfo.target.value='';
  this.showSearchingText.emit(this.eventInfo.target.value)
  this.enableIConCross=false



}



  showPassword() {
    if (this.passwordId === 'mypassword') {
      this.fieldIcon = 'pi pi-eye'
        ? (this.fieldIcon = 'pi pi-eye')
        : (this.fieldIcon = 'pi pi-eye-slash');
      let x: any = document.getElementById(this.passwordId);

      if (x.type === 'password') {
        x.type = 'text';
        this.fieldIcon = 'pi pi-eye';
      } else {
        x.type = 'password';
        this.fieldIcon = 'pi pi-eye-slash';
      }
    }
  }

  showSearchingTextChanged(textEntered) {

      this.eventInfo = textEntered;

      
      if(this.enableCrossSymbol === true && textEntered.target.value !== ''){
            this.enableIConCross = true;
      }
      else{
          this.enableIConCross = false
      }
    



    this.showSearchingText.emit(textEntered.target.value);

  }

  submitLoginDetails(values: any) {}
}
