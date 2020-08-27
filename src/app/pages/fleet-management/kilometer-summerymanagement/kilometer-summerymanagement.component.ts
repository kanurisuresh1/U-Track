import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { AllDeviceReportStats, NewAllDeviceReportStatsResponse, DetailEntityOrToday, ThisWeekOrThisMonth } from '../../../@theme/components/Model/NewAllDeviceReportStatsResponse';
import { AllDeviceReportStatsCustom, AllDeviceReportStatsCustomResponse } from '../../../@theme/components/Model/AllDeviceReportStatsCustomResponse';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD MMM YYYY',
//     // dateInput: 'MMM YYYY',
//   },
//   display: {
//     dateInput: 'DD MMM YYYY',
//     // dateInput: 'MMM YYYY',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };

// export const MY_FORMATS = {
// parse: {
//   dateInput: 'MM/YYYY',
// },
// display: {
//   dateInput: 'MM/YYYY',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// },
// };

@Component({
  selector: 'ngx-kilometer-summerymanagement',
  templateUrl: './kilometer-summerymanagement.component.html',
  styleUrls: ['./kilometer-summerymanagement.component.scss'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class KilometerSummerymanagementComponent implements OnInit {

  date = new FormControl(moment());
  todayDate = new Date();
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
  weekDay = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
  pipe = new DatePipe('en-US');


  TodayELEMENT_DATA: AllDeviceReportStats[]
  todatDisplayedColumn: string[] = [
    'device_id',
    'vehicle_number',
    'today_kms',
    'today_travel_time',
    'this_week_kms',
    'this_week_travel_time',
    'this_month_kms',
    'this_month_travel_time',
  ];
  todaydataSource = new MatTableDataSource<AllDeviceReportStats>(this.TodayELEMENT_DATA)


  SelectELEMENT_DATA: AllDeviceReportStats[]
  SelectDisplayedColumn: string[] = [
    'vehicle_id',
    'vehicle_number',
    'total_distance',
    'total_travelled_time',
    'max_speed',
    'avg_speed'
  ];
  SelectDatedataSource = new MatTableDataSource<AllDeviceReportStats>(this.SelectELEMENT_DATA)

  CustomeDateELEMENT_DATA: AllDeviceReportStatsCustom[]
  CustomeDateDisplayedColumn: string[] = [
    'vehicle_id',
    'vehicle_number',
    'total_distance',
    'total_travelled_time',
    'max_speed',
    'avg_speed'
  ];
  CustomeDatedataSource = new MatTableDataSource<AllDeviceReportStatsCustom>(this.CustomeDateELEMENT_DATA)


  MonthDetailsELEMENT_DATA: AllDeviceReportStats[]
  MonthDetailsDisplayedColumn: string[] = [
    'vehicle_id',
    'vehicle_number',
    'total_distance',
    'total_travelled_time',
    'max_speed',
    'avg_speed',
  ];
  MonthDetailsdataSource = new MatTableDataSource<AllDeviceReportStats>(this.MonthDetailsELEMENT_DATA)

  @ViewChild('TableOneSort', { static: true }) Todaysort: MatSort;
  @ViewChild('TableTwoSort', { static: true }) selectDatesort: MatSort;
  @ViewChild('TableThreeSort', { static: true }) customeDate: MatSort;
  @ViewChild('TableFourSort', { static: true }) monthDetailes: MatSort;

  constructor(private http: HttpClient, private headreService: HeaderInteractorService, private location: Location,) { }

  ngOnInit(): void {
    this.headreService.updateHeaderTitle('Kilometer Summary Management')
    // sort
    this.todaydataSource.sort = this.Todaysort;
    this.SelectDatedataSource.sort = this.selectDatesort;
    this.CustomeDatedataSource.sort = this.customeDate;
    this.MonthDetailsdataSource.sort = this.monthDetailes;
    this.getTodayList();
    this.getCustomDatesData();
  }


  public filterValue = "";


  todayFillterList(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.todaydataSource.filter = this.filterValue;
      this.getTodayList();
    }
  }

  selectDateFillterList(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.SelectDatedataSource.filter = this.filterValue;
      this.getSelectDate();
    }
  }

  customeListFillterList(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.CustomeDatedataSource.filter = this.filterValue;
      this.getCustomDatesData();
    }
  }

  monthListFillterList(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.MonthDetailsdataSource.filter = this.filterValue;
      this.getMonthList();
    }
  }


  search_todaylist() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element_today') as HTMLInputElement).value;
    this.todaydataSource.filter = this.filterValue;
    this.getTodayList();
  }

  search_selectDate() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element_selectDate') as HTMLInputElement).value;
    this.SelectDatedataSource.filter = this.filterValue;
    this.getSelectDate();
  }

  search_customeList() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element_custome') as HTMLInputElement).value;
    this.CustomeDatedataSource.filter = this.filterValue;
    this.getCustomDatesData();
  }

  search_monthList() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element_month') as HTMLInputElement).value;
    this.MonthDetailsdataSource.filter = this.filterValue;
    this.getMonthList();
  }

  refreshTodayList() {
    this.getTodayList()
  }

  refreshSelectDateList() {
    this.getSelectDate()
  }

  customDatesRefresh() {
    this.getCustomDatesData()
  }

  refreshMonthList() {
    this.getMonthList()
  }

  back() {
    this.location.back()
  }

  SelectDateKilometerMmanagement = new FormGroup({
    selectDate: new FormControl(this.yesterDay, [Validators.required]),

  })

  CustomDatesDataKilometerMmanagement = new FormGroup({
    StartDate: new FormControl(this.weekDay, [Validators.required]),
    EndDate: new FormControl(this.todayDate, [Validators.required]),
  })

  MonthKilometerMmanagement = new FormGroup({
    Month: new FormControl(this.todayDate, [Validators.required]),
  })

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  currentDate = new Date();
  getTodayList() {
    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('report_date', this.pipe.transform(this.todayDate, 'yyyy-MM-dd'))
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<NewAllDeviceReportStatsResponse>(environment.apiBaseUrl + 'new_all_device_report_stats', { params }).subscribe(response => {
      if (response.status) {
        this.TodayELEMENT_DATA = response.data


        this.TodayELEMENT_DATA.forEach((val) => {

          if (val.today !== undefined) {
            val.today.total_distance_formatted = (Number(val.today.total_distance) / 1000).toFixed(1);
            val.today.total_travelled_time_formatted = secondsToFormattedTime(Number(val.today.total_travelled_time))
            val.today.max_speed_formatted = Number(val.today.max_speed) * 2
            val.today.avg_speed_formatted = Number(val.today.avg_speed) * 2
          } else {
            val.today = {} as DetailEntityOrToday;
            val.today.total_distance_formatted = "-"
            val.today.total_travelled_time_formatted = "-"
            val.today.max_speed_formatted = "-"
            val.today.avg_speed_formatted = "-"
          }

          if (val.this_week !== undefined) {
            val.this_week.total_distance_formatted = (Number(val.this_week.total_distance) / 1000).toFixed(1);
            val.this_week.total_travelled_time_formatted = secondsToFormattedTime(Number(val.this_week.total_travelled_time))
            val.this_week.max_speed_formatted = Number(val.this_week.max_speed) * 2
            val.this_week.avg_speed_formatted = Number(val.this_week.avg_speed) * 2
          } else {
            val.this_week = {} as ThisWeekOrThisMonth;
            val.this_week.total_distance_formatted = "-"
            val.this_week.total_travelled_time_formatted = "-"
            val.this_week.max_speed_formatted = "-"
            val.this_week.avg_speed_formatted = "-"
          }

          if (val.this_month !== undefined) {
            val.this_month.total_distance_formatted = (Number(val.this_month.total_distance) / 1000).toFixed(1);
            val.this_month.total_travelled_time_formatted = secondsToFormattedTime(Number(val.this_month.total_travelled_time))
            val.this_month.max_speed_formatted = Number(val.this_month.max_speed) * 2
            val.this_month.avg_speed_formatted = Number(val.this_month.avg_speed) * 2
          } else {
            val.this_month = {} as ThisWeekOrThisMonth;
            val.this_month.total_distance_formatted = "-"
            val.this_month.total_travelled_time_formatted = "-"
            val.this_month.max_speed_formatted = "-"
            val.this_month.avg_speed_formatted = "-"
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
        this.todaydataSource.data = this.TodayELEMENT_DATA;

        this.getSelectDate();
        this.getMonthList();
      } else {

        alert(response.message);
      }
    })
  }

  downloadTodayKMPdf() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let columns: string[] = ['Id', 'Vehicle Number', 'Today Distance(KMS)', 'Today Travel Time(HH:MM:SS)', 'This Week Distance(KMS)', 'This Week Travel Time(HH:MM:SS)', 'This Month Distance(KMS) ', 'This Month Travel Time(HH:MM:SS)'];
    let data: String[][] = [];

    let i = 1;
    this.TodayELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number);
      row.push(value.today.total_distance_formatted);
      row.push(value.today.total_travelled_time_formatted);
      row.push(value.this_week.total_distance_formatted);
      row.push(value.this_week.total_travelled_time_formatted);
      row.push(value.this_month.total_distance_formatted);
      row.push(value.this_month.total_travelled_time_formatted);
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(columns, data)

    doc.save('TodayKMSummaryReport.pdf');
  }

  selectedDatePDF(){
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let columns: string[] = ['Id', 'Vehicle Number', 'Total Distance(KMS)', 'Total Travel Time(HH:MM:SS)', 'Max Speed(KMPH)','Avg Speed(KMPH)'];
    let data: String[][] = [];

    let i = 1;
    this.SelectELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number);
      row.push(value.today.total_distance_formatted);
      row.push(value.today.total_travelled_time_formatted);
      row.push(value.today.max_speed_formatted);
      row.push(value.today.avg_speed_formatted);
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(columns, data)

    doc.save('SelectedDateTodayKMSummaryReport.pdf');
  }

  customDatesPdf(){
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Vehicle Number', 'Total Distance(KMS)', 'Total Travel Time(HH:MM:SS)', 'Max Speed(KMPH)','Avg Speed(KMPH)'];
    let data: String[][] = [];

    let i = 1;
    this.CustomeDateELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number);
      row.push(value.total_distance_formatted);
      row.push(value.total_travelled_time_formatted);
      row.push(value.max_speed_formatted);
      row.push(value.avg_speed_formatted);

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('CustomDatesTodayKMSummaryReport.pdf');
  }

  monthKMReportPdf(){
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Vehicle Number', 'Month Total Distance(KMS)', 'Month Total Travel Time(HH:MM:SS)', 'Max Speed(KMPH)','Avg Speed(KMPH)'];
    let data: String[][] = [];

    let i = 1;
    this.MonthDetailsELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number);
      row.push(value.this_month.total_distance_formatted);
      row.push(value.this_month.total_travelled_time_formatted);
      row.push(value.this_month.max_speed_formatted);
      row.push(value.this_month.avg_speed_formatted);
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('SelectedMonthTodayKMSummaryReport.pdf');
  }

  getSelectDate() {

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('report_date', this.pipe.transform(this.SelectDateKilometerMmanagement.value.selectDate, 'yyyy-MM-dd'))
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<NewAllDeviceReportStatsResponse>(environment.apiBaseUrl + 'new_all_device_report_stats', { params }).subscribe(response => {
      if (response.status) {
        this.SelectELEMENT_DATA = response.data

        this.SelectELEMENT_DATA.forEach((val) => {

          if (val.today !== undefined) {
            val.today.total_distance_formatted = (Number(val.today.total_distance) / 1000).toFixed(1);
            val.today.total_travelled_time_formatted = secondsToFormattedTime(Number(val.today.total_travelled_time))
            val.today.max_speed_formatted = Number(val.today.max_speed) * 2
            val.today.avg_speed_formatted = Number(val.today.avg_speed) * 2
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

        this.SelectDatedataSource.data = this.SelectELEMENT_DATA;
      } else {
        alert(response.message);
      }
    })
  }

  getCustomDatesData() {

    console.log(this.pipe.transform(this.SelectDateKilometerMmanagement.value.selectDate, 'yyyy-MM-dd'))

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', "Customer")
      .set('from_date', this.pipe.transform(this.CustomDatesDataKilometerMmanagement.value.StartDate, 'yyyy-MM-dd'))
      .set('to_date', this.pipe.transform(this.CustomDatesDataKilometerMmanagement.value.EndDate, 'yyyy-MM-dd'))
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<AllDeviceReportStatsCustomResponse>(environment.apiBaseUrl + 'all_device_report_stats_custom', { params }).subscribe(response => {
      if (response.status) {
        this.CustomeDateELEMENT_DATA = response.data


        this.CustomeDateELEMENT_DATA.forEach((val) => {
          val.total_distance_formatted = (Number(val.total_distance) / 1000).toFixed(1);
          val.total_travelled_time_formatted = secondsToFormattedTime(Number(val.total_travelled_time))
          val.max_speed_formatted = String(Number(val.max_speed) * 2)
          val.avg_speed_formatted = String(Number(val.avg_speed) * 2)
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
        this.CustomeDatedataSource.data = this.CustomeDateELEMENT_DATA;

      } else {
        alert(response.message);
      }
    })
  }

  getMonthList() {
    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('report_date', this.pipe.transform(this.MonthKilometerMmanagement.value.Month, 'yyyy-MM-dd'))
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<NewAllDeviceReportStatsResponse>(environment.apiBaseUrl + 'new_all_device_report_stats', { params }).subscribe(response => {
      if (response.status) {
        this.MonthDetailsELEMENT_DATA = response.data

        this.MonthDetailsELEMENT_DATA.forEach((val) => {

          if (val.this_month !== undefined) {
            val.this_month.total_distance_formatted = (Number(val.this_month.total_distance) / 1000).toFixed(1);
            val.this_month.total_travelled_time_formatted = secondsToFormattedTime(Number(val.this_month.total_travelled_time))
            val.this_month.max_speed_formatted = Number(val.this_month.max_speed) * 2
            val.this_month.avg_speed_formatted = Number(val.this_month.avg_speed) * 2
          } else {
            val.this_month = {} as ThisWeekOrThisMonth;
            val.this_month.total_distance_formatted = "-"
            val.this_month.total_travelled_time_formatted = "-"
            val.this_month.max_speed_formatted = "-"
            val.this_month.avg_speed_formatted = "-"
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

        this.MonthDetailsdataSource.data = this.MonthDetailsELEMENT_DATA;


      } else {
        alert(response.message);
      }
    })
  }


}

