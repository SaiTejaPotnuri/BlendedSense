import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { DashboardserviceService } from 'src/app/Services/dashboardservice.service'

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class BussinessComponent {
  listOfServices = [{ name: 'My Businesses' }, { name: 'All Businesses' }]
  statusOfFetchingDataFromApi: boolean = false;
  gitChecking;
  dummy = { name: ' s  ' }
  usersData: any
  allBusinessData: any
  myBusinessData: any
  first: number = 0
  businessVerticalType: string
  iconPath: string
  showLoader: boolean = false
  typeOfFormInfo: string = ''
  saveButtonClickingStatus: boolean = false
  roleOfUser
  defaultSelectedItemList:Array<any>=[];

  // totalRecords: number = 0;
  listOfDataToFetch = [{ name: 'Active' }, { name: 'Archived' }]
  listofTypeOfInformation = [
    { name: 'All Types' },
    { name: 'Business' },
    { name: 'Organization' }
  ]
  apiUrlListStatus1: string
  apiUrlListStatus2: string

  businessType: boolean = false
  businessOrOrganizationTypeSelction: string
  activeStatus: number
  allUsersInfo: any = []
  selectedInfoBusinessOrOrganization: string
  totalRecordsDataToDisplay: any = []

  selectedBussiness: string = 'My Businesses'
  selectBussinessType: string = 'My Businesses'
  slectedTypeStatus: string = 'Active'
  selectedTypeStatusDefaultValueInDropDown = 'Active'
  selectBusinessOrOrganization: string = 'All Types'
  selectedbusinessOrOrganization: string = 'All Types'

  listofInputForms = [{ name: 'New Business' }, { name: 'New Organization' }]
  searchForm: FormGroup
  addNewBusinessOrOrganization: FormGroup
  responseFromApi: any
  responseFromApiListStatus1: any
  responseFromApiListStatus2: any
  businessLogoPathBinary
  loadingStatusInfo: boolean = false

  businessVertcalApiUrl
  responseFromBusinessVertcalApiUrl: any
  businessVertcalTypesWithIds: any
  fetchedSearchBoxData: string = ''
  displayBusinessForm: boolean = false
  selectedFormType: string = ''
  businessLogoPath: string | ArrayBuffer = ''
  listOfBusinessVertcials: any
  selectedBusinessVertical: string
  showDropDownFirstElementEmptyStatus: string = '  '
  fetchDataBasedGivenData: FormGroup
  listOfSubscriptionBlends: Array<any>
  listOfProducersInUserList: Array<any>
  listOfExectivesInUserList: Array<any>
  listOfEditorsInUserList: Array<any>
  listofBusinessData: Array<any>

  constructor (
    private fb: FormBuilder,
    private dashboardService: DashboardserviceService,
    private toasterService: ToastrService
  ) {
    this.searchForm = this.fb.group({
      searchText: ['']
    })

    this.fetchDataBasedGivenData = this.fb.group({
      businessCheck: [''],
      activeStatusCheck: [''],
      typesCheck: ['']
    })

    this.addNewBusinessOrOrganization = this.fb.group({
      businessLogo1: [''],
      businessName1: ['', Validators.required],
      businessVertical1: ['', Validators.required],
      subscriptionBlends1: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailIdInfo: ['', [Validators.required, Validators.email]],
      contentProducers: [''],
      productionMangers: [''],
      editorsList: [''],
      businessList: ['']
    })
  }

  ngOnInit () {
    this.slectedTypeStatus === 'Active'
      ? (this.activeStatus = 1)
      : (this.activeStatus = 2)

    this.callAllMethods();
  }

  callAllMethods(){
         this.getDataFromListStatus1Api();
         this.getDataFromExecutivePreferences();
         this.getUserListRoleProducersData();
         this.getSubscriptionBlends();
         this.getUserListRoleExecutive();
         this.getUserListRoleEditors();
         this.getDataBusinessList();
  }

  getSubscriptionBlends () {
    this.dashboardService.getResponseFromSubscriptionBlends().subscribe(res => {
      this.listOfSubscriptionBlends = res['subscriptionBlends']
    })
  }

  getUserListRoleProducersData () {
    this.dashboardService
      .getResponseFromUserListRoleProducer()
      .subscribe(res => {
        this.listOfProducersInUserList = res['users']
        this.listOfProducersInUserList.map(user => {
          user.fullName = user.firstName + ' ' + user.lastName
        })
        this.listOfProducersInUserList.sort((a, b) => {
          return a.fullName.localeCompare(b.fullName)
        })
      })
  }

  getUserListRoleExecutive () {
    this.dashboardService
      .getResponseFromUserListRoleExecutive()
      .subscribe(res => {
        this.listOfExectivesInUserList = res['users']
        this.listOfExectivesInUserList.map(user => {
          user.fullName = user.firstName + ' ' + user.lastName
        })
        this.listOfExectivesInUserList.sort((a, b) => {
          return a.fullName.localeCompare(b.fullName)
        })
      })
  }

  getUserListRoleEditors () {
    this.dashboardService.getResponseFromUserListRoleEditor().subscribe(res => {
      this.listOfEditorsInUserList = res['users']
      this.listOfEditorsInUserList.map(user => {
        user.fullName = user.firstName + ' ' + user.lastName
      })
      this.listOfEditorsInUserList.sort((a, b) => {
        return a.fullName.localeCompare(b.fullName)
      })
    })
  }

  getDataBusinessList () {
    this.dashboardService
      .getResponseFromUserListRoleBusinessList()
      .subscribe(res => {
        this.listofBusinessData = res['business']
        this.listofBusinessData = this.listofBusinessData.filter(
          user => user.name !== null
        )

        this.listofBusinessData.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      })
  }

  getDataFromExecutivePreferences () {
    this.dashboardService
      .getResponseFromPreferencesExecutivePreferencesApi()
      .subscribe(res => {
        this.responseFromBusinessVertcalApiUrl = res['businessTypes']
        this.fetchDataFromApi()
        //  this.showLoader = false;
      })
  }

  getDataFromListStatus1Api () {
    this.showLoader = true
    this.dashboardService
      .getResponseFromProjectsBusinessListStatus1()
      .subscribe(res => {
        this.responseFromApiListStatus1 = Object.entries(res)[0][1]
        this.getDataFromListStatus2Api()
      })
  }

  getDataFromListStatus2Api () {
    this.dashboardService
      .getResponseFromProjectsBusinessListStatus2()
      .subscribe(res => {
        this.responseFromApiListStatus2 = Object.entries(res)[0][1]
        this.getDataFromExecutivePreferences()
        this.statusOfFetchingDataFromApi = true
      })
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------//

  fetchDataFromApi () {
    // this.showLoader = true;
    if (this.statusOfFetchingDataFromApi) {
      this.first = 0
      let userInfoObject
      this.iconPath = ''
      this.slectedTypeStatus === 'Active'
        ? (this.activeStatus = 1)
        : (this.activeStatus = 2)

      this.activeStatus === 2
        ? (this.responseFromApi = this.responseFromApiListStatus2)
        : (this.responseFromApi = this.responseFromApiListStatus1)

      // making businessType to check with assigned in response
      this.selectedBussiness === 'My Businesses'
        ? (this.businessType = true)
        : (this.businessType = false)

      // BusinessVertcalTypesApi

      this.businessVertcalTypesWithIds = this.responseFromBusinessVertcalApiUrl
      this.allBusinessData = this.responseFromApi

      if (this.selectedBussiness !== 'All Businesses') {
        this.myBusinessData = this.allBusinessData.filter(
          business => business.assigned === this.businessType
        )
      }

      this.selectedBussiness === 'All Businesses'
        ? (this.usersData = this.allBusinessData)
        : (this.usersData = this.myBusinessData)

      this.totalRecordsDataToDisplay = []
      //---------
      this.usersData.forEach(user => {
        user.type === '1'
          ? (this.selectedInfoBusinessOrOrganization = 'Business')
          : (this.selectedInfoBusinessOrOrganization = 'Organization')

        this.iconPath = user.bannerImage || ''

        this.businessVerticalType = this.businessVertcalTypesWithIds
          .filter(type => type.id === user.businessTypeId)
          .map(nameInfo => nameInfo.name)

        if (this.iconPath === '') {
          this.selectedInfoBusinessOrOrganization === 'Business'
            ? (this.iconPath = 'assets/images/businessesIcon.svg')
            : (this.iconPath = 'assets/images/organisationsIcon.svg')
        }

        userInfoObject = {
          icon: this.iconPath,
          name: user.name,
          type: this.selectedInfoBusinessOrOrganization,
          businessVertical: this.businessVerticalType
        }

        this.totalRecordsDataToDisplay.push(userInfoObject)
      })

      if (this.selectedbusinessOrOrganization === 'Business') {
        this.totalRecordsDataToDisplay = this.totalRecordsDataToDisplay.filter(
          user => user.type === 'Business'
        )
      } else if (this.selectedbusinessOrOrganization === 'Organization') {
        this.totalRecordsDataToDisplay = this.totalRecordsDataToDisplay.filter(
          user => user.type === 'Organization'
        )
      }

      if (this.fetchedSearchBoxData !== '') {
        console.log('Came inside ')

        this.totalRecordsDataToDisplay = this.totalRecordsDataToDisplay.filter(
          user =>
            user.name
              .toLowerCase()
              .includes(this.fetchedSearchBoxData.toLowerCase())
        )
      }
      this.totalRecordsDataToDisplay.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else {
          return -1
        }
      })

      this.showLoader = false
    }
  }

  checkTypeOfService (selectedService) {
    this.showLoader = true
    setTimeout(() => {
      this.selectedBussiness = selectedService.name
      this.fetchDataFromApi()
      this.showLoader = false
    }, 1000)
  }
  checkType (selectedType) {
    this.showLoader = true
    setTimeout(() => {
      this.slectedTypeStatus = selectedType.name
      this.fetchDataFromApi()
      this.showLoader = false
    }, 1000)
  }

  fetchParticularTypeInfo (selectedTypeOfInfo) {
    this.selectedbusinessOrOrganization = selectedTypeOfInfo.name
    this.showLoader = false
    this.fetchDataFromApi()
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------

  openNewForm (typeOfForm) {
    this.displayBusinessForm = true;
    this.loadingStatusInfo = false;
    this.businessLogoPath="";
    this.saveButtonClickingStatus = false;

    let roleInfo = JSON.parse(localStorage.getItem('bs_valid'));
    this.roleOfUser = roleInfo.user.role.name;
     let roleOfUserName = roleInfo.user.firstName + ' ' + roleInfo.user.lastName

        if(this.roleOfUser === 'producer'){
              this.defaultSelectedItemList.push(this.listOfProducersInUserList.filter((user) => user.fullName === roleOfUserName)[0]);
        }
        else if(this.roleOfUser === 'executive'){
              this.defaultSelectedItemList.push(this.listOfExectivesInUserList.filter((user) => user.fullName === roleOfUserName)[0]);
        }
        else if(this.roleOfUser === 'editor'){
              this.defaultSelectedItemList.push(this.listOfEditorsInUserList.filter((user)=> user.fullName === roleOfUserName)[0]);
        }
        else{
            this.defaultSelectedItemList=[];
        }

    this.typeOfFormInfo = typeOfForm;
    this.addNewBusinessOrOrganization.reset();
    this.selectedFormType = typeOfForm;
    this.listOfBusinessVertcials = this.responseFromBusinessVertcalApiUrl;
  }

  fetchSearchingText (data) {
    this.fetchedSearchBoxData = data
    this.fetchDataFromApi()
  }
  cancelDialog () {
    this.displayBusinessForm = false
  }

  fetchSelectedImage (e) {
    let path
    let file
    this.businessLogoPath = ''
    this.businessLogoPathBinary = e.target.files[0]
    const reader = new FileReader()
    ;[file] = e.target.files
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.businessLogoPath = reader.result as string
    }

    // this.newForm.setValue({
    //   businessLogo: this.businessLogoPath,
    // });
  }

  checkIfErrorOrNotInFormDialogBox (
    formControlNameInfo: string,
    givenFormGroup: any
  ): boolean {
    return (
      ((givenFormGroup.get(formControlNameInfo).touched ||
        givenFormGroup.get(formControlNameInfo).dirty) &&
        givenFormGroup.get(formControlNameInfo).errors !== null &&
        givenFormGroup.get(formControlNameInfo).errors.required) ||
      (givenFormGroup.get(formControlNameInfo).invalid &&
        this.saveButtonClickingStatus === true)
    )

    // return (givenFormGroup.get(formControlNameInfo).value === null &&
    //   (givenFormGroup.get(formControlNameInfo).touched ||givenFormGroup.get(formControlNameInfo).dirty));
  }

  checkDataAvailableOrNot (formGroupType, fcn) {
    if (
      formGroupType.get(fcn).value === null ||
      formGroupType.get(fcn).value === undefined
    ) {
      let temp = ''
      return temp
    } else {
      return formGroupType.get(fcn).value.id
    }
  }

  checkDataAvailableInTheArrayOrNot (formGroupType1, fcn1) {
    if (
      formGroupType1.get(fcn1).value === null ||
      formGroupType1.get(fcn1).value === undefined
    ) {
      let temp = []
      return temp
    } else {
      return formGroupType1.get(fcn1).value.map(producer => producer.id)
    }
  }

  uploadNewFormData () {
    this.loadingStatusInfo = true
    this.saveButtonClickingStatus = true
    var fd = new FormData()
    let fullNameUser: string
    let presentDate = new Date().toJSON().slice(0, 10)
    let bannerImageInfo = this.businessLogoPathBinary || ''
    let statusInfo: string = '1' || ''
    let typeOfFormInfoId
    let subscriptionBlendIdsDData = this.checkDataAvailableOrNot(
      this.addNewBusinessOrOrganization,
      'subscriptionBlends1'
    )
    let pointOfContactIdInfo = this.checkDataAvailableOrNot(
      this.addNewBusinessOrOrganization,
      'businessList'
    )
    let businessTypeIdInfo = this.checkDataAvailableOrNot(
      this.addNewBusinessOrOrganization,
      'businessVertical1'
    )

    let producerIdsInfo: Array<number> | string =
      this.checkDataAvailableInTheArrayOrNot(
        this.addNewBusinessOrOrganization,
        'contentProducers'
      )

    let executiveIdsInfo: Array<number> | string =
      this.checkDataAvailableInTheArrayOrNot(
        this.addNewBusinessOrOrganization,
        'productionMangers'
      )

    let editorIdsInfo: Array<number> | string =
      this.checkDataAvailableInTheArrayOrNot(
        this.addNewBusinessOrOrganization,
        'editorsList'
      )

    this.typeOfFormInfo === 'New Business'
      ? (typeOfFormInfoId = 1)
      : (typeOfFormInfoId = 2)

    let roleInfo = JSON.parse(localStorage.getItem('bs_valid'))
    this.roleOfUser = roleInfo.user.role.name
   

        
        
    fullNameUser =
      this.addNewBusinessOrOrganization.get('firstName').value +
      ' ' +
      this.addNewBusinessOrOrganization.get('lastName').value

    fd.append('name', fullNameUser)
    fd.append('date', presentDate)
    fd.append('businessId', '')
    fd.append('subscriptionBlendIds', subscriptionBlendIdsDData)
    fd.append('producerIds', JSON.stringify(producerIdsInfo))
    fd.append('executiveIds', JSON.stringify(executiveIdsInfo))
    fd.append('editorIds', JSON.stringify(editorIdsInfo))
    fd.append('bannerImage', bannerImageInfo)
    fd.append('status', statusInfo)
    fd.append('pointOfContactId', pointOfContactIdInfo)
    fd.append('businessTypeId', businessTypeIdInfo)
    fd.append('type', typeOfFormInfoId)
    fd.append(
      'firstName',
      this.addNewBusinessOrOrganization.get('firstName').value
    )
    fd.append(
      'lastName',
      this.addNewBusinessOrOrganization.get('lastName').value
    )
    fd.append(
      'email',
      this.addNewBusinessOrOrganization.get('emailIdInfo').value
    )
    fd.append('role', this.roleOfUser)

    if (this.addNewBusinessOrOrganization.valid) {
      this.saveButtonClickingStatus = false
      this.dashboardService.getResponseFromPostDatNewBusiness(fd).subscribe(
        res => {
          console.log(res, 'response')
          this.loadingStatusInfo = false
          this.toasterService.success(`${res['message']}`, '');
           this.addNewBusinessOrOrganization.reset();
           this.displayBusinessForm = false;
           
           this.callAllMethods();
           
        },
        err => {
          this.loadingStatusInfo = false
        }
      )
      

    } else {
      this.loadingStatusInfo = false
    }
  }

  checkFormValidAndButtonClicked (): boolean {
    return (
      this.addNewBusinessOrOrganization.invalid &&
      this.saveButtonClickingStatus === true
    )
  }
}
