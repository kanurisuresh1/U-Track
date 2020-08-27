import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  states = [];
  districts = [];
  cities = [];

  constructor(private apiService: UtrackService,
    private location: Location, private headerService: HeaderInteractorService) { }

  AddDriverRegistrationForm = new FormGroup({
    fctrl_image: new FormControl(''),
    fctrl_nickname: new FormControl(''),
    fctrl_first_name: new FormControl(''),
    fctrl_last_name: new FormControl(''),
    fctrl_mobile_number: new FormControl(''),
    fctrl_dob: new FormControl(''),
    fctrl_doj: new FormControl(''),
    fctrl_driving_licece_id: new FormControl(''),
    fctrl_pan_id: new FormControl(''),
    fctrl_state: new FormControl(''),
    fctrl_district: new FormControl(''),
    fctrl_city: new FormControl(''),
    fctrl_pincode: new FormControl(''),
    fctrl_area: new FormControl(''),
    fctrl_landmark: new FormControl(''),
    fctrl_address: new FormControl(''),

  })

  ngOnInit(): void {

    this.headerService.updateHeaderTitle('Add Driver')
    this.getStateList();
  }

  back() {
    this.location.back();
  }

  onStateChange(e) {
    this.districts = []
    // this.cities = []
    this.getDistricts();
  }

  onDistrictChange(e) {
    this.cities = []
    this.getCities();
  }

  getStateList() {
    this.apiService.getStates().subscribe(response => {
      if (response.status) {
        this.states = response.data;
      }
    })
  }

  getDistricts() {
    this.apiService.getDistricts(this.AddDriverRegistrationForm.value.fctrl_state).subscribe(response => {
      if (response.status) {
        this.districts = response.data
      } else {
      }
    })
  }

  getCities() {
    this.apiService.getCities(this.AddDriverRegistrationForm.value.fctrl_district).subscribe(response => {
      if (response.status) {
        this.cities = response.data
      } else {
      }
    })
  }

  addDriver() {
  }

}
