import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FuelManagementDetails } from '../../../@theme/components/Model/FuelManagementResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Location } from '@angular/common';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { AddFuelManagementComponent } from './add-fuel-management/add-fuel-management.component';
import { BasicResponse } from '../../../@theme/components/Model/Basic';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ViewFuelImageComponent } from './view-fuel-image/view-fuel-image.component';

@Component({
  selector: 'ngx-fuel-management',
  templateUrl: './fuel-management.component.html',
  styleUrls: ['./fuel-management.component.scss']
})
export class FuelManagementComponent implements OnInit {

  ELEMENT_DATA: FuelManagementDetails[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'added_date', 'odometer_reading', 'quantity', 'price_per_liter', 'total_cost', 'filling_station', 'filling_notes', 'Actions'];
  dataSource = new MatTableDataSource<FuelManagementDetails>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;


  constructor(private AllVechicleService: UtrackService,
    private headerService: HeaderInteractorService,
    private dialog: MatDialog,
    private location: Location,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Fuel Management')
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
    let customerTableColumn: string[] = ['Id', 'Vehicle Number', 'Date', 'Odometer Reading', 'Quantity', 'Price Per Litre', 'Total Price', 'Filling Station', 'Filling Notes',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {

      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.added_date)
      row.push(value.odometer_reading)
      row.push(value.quantity)
      row.push(value.price_per_liter)
      row.push(value.total_cost)
      row.push(value.filling_station)
      row.push(value.filling_notes)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('FuelDetails.pdf');
  }

  fetchDataFromApi() {
    this.AllVechicleService.getFuelDetails().subscribe(response => {
      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
    })
  }


  // Add Dialog Starts 

  add() {
    let dialogReference = this.dialog.open(AddFuelManagementComponent, {
      height: '95%',
      width: '69%',
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  edit(model_data: FuelManagementDetails) {
    let rowData = JSON.stringify(model_data)
    let dialogReference = this.dialog.open(AddFuelManagementComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
      data: { vehicle_fuel_id: rowData }
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  openImage(model_data: FuelManagementDetails) {
    let rowData = JSON.stringify(model_data)
    let dialogReference = this.dialog.open(ViewFuelImageComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
      data: { vehicle_fuel_id: rowData }
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  delete(model_data: FuelManagementDetails) {

    var result = confirm('Are You Sure Want to delete?')
    if (result == true) {
      const headers = {
        'X-Api-Key': environment.X_API_KEY,
      }
      const formData = new FormData();
      formData.append('user_id', localStorage.getItem('USER_ID'));
      formData.append('user_type', localStorage.getItem('USER_TYPE'));
      formData.append('device_token', "Web");
      formData.append('vehicle_fuel_id', model_data.vehicle_fuel_id);
      formData.append('device_link_id', model_data.device_link_id);
  
  
      this.AllVechicleService.vehicle_fuel_delete(formData).subscribe(response => {
        alert(response.message)
        this.fetchDataFromApi();
      })
    }
    


  }


}
