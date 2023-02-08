import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DashboardserviceService {
  constructor(private http: HttpClient) {}

  apiUrlListStatus1:string;
  apiUrlListStatus2:string;
  apiUrlExecutivePreferences:string;
  apiUrlSubscriptionBlends:string;
  apiUrlUserListRoleProducer:string;
  apiUrlUserListRoleExecutive:string;
  apiUrlUserListRoleEditor:string;
  apiUrlBusinessList:string;
  apiUrlPostDataCreatingNewUser:string;
  updateBusinessTeamDataApiUrl:string;
  archieveDataApiUrl:string;

  getResponseFromProjectsBusinessListStatus1() {
    this.apiUrlListStatus1 = `https://stage.blendedsense.com/api/projects/businesses/list?status=1`;
    return this.http.get(this.apiUrlListStatus1);
  }

  getResponseFromProjectsBusinessListStatus2() {
    this.apiUrlListStatus2 = `https://stage.blendedsense.com/api/projects/businesses/list?status=2`;
    return this.http.get(this.apiUrlListStatus2);
  }

  getResponseFromPreferencesExecutivePreferencesApi(){
      this.apiUrlExecutivePreferences='https://stage.blendedsense.com/api/preferences/executive_preferences';
      return this.http.get(this.apiUrlExecutivePreferences);
  }


  getResponseFromSubscriptionBlends(){
      this.apiUrlSubscriptionBlends ='https://stage.blendedsense.com/api/subscriptionBlends/list';
      return this.http.get(this.apiUrlSubscriptionBlends);
  }


  getResponseFromUserListRoleProducer(){
      this.apiUrlUserListRoleProducer='https://stage.blendedsense.com/api/users/users_list?role=producer';
        return this.http.get(this.apiUrlUserListRoleProducer)
  }


  getResponseFromUserListRoleExecutive(){
          this.apiUrlUserListRoleExecutive ='https://stage.blendedsense.com/api/users/users_list?role=executive';
          return this.http.get(this.apiUrlUserListRoleExecutive);
  }


  getResponseFromUserListRoleEditor(){
        this.apiUrlUserListRoleEditor = 'https://stage.blendedsense.com/api/users/users_list?role=editor';
        return this.http.get(this.apiUrlUserListRoleEditor);

  }

  getResponseFromUserListRoleBusinessList(){
          this.apiUrlBusinessList ='https://stage.blendedsense.com/api/business/list';
          return this.http.get(this.apiUrlBusinessList)
  }

  getResponseFromPostDatNewBusiness(formData){
        this.apiUrlPostDataCreatingNewUser ='https://stage.blendedsense.com/api/projects/businesses/add'
        return this.http.post(this.apiUrlPostDataCreatingNewUser,formData);
  }

  updateDaraInThisApi(updateInfo){
            this.updateBusinessTeamDataApiUrl= 'https://stage.blendedsense.com/api/projects/businesses/update'
            return this.http.put(this.updateBusinessTeamDataApiUrl,updateInfo);
  }

  moveDataToArchieveState(archieveInfo){
          this.archieveDataApiUrl = 'https://stage.blendedsense.com/api/projects/businesses/status'
          return this.http.put(this.archieveDataApiUrl,archieveInfo);
  }

  addBusinessToMyBusinessApi(bsId){

    let apiUrl = `https://stage.blendedsense.com/api/projects/${bsId}/assign_to_my_projects`;
      return this.http.post(apiUrl,bsId)

  }




}


