import { Component, OnInit, Inject } from '@angular/core';
import { BasicResponse } from '../../../../@theme/components/Model/Basic';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ServiceManagementData } from '../../../../@theme/components/Model/ServiceManagementResponse';
import { FuelManagementDetails } from '../../../../@theme/components/Model/FuelManagementResponse';


@Component({
  selector: 'ngx-add-service-management',
  templateUrl: './add-service-management.component.html',
  styleUrls: ['./add-service-management.component.scss']
})
export class AddServiceManagementComponent implements OnInit {

  todayDate: Date = new Date();
  pipe = new DatePipe('en-US');
  isAddService: boolean = true;
  private serviceData: ServiceManagementData;

  vehicles = [];
  services_type_list = [];

  //Edit Fuel Data Binding Values
  public deviceLinkId: any;
  public servicing_date: any
  public service_Cost: any;
  public odometer_reading: any
  public service_station_name: any
  public service_station_notes: any


  constructor(@Inject(MAT_DIALOG_DATA) serviceManagementDetails: ServiceManagementData,
    private apiService: UtrackService,
    private toast: NbToastrService,
    private routes: Router,
    private http: HttpClient,
  ) {
    if (serviceManagementDetails != null)
      this.serviceData = JSON.parse(serviceManagementDetails.vehicle_service_id)
  }

  ngOnInit(): void {

    if (this.serviceData != null && this.serviceData != undefined) {
      this.isAddService = false;
      this.deviceLinkId = this.serviceData.device_link_id;
      this.servicing_date = this.serviceData.service_date
      this.odometer_reading = this.serviceData.odometre_reading
      this.service_Cost = this.serviceData.service_cost
      this.service_station_name = this.serviceData.service_center_name
      this.service_station_notes = this.serviceData.service_notes
    } else {
      this.isAddService = true;
    }
    this.getVehicles();
    this.getServicesList();
  }
  createServiceReportForm = new FormGroup({
    servicingDate: new FormControl(''),
    serviceCost: new FormControl(''),
    odometerReading: new FormControl(''),
    serviceStationName: new FormControl(''),
    serviceStationNote: new FormControl(''),
    vechicleName: new FormControl(''),
    fileData: new FormControl(''),
    services_type: new FormControl(''),

  })



  getVehicles() {
    this.apiService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      if (this.isAddService) {
        this.deviceLinkId = this.vehicles[0].device_link_id;
      }
    })
  }

  getServicesList() {
    this.apiService.service_master_list().subscribe(response => {
      this.services_type_list = response.data
      if (this.isAddService) {
        this.deviceLinkId = this.services_type_list[0].device_link_id;
      }
    })
  }

  submit() {

    if (
      this.createServiceReportForm.value.servicingDate != undefined && this.createServiceReportForm.value.servicingDate != ""
      && this.createServiceReportForm.value.serviceCost != undefined && this.createServiceReportForm.value.serviceCost != ""
      && this.createServiceReportForm.value.odometerReading != undefined && this.createServiceReportForm.value.odometerReading != ""
      && this.createServiceReportForm.value.serviceStationName != undefined && this.createServiceReportForm.value.serviceStationName != ""
      && this.createServiceReportForm.value.serviceStationNote != undefined && this.createServiceReportForm.value.serviceStationNote != ""
      // && this.createServiceReportForm.value.vechicleName != undefined && this.createServiceReportForm.value.vechicleName != ""
    ) {


      const headers = {
        'X-Api-Key': environment.X_API_KEY,
      }
      if (this.isAddService) {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('device_link_id', this.createServiceReportForm.value.vechicleName);
        formData.append('device_token', "Web");
        formData.append('service_date', this.pipe.transform(this.createServiceReportForm.value.servicingDate, 'yyyy-MM-dd'));
        formData.append('trip_id', "0");
        formData.append('odometre_reading', this.createServiceReportForm.value.odometerReading);
        formData.append('service_center_name', this.createServiceReportForm.value.serviceStationName);
        formData.append('service_cost', this.createServiceReportForm.value.serviceCost);
        formData.append('service_notes', this.createServiceReportForm.value.serviceStationNote);
        formData.append('report_file', "");
        formData.append('service_ids', this.createServiceReportForm.value.services_type);

        this.apiService.vehicle_service_add(formData).subscribe(response => {
          if (response.status) {
            alert(response.message)

          } else {
            alert(response.message)
          }
        })

      } else {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('device_link_id', this.createServiceReportForm.value.vechicleName);
        formData.append('device_token', "Web");
        formData.append('service_date', this.pipe.transform(this.createServiceReportForm.value.servicingDate, 'yyyy-MM-dd'));
        formData.append('trip_id', "0");
        formData.append('odometre_reading', this.createServiceReportForm.value.odometerReading);
        formData.append('service_center_name', this.createServiceReportForm.value.serviceStationName);
        formData.append('service_cost', this.createServiceReportForm.value.serviceCost);
        formData.append('service_notes', this.createServiceReportForm.value.serviceStationNote);
        formData.append('report_file', "");
        formData.append('service_ids', this.createServiceReportForm.value.services_type);
        formData.append('vehicle_service_id', this.serviceData.vehicle_service_id);


        this.apiService.vehicle_service_edit(formData).subscribe(response => {
          if (response.status) {
            alert(response.message)
          } else {
            alert(response.message)
          }
        })
      }



    } else {
      alert("Please fill all mandatory Information.");
    }

  }


}
