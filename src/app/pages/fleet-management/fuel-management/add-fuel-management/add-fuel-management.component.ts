import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { BasicResponse } from '../../../../@theme/components/Model/Basic';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FuelManagementDetails } from '../../../../@theme/components/Model/FuelManagementResponse';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-add-fuel-management',
  templateUrl: './add-fuel-management.component.html',
  styleUrls: ['./add-fuel-management.component.scss']
})
export class AddFuelManagementComponent implements OnInit {
  todayDate: Date = new Date();
  pipe = new DatePipe('en-US');
  isAddFuel: boolean = true;
  private fuelData: FuelManagementDetails;

  //Edit Fuel Data Binding Values
  public deviceLinkId: any;
  public filling_date: any
  public odometer_reading: any
  public total_price: any
  public price_per_liter: any
  public fuel_quantity_in_ltr: any
  public filling_station_name: any
  public filling_station_notes: any


  constructor(@Inject(MAT_DIALOG_DATA) fuelManagementDetails: FuelManagementDetails,
    private apiService: UtrackService,
    private toast: NbToastrService,
    private routes: Router,
    private http: HttpClient,
  ) {
    if (fuelManagementDetails != null)
      this.fuelData = JSON.parse(fuelManagementDetails.vehicle_fuel_id)
  }

  ngOnInit(): void {
    if (this.fuelData != null && this.fuelData != undefined) {
      this.isAddFuel = false;
      this.deviceLinkId = this.fuelData.device_link_id;
      this.filling_date = this.fuelData.filling_date
      this.odometer_reading = this.fuelData.odometer_reading
      this.total_price = this.fuelData.total_cost
      this.price_per_liter = this.fuelData.price_per_liter
      this.fuel_quantity_in_ltr = this.fuelData.quantity
      this.filling_station_name = this.fuelData.filling_station
      this.filling_station_notes = this.fuelData.filling_notes
    } else {
      this.isAddFuel = true;
    }
    this.getVehicles()
  }
  createFuelReportForm = new FormGroup({
    fillingDate: new FormControl(''),
    odometerReading: new FormControl(''),
    totalPrice: new FormControl(''),
    pricePerLiter: new FormControl(''),
    fuelQuantity: new FormControl(''),
    fillingStationName: new FormControl(''),
    fillingStationNote: new FormControl(''),
    vechicleName: new FormControl(''),
    fileData: new FormControl(''),

  })
  vehicles = []


  getVehicles() {
    this.apiService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      if (this.isAddFuel) {
        this.deviceLinkId = this.vehicles[0].device_link_id;
      }
    })
  }

  submit() {

    if (
      this.createFuelReportForm.value.fillingDate != undefined && this.createFuelReportForm.value.fillingDate != ""
      && this.createFuelReportForm.value.odometerReading != undefined && this.createFuelReportForm.value.odometerReading != ""
      && this.createFuelReportForm.value.totalPrice != undefined && this.createFuelReportForm.value.totalPrice != ""
      && this.createFuelReportForm.value.pricePerLiter != undefined && this.createFuelReportForm.value.pricePerLiter != ""
      && this.createFuelReportForm.value.fuelQuantity != undefined && this.createFuelReportForm.value.fuelQuantity != ""
      && this.createFuelReportForm.value.fillingStationName != undefined && this.createFuelReportForm.value.fillingStationName != ""
      && this.createFuelReportForm.value.fillingStationNote != undefined && this.createFuelReportForm.value.fillingStationNote != ""
    ) {


      const headers = {
        'X-Api-Key': environment.X_API_KEY,
      }
      if (this.isAddFuel) {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('device_link_id', this.createFuelReportForm.value.vechicleName);
        formData.append('device_token', "Web");
        formData.append('filling_date', this.pipe.transform(this.createFuelReportForm.value.fillingDate, 'yyyy-MM-dd'));
        formData.append('quantity', this.createFuelReportForm.value.fuelQuantity);
        formData.append('price_per_liter', this.createFuelReportForm.value.pricePerLiter);
        formData.append('total_cost', this.createFuelReportForm.value.totalPrice);
        formData.append('bill_image', "");
        formData.append('odometer_reading', this.createFuelReportForm.value.odometerReading);
        formData.append('trip_id', "0");
        formData.append('filling_station', this.createFuelReportForm.value.fillingStationName);
        formData.append('filling_notes', this.createFuelReportForm.value.fillingStationNote);

        this.apiService.vehicle_fuel_add(formData).subscribe(response => {
          if (response.status) {
            alert(response.message)
          } else {
            alert(response.message)
          }
        })

      } else {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('device_link_id', this.createFuelReportForm.value.vechicleName);
        formData.append('device_token', "Web");
        formData.append('filling_date', this.pipe.transform(this.createFuelReportForm.value.fillingDate, 'yyyy-MM-dd'));
        formData.append('quantity', this.createFuelReportForm.value.fuelQuantity);
        formData.append('price_per_liter', this.createFuelReportForm.value.pricePerLiter);
        formData.append('total_cost', this.createFuelReportForm.value.totalPrice);
        formData.append('bill_image', "");
        formData.append('odometer_reading', this.createFuelReportForm.value.odometerReading);
        formData.append('trip_id', "0");
        formData.append('filling_station', this.createFuelReportForm.value.fillingStationName);
        formData.append('filling_notes', this.createFuelReportForm.value.fillingStationNote);
        formData.append('vehicle_fuel_id', this.fuelData.vehicle_fuel_id);


        this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_fuel_edit', formData, { headers }).subscribe(response => {
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
