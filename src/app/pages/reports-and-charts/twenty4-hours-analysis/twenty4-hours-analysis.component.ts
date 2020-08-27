import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { MatOption } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Twenty4HoursAnalysisData } from '../../../@theme/components/Model/24HoursAnalysisResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'ngx-twenty4-hours-analysis',
  templateUrl: './twenty4-hours-analysis.component.html',
  styleUrls: ['./twenty4-hours-analysis.component.scss']
})
export class Twenty4HoursAnalysisComponent implements OnInit {


  pipe = new DatePipe('en-us');
  dayBeforeYesterDay = new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000));
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));

  ELEMENT_DATA: Twenty4HoursAnalysisData[];
  displayedColumns: string[] = ['id', 'vehicle_number', 'report_date', 'total_travelled_time',
    'total_stopped_time', 'driver_name', 'driver_number', 'total_distance',
    'total_day_distance', 'total_night_distance', 'max_speed', 'avg_speed',
    'sudden_accerlation', 'sudden_deceleration', 'utilization'
  ];
  dataSource = new MatTableDataSource<Twenty4HoursAnalysisData>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;

  vehicles = [];
  deviceLinkId: any;
  todayDate = new Date();
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(private location: Location,
    private headerService: HeaderInteractorService,
    private uTrackService: UtrackService) { }


  ngOnInit(): void {
    this.headerService.updateHeaderTitle('24 Hours Analysis Report');
    this.getVehicles();
    console.log(this.AnalysisForm.value.vechicleName)
  }

  AnalysisForm = new FormGroup({
    vechicleName: new FormControl(''),
    startDate: new FormControl(this.dayBeforeYesterDay),
    endDate: new FormControl(this.yesterDay),
  })

  analysis_report() {
    this.uTrackService.analysis_report(this.AnalysisForm.value.vechicleName, this.pipe.transform(this.AnalysisForm.value.startDate, 'yyyy-MM-dd'), this.pipe.transform(this.AnalysisForm.value.endDate, 'yyyy-MM-dd')).subscribe(response => {
      response.data.forEach(function (value) {
        if (value != undefined) {
          value.total_distance_formatted = (Number(value.total_distance) / 1000).toFixed(1)
          value.total_day_distance_formatted = (Number(value.total_day_distance) / 1000).toFixed(1)
          value.total_night_distance_formatted = (Number(value.total_night_distance) / 1000).toFixed(1)
          value.total_travelled_time_formatted = secondsToFormattedTime(Number(value.total_travelled_time))
          value.total_stopped_time_formatted = secondsToFormattedTime(Number(value.total_stopped_time))
          value.max_speed_formatted = (Number(value.max_speed) * 2).toFixed(0)
          value.avg_speed_formatted = (Number(value.avg_speed) * 2).toFixed(0)
        }
        else {
          value = {} as Twenty4HoursAnalysisData;
          value.total_distance_formatted = "-"
          value.total_day_distance_formatted = "-"
          value.total_night_distance_formatted = "-"
          value.total_travelled_time_formatted = "-"
          value.total_stopped_time_formatted = "-"
          value.max_speed_formatted = "-"
          value.avg_speed_formatted = "-"
        }

      })
      this.ELEMENT_DATA = response.data
      this.dataSource.data = this.ELEMENT_DATA;
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


  }
  getVehicles() {

    this.uTrackService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      this.deviceLinkId = this.vehicles[0].device_link_id;
      this.analysis_report();

    })
  }

  back() {
    this.location.back()
  }

  viewReport() {
    this.analysis_report();
    console.log(this.AnalysisForm.value.vechicleName)
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let Columns: string[] = ['ID', 'Vehicle Number', 'Report Date', 'Total Travel Time(HH:MM:SS)',
      'Total Stopped Time(HH:MM:SS)', 'Driver Name', 'Driver Number', 'Total Distance(KMS)',
      'Total Day Distance(KMS)', 'Total Night Distance Distance(KMS)', 'Max Speed(KMPH)', 'Avg Speed(KMPH)',
      'Sudden Accerlation', 'Sudden Deceleration',];
    let data: String[][] = [];

    let i = 1;
    var reportDate: ""
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number)
      row.push(value.report_date)
      row.push(value.total_travelled_time_formatted)
      row.push(value.total_stopped_time_formatted)
      row.push(value.driver_name)
      row.push(value.driver_number)
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
      (doc as any).autoTable(Columns, data)
    doc.save('DatwiseKMReport.pdf');
  }

  refresh() {
    this.analysis_report();
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.AnalysisForm.controls.vechicleName
        .patchValue([...this.vehicles.map(item => item.device_link_id), 0]);
    }
    else {
      this.AnalysisForm.controls.vechicleName.patchValue([]);
    }
  }

}
