import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';

//import imagePath from '@/Images/logoHeader.svg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  languageChangeForm:FormGroup;
  checkButtonClickedStatus: boolean = false;
  checkResetButtonClickedStatus: boolean = false;
  errorStatusForPasswordReset: boolean = false;
  languageSelecteFirst: string = 'English';
  isLoading: boolean = false;

  listOfLanguages = [
    { name: 'English' },
    { name: 'Mandarin' },
    { name: 'Hindi' },
    { name: 'Spanish' },
    { name: 'French' },
    { name: 'Arabic' },
    { name: 'Russian' },
    { name: 'Portuguese' },
    { name: 'Indonesian' },
  ];

  images = {
    logo: 'assets/images/logoHeader.svg',
    googleLogo: 'assets/images/googleLogo.svg',
    producer: 'assets/images/producer.svg',
    bussinessOwner: 'assets/images/businessOwner.svg',
    creater: 'assets/images/creative.svg',
    equipment: 'assets/images/photoshootEquipment.svg',
  };
  displayForgotPasswordDialogBoxStatus: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });

    this.languageChangeForm = this.fb.group({
      selectedLang: [''],
    });
  }

  ngOnInit(): void {
    this.authService.checkUserLoggedInOrNotAndRedirect();
    this.isLoading = false;

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.isLoading = true;
      } else if (e instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }

  checkIfErrorOrNot(formControlNameInfo: string, givenFormGroup: any): boolean {
    let errorStatus: boolean = false;
    if (
      (givenFormGroup.get(formControlNameInfo).invalid &&
        givenFormGroup.get(formControlNameInfo).touched) ||
      (this.checkButtonClickedStatus === true &&
        givenFormGroup.get(formControlNameInfo).invalid)
    ) {
      errorStatus = true;
    } else {
      errorStatus = false;
    }
    return errorStatus;
  }
  checkResetPasswordEmailEnteredOrNot(
    formControlNameInfo: string,
    givenFormGroup: any
  ): boolean {
    // if (
    //   (givenFormGroup.get(formControlNameInfo).invalid &&
    //     givenFormGroup.get(formControlNameInfo).touched) ||
    //   (this.checkResetButtonClickedStatus === true &&
    //     givenFormGroup.get(formControlNameInfo).invalid)
    // ) {
    //   this.errorStatusForPasswordReset = true;
    // } else {
    //   this.errorStatusForPasswordReset = false;
    // }
    return (
      (givenFormGroup.get(formControlNameInfo).invalid &&
        givenFormGroup.get(formControlNameInfo).touched) ||
      (this.checkResetButtonClickedStatus === true &&
        givenFormGroup.get(formControlNameInfo).invalid)
    );
  }

  signUpForm() {
    // this.isLoading = true;
    this.checkButtonClickedStatus = true;
    let responseFromLoginApi;
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      responseFromLoginApi = this.authService.login(this.loginForm.value);
      responseFromLoginApi.subscribe(
        (res) => {
          this.authService.setToken(res['token']);

          localStorage.setItem('bs_valid', JSON.stringify(res));
          this.toasterService.success(`${res['message']}`, '');
          setTimeout(() => {
            this.router.navigate(['/user']);
          }, 1500);
          this.loginForm.reset();
        },
        (error) => {
          // this.isLoading=false;
          console.log(error.message);
        }
      );

      this.checkButtonClickedStatus = false;
    }
  }

  submitPasswordResetEmailId() {
    this.checkResetButtonClickedStatus = true;
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      this.forgotPasswordForm.reset();
      this.checkResetButtonClickedStatus = false;
      this.displayForgotPasswordDialogBoxStatus = false;
    }
  }

  activateForgotPasswordDialogBox() {
    this.displayForgotPasswordDialogBoxStatus = true;
    this.checkButtonClickedStatus = false;
    this.checkResetButtonClickedStatus = false;
    this.errorStatusForPasswordReset = false;
    this.forgotPasswordForm.reset();
  }

  cancelDialogBox() {
    this.displayForgotPasswordDialogBoxStatus = false;
  }

  selectedLanguageFromList(item: any) {
    console.log(item.name);
  }

  signUp() {
    this.router.navigate(['/onboarding']);
  }
}
