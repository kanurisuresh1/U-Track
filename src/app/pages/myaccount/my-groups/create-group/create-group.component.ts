import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { NbToastrService } from '@nebular/theme';
import { BasicResponse } from '../../../../@theme/components/Model/Basic';

@Component({
  selector: 'ngx-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  getvehicle_image: string;
  selectedImageName = "ic_group_boy";
  constructor(private headerService: HeaderInteractorService,
    private apiService: UtrackService,
    private location: Location,
    private http: HttpClient,
    private toasterService: NbToastrService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Create Group')
    $('.classname').click(function () {
      $('.classname.active').removeClass('active');
      $(this).addClass('active');
    })
    this.getVehicles();
  }

  back() {
    this.location.back();
  }

  getVehicles() {
    this.apiService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      console.log(this.vehicles)
      this.vehicles.forEach((row) => {

        row.getvehicle_image = row.vehicle_image;

        if (row.vehicle_image.includes("no-image")) {
          row.getvehicle_image = "assets/images/MyWallet/defaultpic.png";
        }

      })
    })
  }

  vehicles = []

  create_image(name) {
    this.selectedImageName = name;
  }

  checks = false

  selectAllcheckBox(e) {
    if (e.target.checked == true) {
      this.checks = true;
    }
    else {
      this.checks = false;
    }
  }

  createGroupForm = new FormGroup({
    createGroupName: new FormControl('', [Validators.required]),
  })

  submit() {
    console.log(this.createGroupForm.value);
    console.log(this.selectedImageName);
    var favorite = [];
    $.each($("input[name='getcheckboxvalues']:checked"), function () {
      favorite.push($(this).val());
    });
    var selectedDeviceLinkIds = favorite.join(",");
    console.log(selectedDeviceLinkIds)

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();
    formData.append('group_name', this.createGroupForm.value.createGroupName);
    formData.append('group_icon_name', this.selectedImageName);
    formData.append('device_link_ids', selectedDeviceLinkIds);
    formData.append('user_id', localStorage.getItem("USER_ID"));
    formData.append('device_token', "Web");

    this.http.post<BasicResponse>(environment.apiBaseUrl + 'group_create', formData, { headers }).subscribe(response => {
      if (response.status) {

        this.toasterService.success("Pragati Utarack", response.message,);
        this.location.back();

      } else {

        this.toasterService.danger("Pragati Utarcak", response.message,)
      }
    })

  }


}
