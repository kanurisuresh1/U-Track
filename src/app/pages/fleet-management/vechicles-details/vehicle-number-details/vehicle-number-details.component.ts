import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { FlickerResponse } from '../../../../@theme/components/Model/FlickerImages';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { AllVechiclesDetails, VechicleDetails, VehicleImageList } from '../../../../@theme/components/Model/GetAllVechiclesDetails';
import { NbRowComponent } from '@nebular/theme';
import { GetVehicleDetailsData } from '../../../../@theme/components/Model/GetVehicleNumberDetails';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { ShowvehicleImageComponent } from '../showvehicle-image/showvehicle-image.component';

@Component({
  selector: 'ngx-vehicle-number-details',
  templateUrl: './vehicle-number-details.component.html',
  styleUrls: ['./vehicle-number-details.component.scss']
})
export class VehicleNumberDetailsComponent implements OnInit {

  todayDate: Date = new Date();
  pipe = new DatePipe('en-US');


  deviceLinkId: any;
  vehicleDetailsData: GetVehicleDetailsData;
  vehicleImages: VehicleImageList[]
  registrationImages: VehicleImageList[]
  insuranceImages: VehicleImageList[]
  pollutionImages: VehicleImageList[]
  nationalPermitImages: VehicleImageList[]
  otherImages: VehicleImageList[]

  isVehicleImagesAvailable: boolean;
  isRegistraionImagesAvailable: boolean;
  isInsuranceImagesAvailable: boolean;
  isPollutionImagesAvailable: boolean;
  isNationalPermitImagesAvailable: boolean;
  isOtherImagesAvailable: boolean;

  // Binding input Values : 

  engine_number: string
  chassis_number: string
  make: string
  model: string
  over_speed: string
  vechicleName: string
  fuel_tank_size: string
  mileage_per_litre: string
  registered_owner_name: string
  insurance_vender_name: string
  insurance_number: string
  insurance_cost: string
  pollution_check_cost: string
  national_permit_id: string
  vehicle_image: string




