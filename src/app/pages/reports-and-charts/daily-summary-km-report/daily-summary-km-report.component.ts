import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { AllDeviceReportStats, NewAllDeviceReportStatsResponse, DetailEntityOrToday } from '../../../@theme/components/Model/NewAllDeviceReportStatsResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-daily-summary-km-report',
  templateUrl: './daily-summary-km-report.component.html',
  styleUrls: ['./daily-summary-km-report.component.scss']
})
export class DailySummaryKmReportComponent implements OnInit {
  todayDate: Date = new Date();
  pipe = new DatePipe('en-us');
  ELEMENT_DATA: AllDeviceReportStats[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'total_distance', 'total_travelled_time', 'max_speed', 'avg_speed',];
  dataSource = new MatTableDataSource<AllDeviceReportStats>(this.ELEMENT_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;

  constructor(private location: Location,
    private uTrackService: UtrackService,
    private headderService: HeaderInteractorService) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dailySummarKMReportForm = new FormGroup({
    startDate: new FormControl(this.todayDate)
  })

  ngOnInit(): void {
    this.headderService.updateHeaderTitle('Daily Summary KM Report');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDailySummaryKMReport();
  }
  back() {
    this.location.back();
  }
  viewReport() {
    this.getDailySummaryKMReport();
  }

  getDailySummaryKMReport() {
    this.uTrackService.new_all_device_report_stats(this.pipe.transform(this.dailySummarKMReportForm.value.startDate, 'yyyy-MM-dd')).subscribe(response => {
      response.data.forEach(function (val) {
        if (val.today !== undefined) {
          val.today.total_distance_formatted = (Number(val.today.total_distance) / 1000).toFixed(1);
          val.today.total_travelled_time_formatted = secondsToFormattedTime(Number(val.today.total_travelled_time))
          val.today.max_speed_formatted = (Number(val.today.max_speed) * 2).toFixed(0)
          val.today.avg_speed_formatted = (Number(val.today.avg_speed) * 2).toFixed(0)

        } else {
          val.today = {} as DetailEntityOrToday;
          val.today.total_distance_formatted = "-"
          val.today.total_travelled_time_formatted = "-"
          val.today.max_speed_formatted = "-"
          val.today.avg_speed_formatted = "-"
        }
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

      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
    })
  }

  private filterValue = "";
  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.getDailySummaryKMReport();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.getDailySummaryKMReport();
  }

  refresh() {
    this.getDailySummaryKMReport()
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    doc.text('Daily KM Summary Report', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let dailySummaryColumns: string[] = ['Id', 'Vehicle Number', 'Total Distance(KM)', 'Total Travelled Time(HH:MM:SS)', 'Max Speed(KMPH)', 'Avg Speed(KMPH)',];
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
      row.push(value.vehicle_type)

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(dailySummaryColumns, data)

    doc.save('Daily_Summary_KM_Report.pdf');
  }


}
