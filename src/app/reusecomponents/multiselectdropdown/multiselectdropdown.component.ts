import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-multiselectdropdown',
  templateUrl: './multiselectdropdown.component.html',
  styleUrls: ['./multiselectdropdown.component.scss']
})
export class MultiselectdropdownComponent {


  @Input() listofitems;
  @Input() selecteditems;
  @Input() FormGroupName:FormGroup;
  @Input() FromControlerName;
  @Input() placeHolder="";
  @Input() dropDownDiv;
  @Input() labelStyle;
  @Input() optionalLabelInfo;
  @Input() idInfo;
  @Input() pointOfContactData
  multiDropDownFirstElement
  defaultSelecteditemData

  @Output() selectedItemsList = new EventEmitter<string>()


  constructor(private tosterService:ToastrService){}



  checkDefaultValueExistOrNot(choosenData){

   
      let fetchPOCDataFromSelctedList;
      let pOC=[]


      if( this.pointOfContactData !== undefined){

            fetchPOCDataFromSelctedList = choosenData.filter(prod => prod.id === this.pointOfContactData.id)
              
              
            if(fetchPOCDataFromSelctedList.length === 0){
              pOC.push(this.pointOfContactData)
              choosenData.push(this.pointOfContactData)

              choosenData.sort((a,b)=>{
                    return a.fullName.localeCompare(b.fullName);
              })


              choosenData.length ===1 ?  this.selecteditems = pOC : this.selecteditems = choosenData

              
              this.tosterService.error("Cannot update point of contact!",'')
            }

      }
      


       

  }










  fetchSelectedItemsFromMultiselectDropDown(itemsList : Array<string>){
       // this.selectedItemsList.emit(itemsList)
    //   console.log("Emitting Data from Multi Select");
       
  }



}
