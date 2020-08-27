import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, Login } from '../@theme/components/Model/LoginResponse';
import { NbToast, NbToastrService } from '@nebular/theme';
import swal from 'sweetalert2';
import { icon } from 'leaflet';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { UtrackService } from '../@theme/components/Services/Utrack.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  swal: any;
  userData: Login;
  isRemember: boolean;
  loginRemember: boolean
  loginNumber: string;
  loginPassword: string;
  loading: boolean;
  error = '';
  user_id: string
  constructor(private router: Router, private formBuilder: FormBuilder,
    private http: HttpClient, private toast: NbToastrService,
    private uTrackService: UtrackService) {
  }

  ngOnInit(): void {

    this.user_id = localStorage.getItem('USER_ID')
    if (this.user_id != null && this.user_id.length > 0) {
      this.router.navigate(["web"]);
    }
    if ('1' == localStorage.getItem("IS_REMEMBER")) {
      this.loginNumber = localStorage.getItem("LOGIN_MOBILE_NUMBER");
      this.loginPassword = localStorage.getItem("LOGIN_PASSWORD");
      this.isRemember = true;
    }
  }

  checked(e) {
    this.isRemember = e.target.checked;
  }

  loginForm = new FormGroup({
    number: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl('',)
  })


  ngOnDestroy(): void {
  }

  login() {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('mobile_number', this.loginForm.value.number);
    formData.append('password', this.loginForm.value.password);
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<LoginResponse>(environment.apiBaseUrl + 'user_login', formData, { headers }).subscribe(response => {
      if (response.status) {
        this.userData = response.data[0]
        this.uTrackService.USER_ID = this.userData.user_id
        localStorage.setItem('logUsrData', JSON.stringify(response.data[0]));
        localStorage.setItem("USER_ID", this.userData.user_id);
        localStorage.setItem("FIRST_NAME", this.userData.first_name);
        localStorage.setItem("LAST_NAME", this.userData.last_name);
        localStorage.setItem("MOBILE_CODE", this.userData.mobile_code);
        localStorage.setItem("MOBILE", this.userData.mobile);
        localStorage.setItem("PROFILE_IMAGE", this.userData.profile_image);
        localStorage.setItem("COMPNAY_LOGO", this.userData.company_logo);
        localStorage.setItem("COMPANY_NAME", this.userData.company_name);
        localStorage.setItem("REFERRAL_CODE", this.userData.referral_code);
        localStorage.setItem("REGISTERED_ID", this.userData.registered_by_id);
        localStorage.setItem('USER_TYPE', this.userData.user_type);
        swal.fire("Pragati Utrack", response.message, 'success');

        // this.toast.success(localStorage.getItem("first_name") + " Logged Successfully", "Utrack")
        if (this.isRemember) {
          localStorage.setItem("IS_REMEMBER", '1');
          localStorage.setItem("LOGIN_MOBILE_NUMBER", this.loginForm.value.number);
          localStorage.setItem("LOGIN_PASSWORD", this.loginForm.value.password);
        } else {
          localStorage.setItem("IS_REMEMBER", '0');
          localStorage.setItem("LOGIN_MOBILE_NUMBER", "");
          localStorage.setItem("LOGIN_PASSWORD", "");
        }

        this.router.navigate(["web"]);

      } else {

        // this.toasterService.showError(response.message, "Utrack")
        alert(response.message);
        swal.fire("Pragati Utarcak", response.message, 'error',)

      }
    })

  }
}


