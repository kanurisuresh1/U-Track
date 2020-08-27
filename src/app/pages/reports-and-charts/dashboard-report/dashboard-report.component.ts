import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HomeData } from '../../../@theme/components/Model/Home';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'ngx-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {

  ELEMENT_DATA: HomeData[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'vehicle_type', 'speed', 'last_running_time', 'last_location',];
  dataSource = new MatTableDataSource<HomeData>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;

  constructor(private headerService: HeaderInteractorService,
    private location: Location,
    private uTrackService: UtrackService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Dashboard Report');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dashboardReport();
  }

  dashboardReport() {
    this.uTrackService.getDashboardReport().subscribe(response => {

      response.data.forEach(function (val) {
        val.speed_formatted = (Number(val.speed) * 2).toFixed(0)
      })

      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
    })
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
      this.dashboardReport();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.dashboardReport();
  }

  refresh() {
    this.dashboardReport()
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let dashboardColumns: string[] = ['Id', 'Vehicle Number', 'Type', 'Speed', 'Last Date', 'Landmark',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {

      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.vehicle_type)
      row.push(value.speed_formatted)
      row.push(value.last_running_time)
      row.push(value.last_location)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(dashboardColumns, data)

    doc.save('DashboardReport.pdf');
  }


}
