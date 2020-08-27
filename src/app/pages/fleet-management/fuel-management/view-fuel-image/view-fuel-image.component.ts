import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuelManagementDetails } from '../../../../@theme/components/Model/FuelManagementResponse';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-view-fuel-image',
  templateUrl: './view-fuel-image.component.html',
  styleUrls: ['./view-fuel-image.component.scss']
})
export class ViewFuelImageComponent implements OnInit {
  private fuelData: FuelManagementDetails;
  fileImage : any

  
  constructor(@Inject(MAT_DIALOG_DATA) fuelManagementDetails: FuelManagementDetails,
  private apiService: UtrackService,
  private toast: NbToastrService,
  private routes: Router,
  private http: HttpClient,
) {
  if (fuelManagementDetails != null)
    this.fuelData = JSON.parse(fuelManagementDetails.vehicle_fuel_id)
    this.fileImage = this.fuelData.bill_image
}

  ngOnInit(): void {
  }

}
