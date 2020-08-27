import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AllDeviceReportStatus24HoursData } from '../../../@theme/components/Model/All_device_Status_24_HoursKMReportResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';

@Component({
  selector: 'ngx-twenty4-hours-km-report',
  templateUrl: './twenty4-hours-km-report.component.html',
  styleUrls: ['./twenty4-hours-km-report.component.scss']
})
export class Twenty4HoursKmReportComponent implements OnInit {

  ELEMENT_DATA: AllDeviceReportStatus24HoursData[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'total_distance', 'total_travelled_time', 'max_speed', 'avg_speed',];
  dataSource = new MatTableDataSource<AllDeviceReportStatus24HoursData>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;

  constructor(private headerService: HeaderInteractorService,
    private location: Location,
    private uTrackService: UtrackService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('24 Hours KM Report');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.get24HoursReportsData();
  }
  back() {
    this.location.back()
  }

  get24HoursReportsData() {
    this.uTrackService.all_device_report_stats_24_hours().subscribe(respose => {

      respose.data.forEach(function (val) {
        val.today.total_distance_formatted = (Number(val.today.total_distance) / 1000).toFixed(1);
        val.today.total_travelled_time_formatted = secondsToFormattedTime(Number(val.today.total_travelled_time))
        val.today.max_speed_formatted = (Number(val.today.max_speed) * 2).toFixed(0);
        val.today.avg_speed_formatted = (Number(val.today.avg_speed) * 2).toFixed(0);
      })

      function secondsToFormattedTime(d: any): string {
        d = Number(d);
        var hours = Math.floor(d / 3600);
        var minutes = Math.floor(d % 3600 / 60);
        var seconds = Math.floor(d % 3600 % 60);

        var HH = hours < 10 ? "0" + hours : "" + hours;
        var MM = minutes < 10 ? "0" + minutes : "" + minutes;
        var SS = seconds < 10 ? "0" + seconds : "" + seconds;
        return HH + ":" + MM + ":" + SS;
      }

      this.ELEMENT_DATA = respose.data;
      this.dataSource.data = this.ELEMENT_DATA
    })
  }

  private filterValue = "";
  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.get24HoursReportsData();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.get24HoursReportsData();
  }

  refresh() {
    this.get24HoursReportsData()
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let dashboardColumns: string[] = ['Id', 'Vehicle Number', 'Total Distance(KM)', 'Total Travel Time(HH:MM:SS)', 'Max Speed(KMPH)', 'Avg Speed(KMPH)',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.today.total_distance_formatted)
      row.push(value.today.total_travelled_time_formatted)
      row.push(value.today.max_speed_formatted)
      row.push(value.today.avg_speed_formatted)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(dashboardColumns, data)

    doc.save('24HoursKMReport.pdf');
  }


}
