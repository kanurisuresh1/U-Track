import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { NbToastrService } from '@nebular/theme';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { ChangeNumberResponse } from '../../../../@theme/components/Model/ChangeNumberResponse';
import { ChangeMobileActionResponse } from '../../../../@theme/components/Model/ChangeMobileActionResponse';

@Component({
  selector: 'ngx-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.scss']
})
export class ChangeNumberComponent implements OnInit {
  OtpCode: any;
  changeValue: any;

  constructor(private routes: Router,
    private http: HttpClient, private uTrackService: UtrackService,
    private toasterService: NbToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("USER_ID") == null || localStorage.getItem("USER_ID") == "") {
      this.routes.navigate(["/login"]);
    }
  }

  changenumber = new FormGroup({
    phonenumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  submit() {

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('mobile', this.changenumber.value.phonenumber);
    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<ChangeNumberResponse>(environment.apiBaseUrl + 'change_mobile', formData, { headers }).subscribe(response => {
      if (response) {
        console.log(response.data.verify_code)
        this.OtpCode = response.data.verify_code
        this.changeValue = prompt(response.message,"Please Enter Your OTP")
        if (this.OtpCode == this.changeValue) {

       this.changephoneNumber();

        } else {
          alert("Your OTP Does Not Match")
        }

      }
    })

  }

  changephoneNumber() {

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('mobile', this.changenumber.value.phonenumber);
    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<ChangeMobileActionResponse>(environment.apiBaseUrl + 'change_mobile_action', formData, { headers }).subscribe(response => {
      if (response) {
        alert(response.message)
      }
    })

  }

}
