import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerManagementDetails } from '../../../../@theme/components/Model/CustomerManagementDetails';
import { environment } from '../../../../../environments/environment';
import { BasicResponse } from '../../../../@theme/components/Model/Basic';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-customer-management',
  templateUrl: './add-customer-management.component.html',
  styleUrls: ['./add-customer-management.component.scss']
})
export class AddCustomerManagementComponent implements OnInit {

  states = []
  state_id: any;
  isAddUser: boolean = true;
  fileData: File = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  srcResult: any;
  previewUrl: any = "assets/img/defaultpic.png";

  public image: any
  public full_name: any
  public mobile_number: any
  public email_id: any
  public company_name: any
  public stateId: any
  public address_1: any
  public address_2: any
  public gst_num: any

  isDisabled: boolean
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  private customerData: CustomerManagementDetails
  constructor(@Inject(MAT_DIALOG_DATA) customerManagementDetails: CustomerManagementDetails,
    private apiService: UtrackService,
    private http: HttpClient,
    private toast: NbToastrService,
    private routes: Router) {
    if (customerManagementDetails != null)
      this.customerData = JSON.parse(customerManagementDetails.customer_id)
  }


  ngOnInit(): void {
    if (this.customerData != null && this.customerData != undefined) {
      this.isAddUser = false;
      this.isDisabled = true;
      this.full_name = this.customerData.full_name;
      this.mobile_number = this.customerData.mobile;
      this.email_id = this.customerData.email;
      this.company_name = this.customerData.company_name;
      this.stateId = this.customerData.state_id;
      this.address_1 = this.customerData.address1;
      this.address_2 = this.customerData.address2;
      this.gst_num = this.customerData.gst_number;



    } else {
      this.isAddUser = true;
      this.isDisabled = false;

    }
    this.getStateList();
  }

  createCustomerForm = new FormGroup({
    image: new FormControl(''),
    fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mobilenumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address1: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address2: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required]),
    gstNum: new FormControl('', [Validators.required, Validators.minLength(15)]),

  })

  getStateList() {
    this.apiService.getStates().subscribe(response => {
      if (response.status) {
        this.states = response.data
      }
    })
  }


  submit() {


    if (
      this.createCustomerForm.value.fullname != undefined && this.createCustomerForm.value.fullname != ""
      && this.createCustomerForm.value.mobilenumber != undefined && this.createCustomerForm.value.mobilenumber != ""
      && this.createCustomerForm.value.email != undefined && this.createCustomerForm.value.email != ""
      && this.createCustomerForm.value.state != undefined && this.createCustomerForm.value.state != ""
      && this.createCustomerForm.value.address1 != undefined && this.createCustomerForm.value.address1 != ""
      && this.createCustomerForm.value.gstNum != undefined && this.createCustomerForm.value.gstNum != ""
    ) {

      const headers = {
        'X-Api-Key': environment.X_API_KEY,
      }

      if (this.isAddUser) {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('company_name', this.createCustomerForm.value.companyName);
        formData.append('user_type', localStorage.getItem("USER_TYPE"));
        formData.append('device_token', "Web");
        formData.append('full_name', this.createCustomerForm.value.fullname);
        formData.append('mobile', this.createCustomerForm.value.mobilenumber);
        formData.append('email', this.createCustomerForm.value.email);
        formData.append('state_id', this.createCustomerForm.value.state);
        formData.append('address1', this.createCustomerForm.value.address1);
        formData.append('address2', this.createCustomerForm.value.address2);
        formData.append('gst_number', this.createCustomerForm.value.gstNum);

        this.apiService.customer_add(formData).subscribe(response => {
          if (response.status) {
            this.toast.success('Utrack', response.message)
            alert(response.message)
            this.image = "";
            this.full_name = ""
            this.mobile_number = ""
            this.email_id = ""
            this.company_name = ""
            this.stateId = ""
            this.address_1 = ""
            this.address_2 = ""
            this.gst_num = ""

          } else {
            alert(response.message)
          }
        })

      } else {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('company_name', this.createCustomerForm.value.companyName);
        formData.append('user_type', localStorage.getItem("USER_TYPE"));
        formData.append('device_token', "Web");
        formData.append('full_name', this.createCustomerForm.value.fullname);
        formData.append('mobile', this.customerData.mobile);
        formData.append('email', this.createCustomerForm.value.email);
        formData.append('state_id', this.createCustomerForm.value.state);
        formData.append('address1', this.createCustomerForm.value.address1);
        formData.append('address2', this.createCustomerForm.value.address2);
        formData.append('gst_number', this.createCustomerForm.value.gstNum);
        formData.append('customer_id', this.customerData.customer_id);

        this.apiService.customer_edit(formData).subscribe(response => {
          if (response.status) {
            alert(response.message);
          } else {
            alert(response.message);
          }
        })
      }

    } else {
      alert("Please fill all mandatory Information.");
    }

  }

}
