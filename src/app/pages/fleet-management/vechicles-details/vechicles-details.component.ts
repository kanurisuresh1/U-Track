import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VechicleDetails } from '../../../@theme/components/Model/GetAllVechiclesDetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'ngx-vechicles-details',
  templateUrl: './vechicles-details.component.html',
  styleUrls: ['./vechicles-details.component.scss']
})
export class VechiclesDetailsComponent implements OnInit {
  ELEMENT_DATA: VechicleDetails[];
  displayedColumns: string[] = ['device_link_id', 'vehicle_number', 'engine_number', 'chassis_number', 'make', 'model', 'fuel_type', 'fuel_tank_size', 'mileage_per_litre', 'buy_date', 'driver_name', 'driver_mobile'];
  dataSource = new MatTableDataSource<VechicleDetails>(this.ELEMENT_DATA)


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;


  constructor(private AllVechicleService: UtrackService,
    private headerService: HeaderInteractorService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Vehicles Service Management')
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

  fetchDataFromApi() {
    this.AllVechicleService.getAllVechiclesDetails().subscribe(response => {
      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
    })
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Vehicle Number', 'Engine Number', 'Chassis Number', 'Make', 'Model', 'Fuel Type', 'Tank Capacity', 'Avg Milage', 'Buy Date', 'Driver Name', 'Driver Mobile'];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.engine_number)
      row.push(value.chassis_number)
      row.push(value.make)
      row.push(value.model)
      row.push(value.fuel_type)
      row.push(value.fuel_tank_size)
      row.push(value.mileage_per_litre)
      row.push(value.buy_date)
      row.push(value.driver_name)
      row.push(value.driver_mobile)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('AllVechicleDetails.pdf');
  }

  editVehicleNumber(device_link_id) {
    this.routes.navigate([`../vehicle-details`, device_link_id],
      { relativeTo: this.activatedRoute })
  }

}
