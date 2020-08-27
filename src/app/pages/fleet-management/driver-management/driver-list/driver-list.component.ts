import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverManagementListData } from '../../../../@theme/components/Model/DriverManagementList';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'ngx-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  vehicles = [];
  ELEMENT_DATA: DriverManagementListData[];

  displayedColumns: string[] = ['user_id', 'nick_name', 'mobile', 'trip_count', 'driver_vehicle_list', 'edit',];
  dataSource = new MatTableDataSource<DriverManagementListData>(this.ELEMENT_DATA)


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;



  constructor(private driverService: UtrackService,
    private headerService: HeaderInteractorService,
    private location: Location,
    private routes: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Drivers List');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (localStorage.getItem("USER_ID") == null || localStorage.getItem("USER_ID") == "") {
      this.routes.navigate(["/login"]);
    }
    this.fetchDataFromApi();
    this.getVehicles();
  }

  getVehicles() {
    this.driverService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
    })
  }

  addDriver() {
    this.routes.navigate(["web/fleet-management/driver-management/add-driver"])
  }


  fetchDataFromApi() {
    this.driverService.my_users_list().subscribe(response => {
      if (response.status) {
        this.ELEMENT_DATA = response.data
        this.dataSource.data = this.ELEMENT_DATA;

      }
      else {

      }
    })
  }

  back() {
    this.location.back()
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

  refresh() {
    this.fetchDataFromApi()
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.fetchDataFromApi();
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Nick Name', 'Mobile Number', 'Trip Count', 'Driving Vehicle',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.nick_name);
      row.push(value.mobile);
      row.push(String(value.trip_count));
      row.push("");
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('DriversList.pdf');
  }

}
