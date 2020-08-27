import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VechicleDetails } from '../../../@theme/components/Model/GetAllVechiclesDetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import * as _moment from 'moment';
import { DayWiseKmReportData, Detail } from '../../../@theme/components/Model/DayWiseKmResponse';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
const moment = _moment;

@Component({
  selector: 'ngx-daywise-km-report',
  templateUrl: './daywise-km-report.component.html',
  styleUrls: ['./daywise-km-report.component.scss']
})
export class DaywiseKmReportComponent implements OnInit {


  ELEMENT_DATA: DayWiseKmReportData[];
  device_link: string;
  startdate: string;
  enddate: string;

  displayedColumns: string[] = ['id', 'report_date', 'total_travelled_time', 'total_distance', 'max_speed', 'avg_speed'];

  dataSource = new MatTableDataSource<DayWiseKmReportData>(this.ELEMENT_DATA)
  maindata: any[]
  vehicles = [];
  servicing_date: any;
  deviceLinkId: any;
  todayDate: Date = new Date();
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
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
    private apiService: UtrackService,
  ) { }

  daywiseSearchForm = new FormGroup({
    vechicleName: new FormControl(''),
    startDate: new FormControl(this.yesterDay),
    endDate: new FormControl(this.todayDate)
  })
  ngOnInit(): void {
    this.getVehicles();
    this.headerService.updateHeaderTitle('Daywise Kilometer Report')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  back() {
    this.location.back();
  }

  getVehicles() {
    this.apiService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      this.deviceLinkId = this.vehicles[0].device_link_id;
      this.fetchDataFromApi();
    })
  }

  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      // this.fetchDataFromApi();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    // this.fetchDataFromApi();
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
    let Columns: string[] = ['ID', 'Report Date', 'Total Travel Time(HH:MM:SS)', 'Total Distance(KMS)', 'Max Speed(KMPH)', 'Avg Speed(KMPH)'];
    let data: String[][] = [];

    let i = 1;
    var reportDate: ""
    this.maindata.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.total_distance)
      row.push(value.report_date)
      row.push(value.total_travelled_time_formatted)
      row.push(value.total_distance_formatted)
      row.push(value.max_speed_formatted)
      row.push(value.avg_speed_formatted)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(Columns, data)
    doc.save('DatwiseKMReport.pdf');
  }

  fetchDataFromApi() {
    this.AllVechicleService.getdaywisekmDetails(this.deviceLinkId, this.pipe.transform(this.daywiseSearchForm.value.startDate, 'yyyy-MM-dd'), this.pipe.transform(this.daywiseSearchForm.value.endDate, 'yyyy-MM-dd')).subscribe(response => {
      this.maindata = response.data.detail;

      this.maindata.forEach(function (value) {

        value.total_distance_formatted = (Number(value.total_distance) / 1000).toFixed(1)
        value.total_travelled_time_formatted = secondsToFormattedTime(Number(value.total_travelled_time))
        value.max_speed_formatted = (Number(value.max_speed) * 2).toFixed(0)
        value.avg_speed_formatted = (Number(value.avg_speed) * 2).toFixed(0)

      })


      this.ELEMENT_DATA = this.maindata


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

      this.dataSource.data = this.ELEMENT_DATA
    })
  }

  viewReport() {
    this.fetchDataFromApi();
  }

}