  constructor(private location: Location,
    private apiService: UtrackService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.deviceLinkId = params.device_link_id;
    })

  }

  vechicleNumDetailsForm = new FormGroup({
    fctrl_image: new FormControl(''),
    fctrl_deviceImei: new FormControl(''),
    fctrl_engine_number: new FormControl(''),
    fctrl_chassis_number: new FormControl(''),
    fctrl_make: new FormControl(''),
    fctrl_model: new FormControl(''),
    fctrl_over_speed: new FormControl(''),
    fctrl_vechicleName: new FormControl(''),
    fctrl_fuel_tank_size: new FormControl(''),
    fctrl_mileage_per_litre: new FormControl(''),
    fctrl_registered_owner_name: new FormControl(''),
    fctrl_insurance_vender_name: new FormControl(''),
    fctrl_insurance_number: new FormControl(''),
    fctrl_insurance_cost: new FormControl(''),
    fctrl_pollution_check_cost: new FormControl(''),
    fctrl_national_permit_id: new FormControl(''),
    fctrl_buyDate: new FormControl(''),
    fctrl_insuranceDate: new FormControl(''),
    fctrl_insuranceRenewalDate: new FormControl(''),
    fctrl_pollutionCheckDate: new FormControl(''),
    fctrl_pollutionRenewalDate: new FormControl(''),
    fctrl_nationalPermitDate: new FormControl(''),
    fctrl_vehicleRegistrationDate: new FormControl(''),


  })



  ngOnInit(): void {
    this.showVehicleDetailsData()

  }
  onImageOpen(item) {
    let rowData = JSON.stringify(item)
    let dialogReference = this.dialog.open(ShowvehicleImageComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
       data: { image_file: rowData }
    })
  }

  onImageDelete(item) {
    var result = confirm("Are You Sure Want to Delete?");
    if (result == true) {
      const formData = new FormData();
      formData.append('user_id', localStorage.getItem('USER_ID'));
      formData.append('user_type', localStorage.getItem('USER_TYPE'));
      formData.append('device_token', "Web");
      formData.append('device_link_id', this.deviceLinkId);
      formData.append('vehicle_image_id', item.vehicle_image_id);

      this.apiService.vehicle_image_delete(formData).subscribe(response => {
        alert(response.message);
        this.showVehicleDetailsData();
      })

    } else {

    }

  }

  showVehicleDetailsData() {
    this.apiService.getVehiclesDetails(this.deviceLinkId).subscribe(response => {
      this.vehicleDetailsData = response.data;


      // binding all the data
      this.engine_number = this.vehicleDetailsData.engine_number
      this.chassis_number = this.vehicleDetailsData.chassis_number
      this.make = this.vehicleDetailsData.make
      this.model = this.vehicleDetailsData.model
      this.over_speed = this.vehicleDetailsData.over_speed

      this.fuel_tank_size = this.vehicleDetailsData.fuel_tank_size
      this.mileage_per_litre = this.vehicleDetailsData.mileage_per_litre
      this.registered_owner_name = this.vehicleDetailsData.registered_owner_name
      this.insurance_vender_name = this.vehicleDetailsData.insurance_vender_name
      this.insurance_number = this.vehicleDetailsData.insurance_number
      this.insurance_cost = this.vehicleDetailsData.insurance_cost
      this.pollution_check_cost = this.vehicleDetailsData.pollution_check_cost
      this.national_permit_id = this.vehicleDetailsData.national_permit_id
      this.vehicle_image = this.vehicleDetailsData.vehicle_image


      this.vehicleImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'VEHICLE');
      if (Array.isArray(this.vehicleImages) && this.vehicleImages.length > 0) {
        this.isVehicleImagesAvailable = true;
      } else {
        this.isVehicleImagesAvailable = false;
      }

      this.registrationImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'REGISTRATION');
      if (Array.isArray(this.registrationImages) && this.registrationImages.length > 0) {
        this.isRegistraionImagesAvailable = true;
      } else {
        this.isRegistraionImagesAvailable = false;
      }

      this.insuranceImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'INSURANCE');
      if (Array.isArray(this.insuranceImages) && this.insuranceImages.length > 0) {
        this.isInsuranceImagesAvailable = true;
      } else {
        this.isInsuranceImagesAvailable = false;
      }

      this.pollutionImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'POLLUTION');
      if (Array.isArray(this.pollutionImages) && this.pollutionImages.length > 0) {
        this.isPollutionImagesAvailable = true;
      } else {
        this.isPollutionImagesAvailable = false;
      }

      this.nationalPermitImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'NATIONAL_PERMIT');
      if (Array.isArray(this.nationalPermitImages) && this.nationalPermitImages.length > 0) {
        this.isNationalPermitImagesAvailable = true;
      } else {
        this.isNationalPermitImagesAvailable = false;
      }



      this.otherImages = this.vehicleDetailsData.vehicle_image_list.filter(f => f.image_type == 'OTHER');
      if (Array.isArray(this.otherImages) && this.otherImages.length > 0) {
        this.isOtherImagesAvailable = true;
      } else {
        this.isOtherImagesAvailable = false;
      }

    })
  }

  back() {
    this.location.back();
  }


  vehicleDetailSubmit() {

    if (
      this.vechicleNumDetailsForm.value.fctrl_engine_number != undefined && this.vechicleNumDetailsForm.value.fctrl_engine_number != ""
    ) {

      if (this.deviceLinkId != null) {
        const formData = new FormData();
        formData.append('user_id', localStorage.getItem('USER_ID'));
        formData.append('user_type', localStorage.getItem('USER_TYPE'));
        formData.append('device_token', "Web");
        formData.append('vehicle_detail_id', this.vehicleDetailsData.vehicle_detail_id);
        formData.append('device_link_id', this.deviceLinkId);

        formData.append('engine_number', this.vechicleNumDetailsForm.value.fctrl_engine_number);
        formData.append('chassis_number', this.vechicleNumDetailsForm.value.fctrl_chassis_number);
        formData.append('make', this.vechicleNumDetailsForm.value.fctrl_make);
        formData.append('model', this.vechicleNumDetailsForm.value.fctrl_model);
        formData.append('over_speed', this.vechicleNumDetailsForm.value.fctr_over_speed);
        formData.append('buy_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_buyDate, 'yyyy-MM-dd'));


        formData.append('fuel_tank_size', this.vechicleNumDetailsForm.value.fctrl_fuel_tank_size);
        formData.append('fuel_type', "");
        formData.append('mileage_per_litre', this.vechicleNumDetailsForm.value.fctrl_mileage_per_litre);

        formData.append('vehicle_registration_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_vehicle_registration_date, 'yyyy-MM-dd'));
        formData.append('registered_owner_name', this.vechicleNumDetailsForm.value.fctrl_registered_owner_name);

        formData.append('insurance_vender_name', this.vechicleNumDetailsForm.value.fctrl_insurance_vender_name);
        formData.append('insurance_cost', this.vechicleNumDetailsForm.value.fctrl_insurance_cost);
        formData.append('insurance_number', this.vechicleNumDetailsForm.value.fctrl_insurance_number);
        formData.append('insurance_buy_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_insuranceDate, 'yyyy-MM-dd'));
        formData.append('insurance_renewal_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_insurance_renewal_date, 'yyyy-MM-dd'));

        formData.append('pollution_check_cost', this.vechicleNumDetailsForm.value.fctrl_pollution_check_cost);
        formData.append('pollution_check_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_pollutionCheckDate, 'yyyy-MM-dd'));
        formData.append('pollution_check_renewal_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_pollutionRenewalDate, 'yyyy-MM-dd'));

        formData.append('national_permit_id', this.vechicleNumDetailsForm.value.fctrl_national_permit_id);
        formData.append('national_permit_date', this.pipe.transform(this.vechicleNumDetailsForm.value.fctrl_nationalPermitDate, 'yyyy-MM-dd'));

        formData.append('driver_id', this.vehicleDetailsData.driver_id);

        this.apiService.vehicle_detail_edit(formData).subscribe(response => {
          if (response.status) {
            alert(response.message)
            this.location.back();

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

