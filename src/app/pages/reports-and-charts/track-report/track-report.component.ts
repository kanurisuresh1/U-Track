import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { StoppageReportResponseData } from '../../../@theme/components/Model/StoppageReportResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatOption } from '@angular/material/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-track-report',
  templateUrl: './track-report.component.html',
  styleUrls: ['./track-report.component.scss']
})
export class TrackReportComponent implements OnInit {

  color: boolean = false;
  redcolor: boolean = false;

  public moving = "moving"
  public stopped = "stopped"

  public vehicleColors = {
    "moving": this.color,
    "stopped": this.redcolor,
  }

  vehicles = [];
  deviceLinkId: any;
  pipe = new DatePipe('en-US');
  todayDate: Date = new Date();
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
  minDate = new Date("2020-08-03")
  endMinDate: Date = new Date();
  selectTimeInterval: any

  ELEMENT_DATA: StoppageReportResponseData[];
  displayedColumns: string[] = ['id', 'date', 'speed', 'distance', 'landmark',];
  dataSource = new MatTableDataSource<StoppageReportResponseData>(this.ELEMENT_DATA)

  filteredData: StoppageReportResponseData[]
  finalData: StoppageReportResponseData[]
  stoppageDisplayedColumns: string[] = ['id', 'from_date', 'to_date', 'type', 'duration', 'distance', 'landmark',];
  stoppageReportdataSource = new MatTableDataSource<StoppageReportResponseData>(this.finalData)


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild("content") content: ElementRef;


  constructor(private location: Location,
    private headerService: HeaderInteractorService,
    private uTrackService: UtrackService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Track Report')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getVehicles();
    this.onChanges()

    this.selectTimeInterval = 10;

  }

  trackReportForm = new FormGroup({
    vechicleName: new FormControl(''),
    vehicleTimeInterval: new FormControl(''),
    startDate: new FormControl(this.yesterDay),
    endDate: new FormControl(this.todayDate)
  })

  onChanges() {

    this.trackReportForm.get('startDate').valueChanges.subscribe(date => {

      let endMinimumDate = date
      this.endMinDate = endMinimumDate
    })

  }

