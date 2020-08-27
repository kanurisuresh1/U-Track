import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { ChangeEmailActionResponse } from '../../../../@theme/components/Model/ChangeEmailActionResponse';
import { ChangeEmailRespones } from '../../../../@theme/components/Model/ChangeEmailRespones';

@Component({
  selector: 'ngx-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  OtpCode: any;
  changeValue: any;

  constructor(private routes: Router, private http: HttpClient,
    private toasterService: NbToastrService, private uTrackService: UtrackService) { }

  ngOnInit(): void {
    if (localStorage.getItem("USER_ID") == null || localStorage.getItem("USER_ID") == "") {
      this.routes.navigate(["/login"]);
    }
  }

  changeEmail = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  submit() {

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('email', this.changeEmail.value.email);
    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<ChangeEmailRespones>(environment.apiBaseUrl + 'change_email', formData, { headers }).subscribe(response => {
      if (response) {
        console.log(response.message)
        console.log(response.data.verify_code)
        this.OtpCode = response.data.verify_code
        this.changeValue = prompt(response.message,"Please Enter Your OTP")
        if (this.OtpCode == this.changeValue) {

          this.changeEmailAddress();

        } else {
          alert("Your OTP Does Not Match")
        }

      }
    })

  }

  changeEmailAddress() {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('email', this.changeEmail.value.email);
    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<ChangeEmailActionResponse>(environment.apiBaseUrl + 'change_email_action', formData, { headers }).subscribe(response => {
      if (response) {
        alert(response.message)
      }
    })
  }
}
