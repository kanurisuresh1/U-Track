import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VechicleDetails } from '../../../@theme/components/Model/GetAllVechiclesDetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import * as _moment from 'moment';
import { DriverPerformanceReportDetails } from '../../../@theme/components/Model/DriverPerformanceReport';
const moment = _moment;
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'ngx-driver-performance',
  templateUrl: './driver-performance.component.html',
  styleUrls: ['./driver-performance.component.scss']
})
export class DriverPerformanceComponent implements OnInit {
  ELEMENT_DATA: DriverPerformanceReportDetails[];
  displayedColumns: string[] = ['driverId', 'date', 'vehicleNumber', 'travelTime', 'totalStoppedTime', 'kms', 'dayKMS', 'nightKMS', 'maxspeed', 'avgSpeed', 'suddenAccerlation', 'suddenDeccelater', 'utilization'];

  dataSource = new MatTableDataSource<DriverPerformanceReportDetails>(this.ELEMENT_DATA)
  maindata: any[] = [];

  driverDetails = [];
  driverId: any;
  todayDate: Date = new Date();
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;


  constructor(private AllVechicleService: UtrackService,
    private headerService: HeaderInteractorService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private uTrackService: UtrackService,
  ) { }

  myDriverPerformanceForm = new FormGroup({
    driverName: new FormControl(''),
    startDate: new FormControl(new Date(2020, 6, 25)),
    endDate: new FormControl(new Date(2020, 7, 1))
  })
  ngOnInit(): void {
    this.my_users_list();
    this.headerService.updateHeaderTitle('Driver Performance')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  back() {
    this.location.back();
  }

  my_users_list() {
    this.uTrackService.my_users_list().subscribe(response => {
      if (response.status) {
        this.driverDetails = response.data
        this.driverId = this.driverDetails[0].user_id
        this.fetchDataFromApi();
      }
      else {

      }
    })
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

  downloadPdf() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Daily KM Summary Report', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let dailySummaryColumns: string[] = ['Id', 'Date', 'Vehicle Number', 'Travel Time(HH:MM:SS)', 'Total Stopped Time(HH:MM:SS)', 'KMS', 'Day KMS', 'Night KMS', 'Max Speed(KMPH)', 'Avg Speed(KMPH)', 'Sudden Accerlation', 'Sudden Deccelater'];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {

      let row: String[] = [];
      row.push(i.toString());
      row.push(value.report_date)
      row.push(value.vehicle_number)
      row.push(value.total_travelled_time_formatted)
      row.push(value.total_stopped_time_formatted)
      row.push(value.total_distance_formatted)
      row.push(value.total_day_distance_formatted)
      row.push(value.total_night_distance_formatted)
      row.push(value.max_speed_formatted)
      row.push(value.avg_speed_formatted)
      row.push(value.sudden_accerlation)
      row.push(value.sudden_deceleration)

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(dailySummaryColumns, data)

    doc.save('Driver_Performance_Report.pdf');
  }

  fetchDataFromApi() {
    this.uTrackService.driver_performance_report(this.driverId, this.pipe.transform(this.myDriverPerformanceForm.value.startDate, 'yyyy-MM-dd'), this.pipe.transform(this.myDriverPerformanceForm.value.endDate, 'yyyy-MM-dd')).subscribe(response => {

      response.data.forEach(function (val) {
        if (val.total_distance != undefined) {
          val.total_travelled_time_formatted = secondsToFormattedTime(Number(val.total_travelled_time))
          val.total_stopped_time_formatted = secondsToFormattedTime(Number(val.total_stopped_time))
          val.total_distance_formatted = (Number(val.total_distance) / 1000).toFixed(1);
          val.total_night_distance_formatted = (Number(val.total_night_distance) / 1000).toFixed(1);
          val.total_day_distance_formatted = (Number(val.total_day_distance) / 1000).toFixed(1);
          val.max_speed_formatted = (Number(val.max_speed) * 2).toFixed(0)
          val.avg_speed_formatted = (Number(val.avg_speed) * 2).toFixed(0)
        } else {
          val = {} as DriverPerformanceReportDetails
          val.total_travelled_time_formatted = "-"
          val.total_stopped_time_formatted = "-"
          val.total_distance_formatted = "-"
          val.total_night_distance_formatted = "-"
          val.total_day_distance_formatted = "-"
          val.max_speed_formatted = "-"
          val.avg_speed_formatted = "-"
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
      this.dataSource.data = this.ELEMENT_DATA
      console.log(response.data)
    })
  }

  viewReport() {
    this.fetchDataFromApi();
    console.log(this.myDriverPerformanceForm.value.driverName)
  }

}