  getVehicles() {
    this.uTrackService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      this.deviceLinkId = this.vehicles[0].device_link_id;
      this.new_track_report_web_mongo();
    })
  }


  new_track_report_web_mongo() {
    this.uTrackService.new_track_report_web_mongo(this.deviceLinkId,
      this.pipe.transform(this.trackReportForm.value.startDate, 'yyyy-MM-dd HH:mm:ss'),
      this.pipe.transform(this.trackReportForm.value.endDate, 'yyyy-MM-dd HH:mm:ss')).subscribe(response => {
        if (response.status) {


          if (response.data != null && response.data != undefined && response.data.length > 0) {

            this.filteredData = []

            var mainData: StoppageReportResponseData[] = []
            var mainDataFiltered: StoppageReportResponseData[] = []

            let prevMotionStatus = (0 == response.data[0].s)

            response.data.forEach(function (val) {
              val.date = new Date(val.nt * 1000)
              val.s = val.s * 2

              val.motion = (0 != val.s)

              if (prevMotionStatus != val.motion) {
                mainData.push(val);
                prevMotionStatus = val.motion;
              }
            })

            this.ELEMENT_DATA = response.data
            this.dataSource.data = this.ELEMENT_DATA

            mainDataFiltered = [];

            for (let i = 0; i < mainData.length - 1; i++) {

              var currentItem = mainData[i];
              var nextItem = mainData[i + 1];

              currentItem.fromDate = currentItem.date;
              currentItem.toDate = nextItem.date;
              currentItem.fromNT = currentItem.nt;
              currentItem.toNT = nextItem.nt;

              currentItem.durationInSecs = nextItem.nt - currentItem.nt;
              currentItem.durationFormatted = secondsToFormattedTime(currentItem.durationInSecs)

              if (currentItem.motion) {
                currentItem.distance = Number((nextItem.d - currentItem.d).toFixed(1))
                currentItem.motionType = "Moving"
                this.color = true

              } else {
                currentItem.distance = 0
                currentItem.motionType = "Stopped"
                this.redcolor = true

              }

              mainDataFiltered.push(currentItem);
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

            this.filteredData = mainDataFiltered;
            //  this.stoppageReportdataSource.data = this.filteredData
            this.updateUI(this.trackReportForm.value.vehicleTimeInterval);

          } else {

            this.ELEMENT_DATA = []
            this.dataSource.data = this.ELEMENT_DATA

            this.filteredData = []
            this.stoppageReportdataSource.data = this.filteredData

          }

        } else {
          alert(response.message)
        }
      })
  }

  updateUI(interval: number) {

    this.finalData = []
    if (this.filteredData.length > 0) {

      this.finalData.push(this.filteredData[0])

      for (let i = 1; i < this.filteredData.length; i++) {

        var currentItem = this.filteredData[i];
        var lastItem = this.finalData[this.finalData.length - 1];

        if (currentItem.motion) {

          if (currentItem.distance < 0.25) {
            lastItem.toDate = currentItem.toDate
            lastItem.toNT  = currentItem.toNT
            currentItem.durationInSecs = lastItem.toNT - currentItem.fromNT;
            currentItem.durationFormatted = secondsToFormattedTime(currentItem.durationInSecs)
          } else {
            if (lastItem.motion) {
              lastItem.toDate = currentItem.toDate
              lastItem.toNT  = currentItem.toNT
              currentItem.durationInSecs = lastItem.toNT - currentItem.fromNT;
              currentItem.durationFormatted = secondsToFormattedTime(currentItem.durationInSecs)
              lastItem.distance = Number((lastItem.distance + currentItem.distance).toFixed(1))
            } else {
              this.finalData.push(currentItem)
            }
          }

        } else {

          if (currentItem.toNT - currentItem.fromNT < interval) {
            lastItem.toDate = currentItem.toDate
            lastItem.toNT  = currentItem.toNT
            currentItem.durationInSecs = lastItem.toNT - currentItem.fromNT;
            currentItem.durationFormatted = secondsToFormattedTime(currentItem.durationInSecs)
          } else {
            if (lastItem.motion) {
              this.finalData.push(currentItem)
            } else {
              lastItem.toDate = currentItem.toDate
              lastItem.toNT  = currentItem.toNT
              currentItem.durationInSecs = lastItem.toNT - currentItem.fromNT;
              currentItem.durationFormatted = secondsToFormattedTime(currentItem.durationInSecs)
            }
          }

        }

      }

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

      this.stoppageReportdataSource.data = this.finalData

    }

  }



  back() {
    this.location.back();
  }

  onSelectChange($event) {
    console.log($event)
    this.updateUI($event)

  }


  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.new_track_report_web_mongo();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.new_track_report_web_mongo();
  }

  refresh() {
    this.new_track_report_web_mongo()
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let columns: string[] = ['Id', 'From Date & Time', 'To Date & Time', 'Type', 'Duration(HH:MM:SS)', 'Distance(KMS)', 'Landmark',];
    let data: String[][] = [];
    let i = 1;
    this.filteredData.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.fromDate.toString())
      row.push(value.toDate.toString())
      row.push(value.motionType)
      row.push(value.durationFormatted)
      row.push(value.distance.toFixed(1))
      row.push(value.ln)

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(columns, data)

    doc.save('TrackReport.pdf');
  }

  downloadStoppageRawPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let columns: string[] = ['ID', 'Date', 'Speed(KMPH)', 'Distance(KMS)', 'Landmark',];
    let data: String[][] = [];
    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.date)
      row.push(value.s.toString())
      row.push(value.d.toString())
      row.push(value.ln)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(columns, data)

    doc.save('TrackRawDataReport.pdf');
  }

  viewReport() {
    this.new_track_report_web_mongo();
  }


}
