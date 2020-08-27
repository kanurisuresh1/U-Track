import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { DistrictResponse } from '../../../@theme/components/Model/DistrictResponse';
import { StateResponse } from '../../../@theme/components/Model/StateRessponse';
import { MyProfileResponse, MyProfileResponseData } from '../../../@theme/components/Model/MyProfileResponse';
import { EditMyProfileRespones } from '../../../@theme/components/Model/EditMyProfileRespones';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;

  lincencefrontviewUrl: any = "assets/images/myprofile/sample-one.jpg";
  lincenceBackviewUrl: any = "assets/images/myprofile/sample-one.jpg";
  companyLogoviewUrl: any = "assets/images/myprofile/sample-one.jpg";

  fname: any;
  lname: any;
  email: string;
  mnumber: string;
  state_id: string;
  district_id: any;
  AreaName: any;
  pincode: any;
  Address: any;
  DrivingLinceneID: any;
  CompanyName: any;
  company_state_id: any;
  company_district_id: any;
  CompanyArea: any;
  CompanyPincode: any;
  CompanyAddress: any;
  CompanyLandmark: any;
  CompanyEmail: any;
  CompanyPhone: any;
  userData: MyProfileResponseData;
  registeredById: any;


  constructor(private headerService: HeaderInteractorService, private routes: Router, private http: HttpClient,
    private activatedRoute: ActivatedRoute, private toasterService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Profile')
    if (localStorage.getItem("USER_ID") == null || localStorage.getItem("USER_ID") == "") {
      this.routes.navigate(["/login"]);
    }

    this.getStatesList();
    this.getMyProfileData();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
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

  // lincenceFront view

  lincencefrontfileProgress(lincencefrontfileInput: any) {
    this.fileData = <File>lincencefrontfileInput.target.files[0];
    this.lincencefrontpreview();
  }

  lincencefrontpreview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.lincencefrontviewUrl = reader.result;
    }
  }

  // lincenceBack view

  lincenceBackfileProgress(lincenceBackfileInput: any) {
    this.fileData = <File>lincenceBackfileInput.target.files[0];
    this.lincenceBackpreview();
  }

  lincenceBackpreview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.lincenceBackviewUrl = reader.result;
    }
  }

  // companyLogo


  companyLogofileProgress(lincenceBackfileInput: any) {
    this.fileData = <File>lincenceBackfileInput.target.files[0];
    this.companyLogopreview();
  }

  companyLogopreview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.companyLogoviewUrl = reader.result;
    }
  }


  addMyExecutive() {
    this.routes.navigate([`../my-executive`],
      { relativeTo: this.activatedRoute })
  }



  myProfileForm = new FormGroup({

    profileimage: new FormControl('', [Validators.required]),
    lincenceFrontImage: new FormControl('', [Validators.required]),
    lincenceBackImage: new FormControl('', [Validators.required]),
    companyLogoImage: new FormControl('', [Validators.required]),

    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    AreaName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mnumber: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.minLength(6)]),
    Address: new FormControl('', [Validators.required]),

    DrivingLinceneID: new FormControl('', [Validators.required]),
    // PANID: new FormControl('', [Validators.required]),

    CompanyName: new FormControl('', [Validators.required]),
    companystate: new FormControl('', [Validators.required]),
    companydistrict: new FormControl('', [Validators.required]),
    CompanyArea: new FormControl('', [Validators.required]),
    CompanyAddress: new FormControl('', [Validators.required]),
    CompanyPincode: new FormControl('', [Validators.required, Validators.minLength(6)]),
    CompanyEmail: new FormControl('', [Validators.required, Validators.email]),
    CompanyLandmark: new FormControl('', [Validators.required]),
    CompanyPhone: new FormControl('', [Validators.required, Validators.minLength(10)]),


  })

  getStatesList() {
    const params = new HttpParams()
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<StateResponse>(environment.apiBaseUrl + 'state_list', { params }).subscribe(stateRespone => {
      if (stateRespone.status) {
        this.states = stateRespone.data;
      } else {
        alert(stateRespone.message);
      }
    })
  }


  getDistrictList(state_id: string) {
    const params = new HttpParams()
      .set('state_id', state_id)
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<DistrictResponse>(environment.apiBaseUrl + 'district_list', { params }).subscribe(respone => {
      if (respone.status) {
        this.districts = respone.data;
        this.companydistricts = respone.data;
      } else {
        alert(respone.message);
      }
    })
  }


  states = []

  districts = []

  companydistricts = []

  statesChange(e) {
    this.districts = []
    this.getDistrictList(this.myProfileForm.value.state);
  }

  companyStatesChange(e) {
    this.companydistricts = []
    this.getDistrictList(this.myProfileForm.value.companystate);
  }


  getMyProfileData() {

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', "Customer")
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<MyProfileResponse>(environment.apiBaseUrl + 'my_profile', { params }).subscribe(response => {
      if (response.status) {

        this.userData = response.data[0];

        this.fname = this.userData.first_name
        this.lname = this.userData.last_name
        this.email = this.userData.email
        this.mnumber = this.userData.mobile
        this.state_id = this.userData.state_id
        this.district_id = this.userData.district_id
        this.AreaName = this.userData.area_name
        this.pincode = this.userData.zipcode
        this.Address = this.userData.address1
        this.DrivingLinceneID = this.userData.dl_number
        this.CompanyName = this.userData.company_name
        this.company_state_id = this.userData.company_state_id
        this.company_district_id = this.userData.company_district_id
        this.CompanyArea = this.userData.company_area
        this.CompanyPincode = this.userData.company_pincode
        this.CompanyAddress = this.userData.company_address
        this.CompanyLandmark = this.userData.company_landmark
        this.CompanyEmail = this.userData.company_email
        this.CompanyPhone = this.userData.company_mobile
        this.companyLogoviewUrl = this.userData.company_logo
        this.lincencefrontviewUrl = this.userData.dl_front
        this.lincenceBackviewUrl = this.userData.dl_back
        this.previewUrl = this.userData.profile_image
        this.registeredById = this.userData.registered_by_id

        localStorage.setItem('my_excutive_registered_id', this.userData.registered_by_id);
        console.log(localStorage.getItem("my_excutive_registered_id"))


        if (this.registeredById == 0) {
          document.getElementById("btn_hide_registered_id").style.display = "none";
        }

      }
    })
  }

  editMyProfile() {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();

    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('profile_image', this.myProfileForm.value.profileimage);

    formData.append('first_name', this.myProfileForm.value.firstname);
    formData.append('last_name', this.myProfileForm.value.lastname);
    formData.append('state_id', this.myProfileForm.value.state);
    formData.append('district_id', this.myProfileForm.value.district);
    formData.append('area_name', this.myProfileForm.value.AreaName);
    formData.append('email', this.myProfileForm.value.email);
    formData.append('mobile', this.myProfileForm.value.mnumber);
    formData.append('zipcode', this.myProfileForm.value.pincode);
    formData.append('address1', this.myProfileForm.value.Address);

    formData.append('dl_front', this.myProfileForm.value.lincenceFrontImage);
    formData.append('dl_back', this.myProfileForm.value.lincenceBackImage);

    formData.append('dl_number', this.myProfileForm.value.DrivingLinceneID);
    // formData.append('password', this.myProfileForm.value.PANID);

    formData.append('company_logo', this.myProfileForm.value.companyLogoImage);
    formData.append('company_name', this.myProfileForm.value.CompanyName);
    formData.append('company_state_id', this.myProfileForm.value.companystate);
    formData.append('company_district_id', this.myProfileForm.value.companydistrict);
    formData.append('company_area', this.myProfileForm.value.CompanyArea);
    formData.append('company_address', this.myProfileForm.value.CompanyAddress);
    formData.append('company_pincode', this.myProfileForm.value.CompanyPincode);
    formData.append('company_email', this.myProfileForm.value.CompanyEmail);
    formData.append('company_landmark', this.myProfileForm.value.CompanyLandmark);
    formData.append('company_mobile', this.myProfileForm.value.CompanyPhone);
    formData.append('user_type', "Customer");
    formData.append('device_token', "Web");

    this.http.post<EditMyProfileRespones>(environment.apiBaseUrl + 'edit_profile', formData, { headers }).subscribe(response => {
      if (response.status) {

        this.toasterService.success('Pragati Utrack', response.message)


      } else {

        this.toasterService.danger('Pragati Utrack', response.message)

      }
    })

  }
}


