import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetVehicleDetailsData, VehicleImageList } from '../../../../@theme/components/Model/GetVehicleNumberDetails';

@Component({
  selector: 'ngx-showvehicle-image',
  templateUrl: './showvehicle-image.component.html',
  styleUrls: ['./showvehicle-image.component.scss']
})
export class ShowvehicleImageComponent implements OnInit {

  vehicleImageDetailsData: VehicleImageList
  fileImage: any
  constructor(@Inject(MAT_DIALOG_DATA) vehicleDetails: VehicleImageList,
  ) {
    if (vehicleDetails != null)
      this.vehicleImageDetailsData = JSON.parse(vehicleDetails.image_file)
    this.fileImage = this.vehicleImageDetailsData.image_file
  }

  ngOnInit(): void {
  }

}
