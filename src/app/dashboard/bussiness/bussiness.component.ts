import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { timeout } from 'rxjs'
import { DashboardserviceService } from 'src/app/Services/dashboardservice.service'

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class BussinessComponent {
  listOfServices = [{ name: 'My Businesses' }, { name: 'All Businesses' }]
  statusOfFetchingDataFromApi: boolean = false
  CheckingForGitHub
  dummy = { name: ' s  ' }
  usersData: any
  allBusinessData: any
  myBusinessData: any
  first: number = 0
  businessVerticalType: string
  test: string
  iconPath: string
  showLoader: boolean = false
  typeOfFormInfo: string = ''
  saveButtonClickingStatus: boolean = false
  roleOfUser
  defaultSelectedItemList: Array<any> = []
  archieveIconPath = 'assets/images/archieveIcon.svg'

  // totalRecords: number = 0;
  listOfDataToFetch = [
    { name: 'Active', id: 1 },
    { name: 'Archived', id: 2 }
  ]
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
  updateButtonClickingStatus: boolean = false
  listofInputForms = [{ name: 'New Business' }, { name: 'New Organization' }]
  searchForm: FormGroup
  addNewBusinessOrOrganization: FormGroup
  responseFromApi: any
  responseFromApiListStatus1: any
  responseFromApiListStatus2: any
  businessLogoPathBinary
  loadingStatusInfo: boolean = false
  editedData
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
  editAndDeleteButtonStatus: boolean = false
  editUserInfo
  editFormStatus: boolean = false
  readOnlyStatusValue: boolean = false

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
      businessList: [''],
      statusTypeValue: ['']
    })
  }

  ngOnInit () {
    this.slectedTypeStatus === 'Active'
      ? (this.activeStatus = 1)
      : (this.activeStatus = 2)

    this.callAllMethods()
  }

  callAllMethods () {
    this.getDataFromListStatus1Api()
    this.getDataFromExecutivePreferences()
    this.getUserListRoleProducersData()
    this.getSubscriptionBlends()
    this.getUserListRoleExecutive()
    this.getUserListRoleEditors()
    this.getDataBusinessList()
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
          businessVertical: this.businessVerticalType,
          allData: user
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
    this.displayBusinessForm = true
    this.readOnlyStatusValue = false
    this.addNewBusinessOrOrganization.reset()
    this.defaultSelectedItemList = []
    this.editFormStatus = false
    this.loadingStatusInfo = false
    this.businessLogoPath = ''
    this.saveButtonClickingStatus = false

    let roleInfo = JSON.parse(localStorage.getItem('bs_valid'))
    this.roleOfUser = roleInfo.user.role.name
    let roleOfUserName = roleInfo.user.firstName + ' ' + roleInfo.user.lastName

    if (this.roleOfUser === 'producer') {
      this.defaultSelectedItemList.push(
        this.listOfProducersInUserList.filter(
          user => user.fullName === roleOfUserName
        )[0]
      )
    } else if (this.roleOfUser === 'executive') {
      this.defaultSelectedItemList.push(
        this.listOfExectivesInUserList.filter(
          user => user.fullName === roleOfUserName
        )[0]
      )
    } else if (this.roleOfUser === 'editor') {
      this.defaultSelectedItemList.push(
        this.listOfEditorsInUserList.filter(
          user => user.fullName === roleOfUserName
        )[0]
      )
    } else {
      this.defaultSelectedItemList = []
    }

    this.typeOfFormInfo = typeOfForm
    this.addNewBusinessOrOrganization.reset()
    this.selectedFormType = typeOfForm
    this.listOfBusinessVertcials = this.responseFromBusinessVertcalApiUrl
  }

  fetchSearchingText (data) {
    this.fetchedSearchBoxData = data
    this.fetchDataFromApi()
  }
  cancelDialog () {
    this.displayBusinessForm = false
    this.editFormStatus = false
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
          this.toasterService.success(`${res['message']}`, '')
          this.addNewBusinessOrOrganization.reset()
          this.displayBusinessForm = false

          this.callAllMethods()
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
      (this.addNewBusinessOrOrganization.invalid &&
        this.saveButtonClickingStatus === true) ||
      (this.addNewBusinessOrOrganization.invalid &&
        this.updateButtonClickingStatus === true)
    )
  }
  activateEditAndDeleteDialogBox (edituserInfoData) {
    this.editAndDeleteButtonStatus = true
    this.editUserInfo = edituserInfoData
  }

  enableformForEdit () {
    this.editFormStatus = true
    this.readOnlyStatusValue = true
    this.selectedFormType = ''
    this.displayBusinessForm = true
    this.businessLogoPath = this.editUserInfo.icon
    this.listOfBusinessVertcials = this.responseFromBusinessVertcalApiUrl
    let businessVerticalName = this.editUserInfo.businessVertical[0]
    let businessVerticalObject = this.responseFromBusinessVertcalApiUrl.filter(
      bv => bv.name === businessVerticalName
    )
    let subscriptionBlendsData = this.listOfSubscriptionBlends.filter(
      sb => sb.id === this.editUserInfo.allData.subscriptionBlends[0].id
    )
    let firstNameInfo = this.editUserInfo.allData.userBusiness[0].user.firstName
    let lastNameInfo = this.editUserInfo.allData.userBusiness[0].user.lastName
    let emailidData = this.editUserInfo.allData.userBusiness[0].user.email

    //Producers Data
    let producersObject = this.editUserInfo.allData.producers.map(
      prod => prod.id
    )
    let producersData =
      producersObject.length !== 0
        ? this.listOfProducersInUserList.filter(
            producers => producersObject.indexOf(producers.id) !== -1
          )
        : []

    // Executives Data
    let executivesObject = this.editUserInfo.allData.executives.map(
      exe => exe.id
    )
    let executiveData =
      executivesObject.length !== 0
        ? this.listOfExectivesInUserList.filter(
            executer => executivesObject.indexOf(executer.id) !== -1
          )
        : []
    // Editors Data

    let editorsObject = this.editUserInfo.allData.editors.map(edi => edi.id)
    let editorsData1 =
      editorsObject.length != 0
        ? this.listOfEditorsInUserList.filter(
            editor => editorsObject.indexOf(editor.id) !== -1
          )
        : []

    // Point Of Contact
    let pocId =
      this.editUserInfo.allData.pointOfContactId != null
        ? parseInt(this.editUserInfo.allData.pointOfContactId)
        : -1
    let pocData = this.listOfProducersInUserList.filter(poc => poc.id === pocId)
    let statusValue1 = this.listOfDataToFetch.filter(
      sta => sta.id === this.editUserInfo.allData.status
    )

    this.editedData = {
      businessLogo1: this.businessLogoPath,
      businessName1: this.editUserInfo.name,
      businessVertical1: businessVerticalObject[0],
      subscriptionBlends1: subscriptionBlendsData[0],
      firstName: firstNameInfo,
      lastName: lastNameInfo,
      emailIdInfo: emailidData,
      contentProducers: producersData,
      productionMangers: executiveData,
      editorsList: editorsData1,
      businessList: pocData[0],
      statusTypeValue: statusValue1[0]
    }

    this.addNewBusinessOrOrganization.patchValue(this.editedData)
  }

  updateBusinessUserData () {
    //  this.editFormStatus= false;
    //  this.displayBusinessForm = false
    let date = new Date().toJSON()
    this.updateButtonClickingStatus = true
    let idInfo = this.editUserInfo.allData.id || -1
    let nameOfBusiness =
      this.addNewBusinessOrOrganization.get('businessName1').value || ''
    let websiteInfo = this.editUserInfo.allData.website || ''
    let businessTypeIdInfo =
      this.addNewBusinessOrOrganization.get('businessVertical1').value.id
    let instagramInfo = this.editUserInfo.allData.instagram
    let descriptionInfo = this.editUserInfo.allData.description
    let pinterestInfo = this.editUserInfo.allData.pinterest
    let callScheduledInfo = this.editUserInfo.allData.callScheduled
    let creditsInfo = this.editUserInfo.allData.credits
    let typeInfo = this.editUserInfo.allData.type
    let pointOfContactIdInfo =
      this.addNewBusinessOrOrganization.get('businessList').value.id
    let statusInfo =
      this.addNewBusinessOrOrganization.get('statusTypeValue').value.id
    let createdAtInfo = this.editUserInfo.allData.createdAt
    let updatedAtInfo = date
    let subscriptionBlendsInfo: Array<any> = []
    subscriptionBlendsInfo.push(
      this.addNewBusinessOrOrganization.get('subscriptionBlends1').value
    )

    let projectsInfo = this.editUserInfo.allData.projects
    let businessTeamInfo = this.editUserInfo.allData.businessTeam
    let userBusinessInfo = this.editUserInfo.allData.userBusiness
    let projectinfo: Array<any> = []
    projectinfo.push(this.editUserInfo.allData.project)

    let assignedStatus: boolean = this.editUserInfo.allData.assigned

    let projectTeamInfo = this.editUserInfo.allData.projectTeam
    let producersInfo: Array<any> = []
    producersInfo.push(
      this.addNewBusinessOrOrganization.get('contentProducers').value
    )

    let executivesInfo: Array<any> = []
    executivesInfo.push(
      this.addNewBusinessOrOrganization.get('productionMangers').value
    )
    let editorsInfo: Array<any> = []
    editorsInfo.push(this.addNewBusinessOrOrganization.get('editorsList').value)
    let firstNameInfo = this.addNewBusinessOrOrganization.get('firstName').value
    let lastNameInfo = this.addNewBusinessOrOrganization.get('lastName').value
    let emailInfo = this.addNewBusinessOrOrganization.get('emailIdInfo').value
    let producerIdsInfo = this.addNewBusinessOrOrganization
      .get('contentProducers')
      .value.map(prod => prod.id)
    let executiveIdsInfo = this.addNewBusinessOrOrganization
      .get('productionMangers')
      .value.map(exec => exec.id)
    let editorIdsInfo = this.addNewBusinessOrOrganization
      .get('editorsList')
      .value.map(edi => edi.id)
    let subscriptionBlendIdsInfo = this.addNewBusinessOrOrganization.get(
      'subscriptionBlends1'
    ).value.id
    let roleInf = JSON.parse(localStorage.getItem('bs_valid'))
    this.roleOfUser = roleInf.user.role.name

    let fdForUpdation = new FormData()

    fdForUpdation.append('id', idInfo)
    fdForUpdation.append('name', nameOfBusiness)
    fdForUpdation.append('website', websiteInfo)
    fdForUpdation.append('businessTypeId', businessTypeIdInfo)
    fdForUpdation.append('instagram', instagramInfo)
    fdForUpdation.append('description', descriptionInfo)
    fdForUpdation.append('pinterest', pinterestInfo)
    fdForUpdation.append('callScheduled', callScheduledInfo)
    fdForUpdation.append('credits', creditsInfo)
    fdForUpdation.append('type', typeInfo)
    fdForUpdation.append('pointOfContactId', pointOfContactIdInfo)
    fdForUpdation.append('status', statusInfo)
    fdForUpdation.append('createdAt', createdAtInfo)
    fdForUpdation.append('updatedAt', updatedAtInfo)
    fdForUpdation.append(
      'subscriptionBlends',
      JSON.stringify(subscriptionBlendsInfo)
    )
    fdForUpdation.append('projects', JSON.stringify(projectsInfo))
    fdForUpdation.append('businessTeam', JSON.stringify(businessTeamInfo))
    fdForUpdation.append('userBusiness', JSON.stringify(userBusinessInfo))
    fdForUpdation.append('project', JSON.stringify(projectinfo))
    fdForUpdation.append('assigned', JSON.stringify(assignedStatus))
    fdForUpdation.append('projectTeam', JSON.stringify(projectTeamInfo))
    fdForUpdation.append('producers', JSON.stringify(producersInfo))
    fdForUpdation.append('executives', JSON.stringify(executivesInfo))
    fdForUpdation.append('editors', JSON.stringify(editorsInfo))
    fdForUpdation.append('firstName', firstNameInfo)
    fdForUpdation.append('lastName', lastNameInfo)
    fdForUpdation.append('email', emailInfo)
    fdForUpdation.append('producerIds', JSON.stringify(producerIdsInfo))
    fdForUpdation.append('executiveIds', JSON.stringify(executiveIdsInfo))
    fdForUpdation.append('editorIds', JSON.stringify(editorIdsInfo))
    fdForUpdation.append(
      'subscriptionBlendIds',
      JSON.stringify(subscriptionBlendIdsInfo)
    )
    fdForUpdation.append('role', this.roleOfUser)

    if (this.addNewBusinessOrOrganization.valid) {
      this.dashboardService.updateDaraInThisApi(fdForUpdation).subscribe(
        res => {
          this.toasterService.success(`${res['message']}`, '')
          
            setTimeout(()=>{
              
              this.displayBusinessForm = false
              this.addNewBusinessOrOrganization.reset()
              this.editFormStatus = false
            },2000)

            this.getDataFromListStatus1Api()  
          
        },
        err => {
          console.log(err, 'Error')
        }
      )
    } else {
      console.log('Invalid')
    }
  }


    archeiveDataFromMyBusiness(){


      // statusTypeValue from addnewOrganization formgroup to get active or Archieve
      // we can do by a 2 lines add new key at particular position (role) and changing status value

         let roleInf = JSON.parse(localStorage.getItem('bs_valid'))
    this.roleOfUser = roleInf.user.role.name


      let fdForMoveItemToArchieve = new FormData()

        fdForMoveItemToArchieve.append('assigned',this.editUserInfo.allData.assigned)
        fdForMoveItemToArchieve.append('bannerImage', this.editUserInfo.allData.bannerImage)
        fdForMoveItemToArchieve.append('businessDetails', this.editUserInfo.allData.businessDetails)
        fdForMoveItemToArchieve.append('businessTeam', this.editUserInfo.allData.businessTeam)
        fdForMoveItemToArchieve.append('businessTypeId', this.editUserInfo.allData.businessTypeId)
        fdForMoveItemToArchieve.append('callScheduled', this.editUserInfo.allData.callScheduled)
        fdForMoveItemToArchieve.append('contactNumber', this.editUserInfo.allData.contactNumber)
        fdForMoveItemToArchieve.append('contactOwnerName', this.editUserInfo.allData.contactOwnerName)
        fdForMoveItemToArchieve.append('createdAt', this.editUserInfo.allData.createdAt)
        fdForMoveItemToArchieve.append('credits', this.editUserInfo.allData.credits)
        fdForMoveItemToArchieve.append('description', this.editUserInfo.allData.description)
        fdForMoveItemToArchieve.append('details', this.editUserInfo.allData.details)
        fdForMoveItemToArchieve.append('editors', this.editUserInfo.allData.editors)
        fdForMoveItemToArchieve.append('executives', this.editUserInfo.allData.executives)
        fdForMoveItemToArchieve.append('facebook', this.editUserInfo.allData.facebook)
        fdForMoveItemToArchieve.append('id', this.editUserInfo.allData.id)
        fdForMoveItemToArchieve.append('instagram', this.editUserInfo.allData.instagram)
        fdForMoveItemToArchieve.append('linkedin', this.editUserInfo.allData.linkedin)
        fdForMoveItemToArchieve.append('massivePortalId', this.editUserInfo.allData.massivePortalId)
        fdForMoveItemToArchieve.append('name', this.editUserInfo.allData.name)
        fdForMoveItemToArchieve.append('phoneNumber', this.editUserInfo.allData.phoneNumber)
        fdForMoveItemToArchieve.append('pinterest', this.editUserInfo.allData.pinterest)
        fdForMoveItemToArchieve.append('pointOfContactId', this.editUserInfo.allData.pointOfContactId)
        fdForMoveItemToArchieve.append('priceRangeId', this.editUserInfo.allData.priceRangeId)
        fdForMoveItemToArchieve.append('producers', this.editUserInfo.allData.producers)
        fdForMoveItemToArchieve.append('project', this.editUserInfo.allData.project)
        fdForMoveItemToArchieve.append('projectTeam', this.editUserInfo.allData.projectTeam)
        fdForMoveItemToArchieve.append('projects', this.editUserInfo.allData.projects)
        fdForMoveItemToArchieve.append('role',this.roleOfUser)
        fdForMoveItemToArchieve.append('smallImage', this.editUserInfo.allData.smallImage)
        fdForMoveItemToArchieve.append('status', "2")
        fdForMoveItemToArchieve.append('subscriptionBlends', this.editUserInfo.allData.subscriptionBlends)
        fdForMoveItemToArchieve.append('thumbnail', this.editUserInfo.allData.thumbnail)
        fdForMoveItemToArchieve.append('timeRangeId', this.editUserInfo.allData.timeRangeId)
        fdForMoveItemToArchieve.append('type', this.editUserInfo.allData.type)
        fdForMoveItemToArchieve.append('updatedAt', this.editUserInfo.allData.updatedAt)
        fdForMoveItemToArchieve.append('userBusiness', this.editUserInfo.allData.userBusiness)
        fdForMoveItemToArchieve.append('website', this.editUserInfo.allData.website)
        fdForMoveItemToArchieve.append('youtube', this.editUserInfo.allData.youtube)



       this.dashboardService.updateDaraInThisApi(fdForMoveItemToArchieve).subscribe(res=>{
              this.toasterService.success(`${res['message']}`, '')
              this.getDataFromListStatus1Api()


       })
     



        


        

        


        

        
        

        


        
        


        


        



    }






}
