import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceVehicleServiceDetails } from '../../../@theme/components/Model/VechicleServiceManagementDetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { AddServiceManagementComponent } from './add-service-management/add-service-management.component';
import { environment } from '../../../../environments/environment';
import { ServiceManagementData } from '../../../@theme/components/Model/ServiceManagementResponse';
import { ViewServiceImageComponent } from './view-service-image/view-service-image.component';

@Component({
  selector: 'ngx-servicing-management',
  templateUrl: './servicing-management.component.html',
  styleUrls: ['./servicing-management.component.scss']
})
export class ServicingManagementComponent implements OnInit {
  ELEMENT_DATA: ServiceVehicleServiceDetails[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'added_date', 'service_cost', 'odometre_reading', 'service_center_name', 'service_name', 'service_notes', 'Actions'];
  dataSource = new MatTableDataSource<ServiceVehicleServiceDetails>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;


  constructor(private AllVechicleService: UtrackService,
    private headerService: HeaderInteractorService,
    private location: Location,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Service Management')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchDataFromApi()
  }

  back() {
    this.location.back();
  }

  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.fetchDataFromApi();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.fetchDataFromApi();
  }

  refresh() {
    this.fetchDataFromApi()
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Vehicle Number', 'Date', 'Amount', 'Odometer', 'Service Center Name', 'Services', 'Servicing Notes',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {

      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.added_date)
      row.push(value.service_cost)
      row.push(value.odometre_reading)
      row.push(value.service_center_name)
      value.service_list.forEach(function (newVal) {
        row.push(newVal.service_name)
      })
      row.push(value.service_notes)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('VechicleServiceDetails.pdf');
  }

  fetchDataFromApi() {
    this.AllVechicleService.getAllVehicleServiceDetails().subscribe(response => {
      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
    })
  }

  add() {
    let dialogReference = this.dialog.open(AddServiceManagementComponent, {
      height: '95%',
      width: '69%',
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }
  edit(model_data: ServiceManagementData) {
    let rowData = JSON.stringify(model_data)
    let dialogReference = this.dialog.open(AddServiceManagementComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
      data: { vehicle_service_id: rowData }
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  openImage(model_data: ServiceManagementData) {
    let rowData = JSON.stringify(model_data)
    let dialogReference = this.dialog.open(ViewServiceImageComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
      data: { vehicle_service_id: rowData }
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  delete(model_data: ServiceManagementData) {
    var result = confirm('Are You Sure Want to delete?')
    if (result == true) {
      const headers = {
        'X-Api-Key': environment.X_API_KEY,
      }
      const formData = new FormData();
      formData.append('user_id', localStorage.getItem('USER_ID'));
      formData.append('user_type', localStorage.getItem('USER_TYPE'));
      formData.append('device_token', "Web");
      formData.append('vehicle_service_id', model_data.vehicle_service_id);
      formData.append('device_link_id', model_data.device_link_id);
      this.AllVechicleService.vehicle_service_delete(formData).subscribe(response => {
        alert(response.message)
        this.fetchDataFromApi();
      })
    } else {

    }


  }

  openimage(model_data: ServiceManagementData) {
   
  }

}
